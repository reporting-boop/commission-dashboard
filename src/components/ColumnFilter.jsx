import { useState, useRef, useEffect, useLayoutEffect } from "react";
import { Filter } from "../icons";

const METRO_PURPLE = "#5b2d8e";
const METRO_PINK   = "#e6007e";

// ── Pure filtering logic — safe to unit test / reuse elsewhere ──────
// col.filterType: "text" | "number" | "multiselect"
// col.filterValue(row) → the raw value to filter on (defaults to row[col.key])
export function applyColumnFilters(rows, cols, filterState) {
  return rows.filter(row =>
    cols.every(col => {
      if (!col.filterType) return true;
      const f = filterState[col.key];
      if (!f) return true;
      const raw = col.filterValue ? col.filterValue(row) : row[col.key];

      if (col.filterType === "text") {
        const s = (raw ?? "").toString().toLowerCase();
        const v = (f.value || "").toLowerCase();
        switch (f.op) {
          case "contains":   return !v || s.includes(v);
          case "startsWith": return !v || s.startsWith(v);
          case "equals":     return !v || s === v;
          case "notEquals":  return !v || s !== v;
          case "blank":      return s === "";
          case "nonBlank":   return s !== "";
          default: return true;
        }
      }

      if (col.filterType === "number") {
        const n = Number(raw) || 0;
        switch (f.op) {
          case "equals": return f.value === "" || f.value == null || n === Number(f.value);
          case "gt":     return f.value === "" || f.value == null || n > Number(f.value);
          case "lt":     return f.value === "" || f.value == null || n < Number(f.value);
          case "between": {
            const lo = (f.value  === "" || f.value  == null) ? -Infinity : Number(f.value);
            const hi = (f.value2 === "" || f.value2 == null) ?  Infinity : Number(f.value2);
            return n >= lo && n <= hi;
          }
          default: return true;
        }
      }

      if (col.filterType === "multiselect") {
        if (!f.selected || f.selected.size === 0) return true;
        return f.selected.has(String(raw ?? ""));
      }

      return true;
    })
  );
}

export function isFilterActive(f) {
  if (!f) return false;
  if (f.type === "multiselect") return !!(f.selected && f.selected.size > 0);
  if (f.type === "text")   return f.op === "blank" || f.op === "nonBlank" || !!f.value;
  if (f.type === "number") return (f.value !== "" && f.value != null) || (f.value2 !== "" && f.value2 != null);
  return false;
}

const selectStyle = { width:"100%", padding:"6px 8px", borderRadius:6, border:"1px solid var(--border)", fontSize:12, color:"var(--text-secondary)", background:"var(--surface)" };
const inputStyle  = { width:"100%", padding:"6px 8px", borderRadius:6, border:"1px solid var(--border)", fontSize:12, color:"var(--text-secondary)", boxSizing:"border-box" };
const btnRowStyle = { display:"flex", justifyContent:"space-between", marginTop:10, gap:8 };
const clearBtnStyle = { flex:1, padding:"6px 0", borderRadius:6, border:"1px solid var(--border)", background:"var(--surface)", color:"var(--text-secondary)", fontSize:12, cursor:"pointer" };
const applyBtnStyle = { flex:1, padding:"6px 0", borderRadius:6, border:"none", background:METRO_PURPLE, color:"#fff", fontSize:12, fontWeight:600, cursor:"pointer" };

// ── Filter type panels ───────────────────────────────────────────
function TextFilterPanel({ value, onApply, onClear }) {
  const [op, setOp]     = useState(value?.op || "contains");
  const [text, setText] = useState(value?.value || "");
  const needsInput = op !== "blank" && op !== "nonBlank";
  return (
    <div style={{ padding:12, width:220 }}>
      <select value={op} onChange={e=>setOp(e.target.value)} style={selectStyle}>
        <option value="contains">Contains</option>
        <option value="startsWith">Starts With</option>
        <option value="equals">Equals</option>
        <option value="notEquals">Not Equals</option>
        <option value="blank">Blank</option>
        <option value="nonBlank">Non Blank</option>
      </select>
      {needsInput && (
        <input value={text} onChange={e=>setText(e.target.value)} placeholder="Value…"
          style={{ ...inputStyle, marginTop:8 }}/>
      )}
      <div style={btnRowStyle}>
        <button onClick={onClear} style={clearBtnStyle}>Clear</button>
        <button onClick={()=>onApply({ type:"text", op, value:text })} style={applyBtnStyle}>Apply</button>
      </div>
    </div>
  );
}

