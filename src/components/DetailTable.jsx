import { useState, useMemo } from "react";
import { MASTER_COLUMNS, EARNING_VERTICALS, CHARGEBACK_CATEGORIES } from "../data";
import { ChevronRight, Filter } from "../icons";
import { applyColumnFilters, isFilterActive, ColumnFilterDropdown } from "./ColumnFilter";

// Column → category, derived automatically from the same canonical
// EARNING_VERTICALS / CHARGEBACK_CATEGORIES lists the rest of the app
// already uses (Commission Intelligence, filters, etc.) — nothing here
// is a separate hardcoded list.
const EARN_KEYS = new Set(EARNING_VERTICALS.map(e => e.key));
const CB_KEYS   = new Set(CHARGEBACK_CATEGORIES.map(c => c.key));
function categoryOf(key) {
  if (EARN_KEYS.has(key)) return "pay";
  if (CB_KEYS.has(key))   return "charge";
  return "neutral";
}

// Excel-style column filters — identity columns get a searchable
// multi-select or text filter, every numeric metric gets a number
// filter (equals / greater than / less than / between).
const MULTISELECT_KEYS = new Set(["market", "dm", "name"]);
function filterMetaFor(key) {
  if (MULTISELECT_KEYS.has(key)) return { filterType:"multiselect", filterValue:r => r[key] };
  if (key === "ntid")            return { filterType:"text",        filterValue:r => r[key] };
  return { filterType:"number", filterValue:r => Number(r[key]) || 0 };
}
const FILTERABLE_COLUMNS = MASTER_COLUMNS.map(c => ({ ...c, ...filterMetaFor(c.key) }));

// Fully opaque header tints — sticky headers must never be translucent,
// or scrolled rows show through them. Each token is a solid color per
// theme (see index.css), not an alpha-blended overlay.
const HEADER_THEME = {
  neutral: { bg:"var(--header-neutral-bg)", bgOpen:"var(--header-neutral-bg-open)", text:"var(--brand-purple)",  border:"var(--header-neutral-border)" },
  pay:     { bg:"var(--header-pay-bg)",     bgOpen:"var(--header-pay-bg-open)",     text:"var(--brand-success)", border:"var(--header-pay-border)" },
  charge:  { bg:"var(--header-charge-bg)",  bgOpen:"var(--header-charge-bg-open)",  text:"var(--brand-danger)",  border:"var(--header-charge-border)" },
};

const numFmt = v => {
  if (v == null || v === "") return "–";
  const n = Number(v);
  return isNaN(n) ? v : (n % 1 === 0 ? n : n.toFixed(2));
};