function NumberFilterPanel({ value, onApply, onClear }) {
  const [op, setOp] = useState(value?.op || "equals");
  const [v1, setV1] = useState(value?.value  ?? "");
  const [v2, setV2] = useState(value?.value2 ?? "");
  return (
    <div style={{ padding:12, width:200 }}>
      <select value={op} onChange={e=>setOp(e.target.value)} style={selectStyle}>
        <option value="equals">Equals</option>
        <option value="gt">Greater Than</option>
        <option value="lt">Less Than</option>
        <option value="between">Between</option>
      </select>
      <input type="number" value={v1} onChange={e=>setV1(e.target.value)} placeholder="Value"
        style={{ ...inputStyle, marginTop:8 }}/>
      {op === "between" && (
        <input type="number" value={v2} onChange={e=>setV2(e.target.value)} placeholder="And…"
          style={{ ...inputStyle, marginTop:8 }}/>
      )}
      <div style={btnRowStyle}>
        <button onClick={onClear} style={clearBtnStyle}>Clear</button>
        <button onClick={()=>onApply({ type:"number", op, value:v1, value2:v2 })} style={applyBtnStyle}>Apply</button>
      </div>
    </div>
  );
}

// Covers both "Market column — multi-select list" and
// "Employee column — search + checkbox list": one reusable control.
function MultiSelectFilterPanel({ options, value, onApply, onClear }) {
  const [selected, setSelected] = useState(new Set(value?.selected || []));
  const [search, setSearch]     = useState("");
  const filteredOptions = options.filter(o => o.toLowerCase().includes(search.toLowerCase()));
  const toggle = (opt) => setSelected(prev => {
    const next = new Set(prev);
    next.has(opt) ? next.delete(opt) : next.add(opt);
    return next;
  });
  return (
    <div style={{ padding:12, width:230 }}>
      {options.length > 6 && (
        <div style={{ marginBottom:8 }}>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search"
            style={{ ...inputStyle, textAlign:"center" }}/>
        </div>
      )}
      <div style={{ maxHeight:170, overflowY:"auto", display:"flex", flexDirection:"column", gap:4 }}>
        {filteredOptions.length === 0 && (
          <div style={{ fontSize:12, color:"var(--text-muted)", padding:"6px 0" }}>No matches</div>
        )}
        {filteredOptions.map(opt => (
          <label key={opt} style={{ display:"flex", alignItems:"center", gap:8, fontSize:12.5, color:"var(--text-secondary)", cursor:"pointer", padding:"3px 2px" }}>
            <input type="checkbox" checked={selected.has(opt)} onChange={()=>toggle(opt)}/>
            {opt}
          </label>
        ))}
      </div>
      <div style={btnRowStyle}>
        <button onClick={onClear} style={clearBtnStyle}>Clear</button>
        <button onClick={()=>onApply({ type:"multiselect", selected })} style={applyBtnStyle}>Apply</button>
      </div>
    </div>
  );
}

export function ColumnFilterDropdown({ col, active, filterState, setFilterState, options }) {
  const [open, setOpen] = useState(false);
  const [align, setAlign] = useState("left");
  const ref = useRef();
  const panelRef = useRef();

  useEffect(() => {
    if (!open) return;
    const onDocClick = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [open]);

  useLayoutEffect(() => {
    if (!open || !panelRef.current) return;
    const rect = panelRef.current.getBoundingClientRect();
    setAlign(rect.right > window.innerWidth - 8 ? "right" : "left");
  }, [open]);

  const handleApply = (val) => { setFilterState(prev => ({ ...prev, [col.key]: val })); setOpen(false); };
  const handleClear = () => { setFilterState(prev => { const next = { ...prev }; delete next[col.key]; return next; }); setOpen(false); };

  return (
    <span ref={ref} style={{ position:"relative", display:"inline-block", marginLeft:6 }}>
      <button
        onClick={(e) => { e.stopPropagation(); setOpen(o=>!o); }}
        title={`Filter ${col.label}`}
        style={{
          border:"none", background:"transparent", cursor:"pointer", padding:2,
          color: active ? METRO_PINK : "#c4b5da", display:"inline-flex", verticalAlign:"middle"
        }}
      >
        <Filter size={11}/>
      </button>
      {open && (
        <div ref={panelRef} style={{
          position:"absolute", top:"130%", zIndex:500,
          left: align === "left" ? 0 : "auto",
          right: align === "right" ? 0 : "auto",
          maxWidth:"calc(100vw - 24px)",
          background:"var(--surface)", borderRadius:10, border:"1px solid var(--border)",
          boxShadow:"0 10px 28px rgba(0,0,0,.14)",
          textTransform:"none", letterSpacing:"normal", fontWeight:400,
        }}>
          {col.filterType === "text"        && <TextFilterPanel  value={filterState[col.key]} onApply={handleApply} onClear={handleClear}/>}
          {col.filterType === "number"      && <NumberFilterPanel value={filterState[col.key]} onApply={handleApply} onClear={handleClear}/>}
          {col.filterType === "multiselect" && <MultiSelectFilterPanel options={options||[]} value={filterState[col.key]} onApply={handleApply} onClear={handleClear}/>}
        </div>
      )}
    </span>
  );
}

// ── Drop-in replacement for <Table/> with Excel-style per-column
// filter dropdowns layered on top. Rows passed in should already
// reflect the page's own search/sort/dropdown filters — this adds
// one more filtering pass, purely additive, never replacing them.
export function FilterableTable({ cols, rows, emptyMsg="No data" }) {
  const [filterState, setFilterState] = useState({});

  const optionsByCol = {};
  cols.forEach(col => {
    if (col.filterType === "multiselect") {
      const vals = rows.map(r => (col.filterValue ? col.filterValue(r) : r[col.key]));
      optionsByCol[col.key] = [...new Set(vals.filter(v => v !== undefined && v !== null && v !== ""))].sort();
    }
  });

  if (!rows || !rows.length) return (
    <div style={{ textAlign:"center", padding:"48px", color:"var(--text-muted)", fontSize:14 }}>{emptyMsg}</div>
  );

  const filteredRows  = applyColumnFilters(rows, cols, filterState);
  const activeCount   = Object.keys(filterState).filter(k => isFilterActive(filterState[k])).length;

  return (
    <div>
      <style>{`
        .metro-table-row { transition:transform 200ms var(--ease), box-shadow 200ms var(--ease); position:relative; }
        .metro-table-row td { transition:background 180ms var(--ease), box-shadow 180ms var(--ease); }
        .metro-table-row:hover { transform:scale(1.012); box-shadow:0 10px 26px rgba(31,18,54,.18); z-index:5; }
        .metro-table-row:hover td { background:var(--surface-hover) !important; }
        .metro-table-row:hover td:first-child { box-shadow:inset 3px 0 0 var(--brand-purple); border-top-left-radius:10px; border-bottom-left-radius:10px; }
        .metro-table-row:hover td:last-child { border-top-right-radius:10px; border-bottom-right-radius:10px; }
      `}</style>
      {activeCount > 0 && (
        <div style={{
          display:"flex", alignItems:"center", gap:8, padding:"8px 14px",
          background:"rgba(230,0,126,.08)", borderBottom:"1px solid rgba(230,0,126,.18)", fontSize:11.5, color:METRO_PINK
        }}>
          <Filter size={11}/>
          {activeCount} column filter{activeCount>1?"s":""} active · showing {filteredRows.length} of {rows.length}
          <button onClick={()=>setFilterState({})} style={{
            marginLeft:"auto", border:"none", background:"transparent", color:METRO_PINK,
            fontSize:11.5, fontWeight:600, cursor:"pointer", textDecoration:"underline"
          }}>Clear all</button>
        </div>
      )}
      <div style={{ overflowX:"auto" }}>
        <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13 }}>
          <thead>
            <tr style={{ borderBottom:"2px solid var(--border-soft)", background:"var(--surface-sunken)" }}>
              {cols.map(c => (
                <th key={c.key} style={{
                  textAlign: c.align||"left", padding:"10px 14px",
                  fontWeight:600, fontSize:11, color:METRO_PURPLE,
                  textTransform:"uppercase", letterSpacing:".05em", whiteSpace:"nowrap"
                }}>
                  {c.label}
                  {c.filterType && (
                    <ColumnFilterDropdown
                      col={c}
                      active={isFilterActive(filterState[c.key])}
                      filterState={filterState}
                      setFilterState={setFilterState}
                      options={optionsByCol[c.key]}
                    />
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredRows.length === 0 && (
              <tr><td colSpan={cols.length} style={{ textAlign:"center", padding:"32px", color:"var(--text-muted)", fontSize:13 }}>
                No rows match the current filters
              </td></tr>
            )}
            {filteredRows.map((row,i) => (
              <tr key={i} className="metro-table-row" style={{ borderBottom:"1px solid var(--border-soft)" }}>
                {cols.map(c => (
                  <td key={c.key} style={{
                    padding:"11px 14px",
                    textAlign:c.align||"left",
                    color: c.muted ? "var(--text-secondary)" : "var(--text-primary)",
                    fontWeight: c.bold ? 600 : 400
                  }}>
                    {c.render ? c.render(row) : row[c.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