// Shared "Detailed View" grid — used on Employee Wise, DM Wise, and
// Market Wise. Same expand/collapse-group behavior everywhere; only the
// group labels differ slightly per page. Every column also supports an
// Excel-style filter (search/checkbox for identity columns, number
// comparisons for every metric column).
export default function DetailTable({
  rows,
  groupLabel = "Plan / Tab Details",
  chargebackLabel = "Chargebacks / Extras",
  maxHeight = "60vh",
}) {
  const [group1Open, setGroup1Open] = useState(false);
  const [group2Open, setGroup2Open] = useState(false);
  const [filterState, setFilterState] = useState({});

  const baseCols    = FILTERABLE_COLUMNS.slice(0, 6);
  const group1Col   = FILTERABLE_COLUMNS.slice(6, 37);
  const betweenCols = FILTERABLE_COLUMNS.slice(37, 44);
  const group2Col   = FILTERABLE_COLUMNS.slice(44);

  const safeRows = rows || [];

  const optionsByCol = useMemo(() => {
    const map = {};
    FILTERABLE_COLUMNS.forEach(col => {
      if (col.filterType === "multiselect") {
        const vals = safeRows.map(r => col.filterValue(r));
        map[col.key] = [...new Set(vals.filter(v => v !== undefined && v !== null && v !== ""))].sort();
      }
    });
    return map;
  }, [safeRows]);

  const filteredRows = applyColumnFilters(safeRows, FILTERABLE_COLUMNS, filterState);
  const activeFilterCount = Object.keys(filterState).filter(k => isFilterActive(filterState[k])).length;

  const thBase = {
    padding:"11px 12px", fontSize:10.5, fontWeight:700, whiteSpace:"nowrap",
    textTransform:"uppercase", letterSpacing:".045em",
    position:"sticky", top:0, zIndex:2,
    boxShadow:"0 1px 0 rgba(31,18,54,.06), 0 6px 8px -6px rgba(31,18,54,.18)",
    transition:"background var(--t-fast) var(--ease)",
  };
  const tdBase = {
    padding:"10px 12px", fontSize:11.5, color:"var(--text-secondary)", whiteSpace:"nowrap",
    borderBottom:"1px solid var(--border-soft)",
  };

  const thFor = (key, extra = {}) => {
    const th = HEADER_THEME[categoryOf(key)];
    return { ...thBase, color:th.text, background:th.bg, borderRight:`1px solid ${th.border}`, ...extra };
  };

  // Header cell with an Excel-style filter dropdown attached.
  const FilterableTh = (c, extra = {}) => (
    <th key={c.key} style={thFor(c.key, extra)}>
      <span style={{ display:"flex", alignItems:"center", gap:2, textTransform:"none", letterSpacing:"normal" }}>
        <span style={{ textTransform:"uppercase", letterSpacing:".045em" }}>{c.label}</span>
        {c.filterType && (
          <ColumnFilterDropdown
            col={c}
            active={isFilterActive(filterState[c.key])}
            filterState={filterState}
            setFilterState={setFilterState}
            options={optionsByCol[c.key]}
          />
        )}
      </span>
    </th>
  );

  if (!rows || !rows.length) {
    return <div style={{ textAlign:"center", padding:"48px", color:"var(--text-muted)", fontSize:14 }}>No data available</div>;
  }

  return (
    <div>
      <style>{`
        .dt-scroll { overflow:auto; border-radius:14px; border:1px solid var(--border); }
        .dt-scroll::-webkit-scrollbar { height:9px; width:9px; }
        .dt-scroll::-webkit-scrollbar-thumb { background:var(--border); border-radius:6px; }
        .dt-scroll::-webkit-scrollbar-track { background:transparent; }
        .dt-row { transition:transform 200ms var(--ease), box-shadow 200ms var(--ease); position:relative; }
        .dt-row td { transition:background 180ms var(--ease), box-shadow 180ms var(--ease); }
        .dt-row:hover { transform:scale(1.008); box-shadow:0 8px 20px rgba(31,18,54,.16); z-index:5; }
        .dt-row:hover td { background:var(--surface-hover); }
        .dt-row:hover td:first-child { box-shadow:inset 3px 0 0 var(--brand-purple); }
        .dt-group-toggle { cursor:pointer; user-select:none; transition:filter .12s ease; }
        .dt-group-toggle:hover { filter:brightness(.96); }
        .dt-chevron { display:inline-flex; transition:transform .18s cubic-bezier(.4,0,.2,1); }
        .dt-legend-dot { width:8px; height:8px; border-radius:50%; display:inline-block; }
      `}</style>

      {/* Legend — explains the header color coding */}
      <div style={{ display:"flex", gap:18, alignItems:"center", padding:"2px 4px 12px", fontSize:11, color:"var(--text-secondary)", flexWrap:"wrap" }}>
        <span style={{ display:"flex", alignItems:"center", gap:6 }}>
          <span className="dt-legend-dot" style={{ background:HEADER_THEME.neutral.text }}/> Neutral
        </span>
        <span style={{ display:"flex", alignItems:"center", gap:6 }}>
          <span className="dt-legend-dot" style={{ background:HEADER_THEME.pay.text }}/> Paying vertical
        </span>
        <span style={{ display:"flex", alignItems:"center", gap:6 }}>
          <span className="dt-legend-dot" style={{ background:HEADER_THEME.charge.text }}/> Chargeback
        </span>
        <span style={{ marginLeft:"auto", display:"flex", alignItems:"center", gap:6, color:"var(--brand-pink)" }}>
          <Filter size={11}/>
          Click any column header to filter it
        </span>
      </div>

      {activeFilterCount > 0 && (
        <div style={{
          display:"flex", alignItems:"center", gap:8, padding:"8px 14px", marginBottom:8,
          background:"rgba(230,0,126,.08)", border:"1px solid rgba(230,0,126,.18)", borderRadius:10,
          fontSize:11.5, color:"var(--brand-pink)",
        }}>
          <Filter size={11}/>
          {activeFilterCount} column filter{activeFilterCount>1?"s":""} active · showing {filteredRows.length} of {safeRows.length} rows
          <button onClick={()=>setFilterState({})} style={{
            marginLeft:"auto", border:"none", background:"transparent", color:"var(--brand-pink)",
            fontSize:11.5, fontWeight:600, cursor:"pointer", textDecoration:"underline"
          }}>Clear all</button>
        </div>
      )}

      <div className="dt-scroll" style={{ maxHeight }}>
        <table style={{ borderCollapse:"separate", borderSpacing:0, fontSize:12, minWidth:"100%" }}>
          <thead>
            <tr>
              {baseCols.map(c => FilterableTh(c))}

              <th className="dt-group-toggle" style={thFor(group1Col[0].key, { background:HEADER_THEME.neutral.bgOpen })}
                  onClick={() => setGroup1Open(o => !o)}>
                <span style={{ display:"flex", alignItems:"center", gap:6 }}>
                  <span className="dt-chevron" style={{ transform: group1Open ? "rotate(90deg)" : "rotate(0deg)" }}>
                    <ChevronRight size={12}/>
                  </span>
                  {groupLabel} <span style={{ opacity:.6, fontWeight:600 }}>({group1Col.length})</span>
                </span>
              </th>
              {group1Open && group1Col.slice(1).map(c => FilterableTh(c))}

              {betweenCols.map(c => FilterableTh(c))}

              <th className="dt-group-toggle" style={thFor(group2Col[0].key, { background:HEADER_THEME.charge.bgOpen })}
                  onClick={() => setGroup2Open(o => !o)}>
                <span style={{ display:"flex", alignItems:"center", gap:6 }}>
                  <span className="dt-chevron" style={{ transform: group2Open ? "rotate(90deg)" : "rotate(0deg)" }}>
                    <ChevronRight size={12}/>
                  </span>
                  {chargebackLabel} <span style={{ opacity:.6, fontWeight:600 }}>({group2Col.length})</span>
                </span>
              </th>
              {group2Open && group2Col.slice(1).map(c => FilterableTh(c))}
            </tr>
          </thead>
          <tbody>
            {filteredRows.length === 0 && (
              <tr><td colSpan={99} style={{ textAlign:"center", padding:"32px", color:"var(--text-muted)", fontSize:13 }}>
                No rows match the current filters
              </td></tr>
            )}
            {filteredRows.map((row, i) => (
              <tr key={i} className="dt-row">
                {baseCols.map(c => <td key={c.key} style={tdBase}>{numFmt(row[c.key])}</td>)}

                <td className="dt-group-toggle" style={{ ...tdBase, fontWeight:700, color:HEADER_THEME.neutral.text }}
                    onClick={() => setGroup1Open(o => !o)}>
                  {numFmt(row[group1Col[0].key])}
                </td>
                {group1Open && group1Col.slice(1).map(c => <td key={c.key} style={tdBase}>{numFmt(row[c.key])}</td>)}

                {betweenCols.map(c => <td key={c.key} style={tdBase}>{numFmt(row[c.key])}</td>)}

                <td className="dt-group-toggle" style={{ ...tdBase, fontWeight:700, color:HEADER_THEME.charge.text }}
                    onClick={() => setGroup2Open(o => !o)}>
                  {numFmt(row[group2Col[0].key])}
                </td>
                {group2Open && group2Col.slice(1).map(c => <td key={c.key} style={tdBase}>{numFmt(row[c.key])}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
