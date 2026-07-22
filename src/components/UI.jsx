import { useState, useRef, useEffect, useLayoutEffect } from "react";
import { statusOf } from "../data";
import { Search, ChevronDown } from "../icons";

const METRO_PURPLE = "#5b2d8e";
const METRO_PINK   = "#e6007e";
const METRO_DARK   = "#2a1244";

export function StatCard({ label, value, sub, accent }) {
  const colors = {
    blue:   { text:"#1d4ed8",   tint:"rgba(29,78,216,.10)" },
    green:  { text:"#15803d",   tint:"rgba(21,128,61,.10)" },
    amber:  { text:"#b45309",   tint:"rgba(180,83,9,.10)" },
    red:    { text:"#dc2626",   tint:"rgba(220,38,38,.10)" },
    indigo: { text:"#4338ca",   tint:"rgba(67,56,202,.10)" },
    purple: { text:METRO_PURPLE, tint:"rgba(91,45,142,.10)" },
    pink:   { text:METRO_PINK,   tint:"rgba(230,0,126,.10)" },
  };
  const c = colors[accent] || colors.purple;
  return (
    <div style={{
      background:"var(--surface)", borderRadius:16, padding:"18px 20px",
      border:"1px solid var(--border)",
      borderTop:`3px solid ${c.text}`,
      flex:1, minWidth:0,
      boxShadow:"var(--shadow-sm)",
    }}>
      <div style={{
        fontSize:11, fontWeight:600, color:"var(--text-muted)",
        letterSpacing:".05em", textTransform:"uppercase", marginBottom:8
      }}>{label}</div>
      <div style={{ fontSize:24, fontWeight:700, color:c.text, letterSpacing:"-.5px" }}>{value}</div>
      {sub && <div style={{ fontSize:12, color:"var(--text-secondary)", marginTop:4 }}>{sub}</div>}
    </div>
  );
}

export function PageHeader({ title, sub, extra }) {
  return (
    <div style={{ position:"relative" }}>
      {/* Gradient top bar with subtle decorative glow */}
      <div style={{
        position:"relative", overflow:"visible",
        background:`linear-gradient(120deg,${METRO_DARK} 0%,${METRO_PURPLE} 60%,#6d3aa8 100%)`,
        padding:"26px 32px 26px 54px",
        marginLeft:-22,
        borderTopLeftRadius:22,
        display:"flex", alignItems:"center", justifyContent:"space-between",
        flexWrap:"wrap", gap:16,
      }}>
        {/* Decorative glow — clipped to its own layer, never affects dropdowns */}
        <div style={{
          position:"absolute", inset:0, overflow:"hidden", pointerEvents:"none", zIndex:0, borderTopLeftRadius:22,
        }}>
          <div style={{
            position:"absolute", top:-60, right:80, width:220, height:220, borderRadius:"50%",
            background:"radial-gradient(circle, rgba(230,0,126,.25) 0%, transparent 70%)",
          }}/>
        </div>
        <div style={{ position:"relative", zIndex:1 }}>
          <h1 style={{ fontSize:22, fontWeight:800, color:"#fff", letterSpacing:"-.4px", margin:0 }}>{title}</h1>
          {sub && <p style={{ fontSize:12.5, color:"rgba(255,255,255,.6)", margin:"6px 0 0", fontWeight:500 }}>{sub}</p>}
        </div>
        <div style={{ position:"relative", zIndex:1, display:"flex", alignItems:"center" }}>{extra}</div>
      </div>
    </div>
  );
}

// ── Panel — the base "premium card" every section sits inside ──
// Consistent radius, surface color, border, shadow, and internal
// padding rhythm, theme-aware via CSS variables.
export function Panel({ children, style, padded = true, hover = false, className = "" }) {
  return (
    <div
      className={`metro-panel${hover ? " metro-panel-hover" : ""} ${className}`}
      style={{
        background:"var(--surface)",
        border:"1px solid var(--border)",
        borderRadius:18,
        boxShadow:"var(--shadow-sm)",
        padding: padded ? "20px 22px" : 0,
        transition:"box-shadow var(--t-med) var(--ease), transform var(--t-med) var(--ease)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// Small section title used at the top of Panels ("Ranked Breakdown",
// "Commission by DM", etc.) for consistent visual hierarchy.
export function PanelTitle({ children, sub }) {
  return (
    <div style={{ marginBottom:16 }}>
      <div style={{ fontSize:13.5, fontWeight:700, color:"var(--text-primary)" }}>{children}</div>
      {sub && <div style={{ fontSize:11.5, color:"var(--text-muted)", marginTop:2 }}>{sub}</div>}
    </div>
  );
}

// Reusable Overview / Detailed View tab bar (shared across all report pages)
export function TabBar({ active, onChange, tabs }) {
  const items = tabs || [
    { id: "overview", label: "Overview" },
    { id: "detailed", label: "Detailed View" },
  ];
  const containerRef = useRef();
  const btnRefs = useRef({});
  const [indicator, setIndicator] = useState({ left: 0, width: 0, ready: false });

  useLayoutEffect(() => {
    const btn = btnRefs.current[active];
    if (btn && containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const btnRect = btn.getBoundingClientRect();
      setIndicator({ left: btnRect.left - containerRect.left, width: btnRect.width, ready: true });
    }
  }, [active, items.length]);

  return (
    <div style={{
      background:"var(--surface)",
      borderBottom:"1px solid var(--border)",
      padding:"10px 32px",
      display:"flex",
    }}>
      <style>{`
        .metro-segmented {
          position:relative;
          display:inline-flex; gap:4px; padding:4px;
          background:var(--surface-sunken); border-radius:12px;
          border:1px solid var(--border-soft);
        }
        .metro-segmented-indicator {
          position:absolute; top:4px; bottom:4px; border-radius:9px;
          background:linear-gradient(135deg,var(--brand-purple) 0%,var(--brand-purple-dark) 100%);
          box-shadow:0 4px 14px rgba(91,45,142,.35);
          transition:left 260ms cubic-bezier(.4,0,.2,1), width 260ms cubic-bezier(.4,0,.2,1);
          z-index:0;
        }
        .metro-segmented button {
          position:relative; z-index:1;
          padding:6px 16px; border:none; border-radius:8px;
          cursor:pointer; font-size:12.5px; font-weight:600;
          background:transparent; color:var(--text-muted);
          transition:color 200ms ease;
        }
        .metro-segmented button:hover:not(.on) { color:var(--brand-purple); }
        .metro-segmented button.on { color:#fff; }
      `}</style>
      <div className="metro-segmented" ref={containerRef}>
        {indicator.ready && (
          <div className="metro-segmented-indicator" style={{ left:indicator.left, width:indicator.width }}/>
        )}
        {items.map(t => {
          const isActive = active === t.id;
          return (
            <button
              key={t.id}
              ref={el => { btnRefs.current[t.id] = el; }}
              className={isActive ? "on" : ""}
              onClick={() => onChange(t.id)}
            >{t.label}</button>
          );
        })}
      </div>
    </div>
  );
}

// High / Mid / Low badge (commission-based, not % based)
export function Badge({ commission }) {
  const s = statusOf(commission != null ? commission : 0);
  const styles = {
    high: { bg:"rgba(21,128,61,.14)",  color:"var(--brand-success)", border:"rgba(21,128,61,.3)" },
    mid:  { bg:"rgba(180,120,9,.16)",  color:"#d97706",              border:"rgba(180,120,9,.32)" },
    low:  { bg:"rgba(220,38,38,.14)",  color:"var(--brand-danger)",  border:"rgba(220,38,38,.3)" },
  };
  const st = styles[s.cls] || styles.low;
  return (
    <span style={{
      fontSize:11, fontWeight:700, padding:"3px 10px", borderRadius:20,
      background:st.bg, color:st.color,
      border:`1px solid ${st.border}`,
      display:"inline-block", letterSpacing:".02em"
    }}>{s.label}</span>
  );
}

export function CommBar({ commission, max }) {
  const safeMax = max || 1;
  const pct = Math.min((commission / safeMax) * 100, 100);
  const color = commission >= 1036 ? "var(--brand-success)" : commission >= 677 ? "#d97706" : "var(--brand-danger)";
  return (
    <div style={{ display:"flex", alignItems:"center", gap:8 }}>
      <div style={{ flex:1, height:6, background:"var(--border-soft)", borderRadius:3, overflow:"hidden" }}>
        <div style={{ width:`${pct}%`, height:"100%", borderRadius:3, background:color, transition:"width .4s" }}/>
      </div>
      <span style={{ fontSize:11, fontWeight:600, color, minWidth:14, textAlign:"right" }}></span>
    </div>
  );
}

// Legacy ProgressBar (kept for DMWise/MarketWise if needed)
export function ProgressBar({ p }) {
  const color = p >= 100 ? "var(--brand-success)" : p >= 85 ? "#d97706" : "var(--brand-danger)";
  return (
    <div style={{ display:"flex", alignItems:"center", gap:8 }}>
      <div style={{ flex:1, height:6, background:"var(--border-soft)", borderRadius:3, overflow:"hidden" }}>
        <div style={{ width:`${Math.min(p,100)}%`, height:"100%", borderRadius:3, background:color, transition:"width .4s" }}/>
      </div>
      <span style={{ fontSize:11, fontWeight:600, color, minWidth:36, textAlign:"right" }}>{p}%</span>
    </div>
  );
}

export function Avatar({ name, color }) {
  const colors = [
    ["#f3e8ff","#6b21a8"],["#d1fae5","#065f46"],["#fce7f3","#9d174d"],
    ["#fef3c7","#92400e"],["#dbeafe","#1e40af"],["#e0e7ff","#4338ca"]
  ];
  const idx = name ? name.charCodeAt(0) % colors.length : 0;
  const [bg, fg] = color ? [color[0],color[1]] : colors[idx];
  const initials = name
    ? name.split(" ").slice(0,2).map(w=>w[0]).join("").toUpperCase()
    : "?";
  return (
    <div style={{
      width:32, height:32, borderRadius:"50%", background:bg, color:fg,
      display:"flex", alignItems:"center", justifyContent:"center",
      fontSize:11, fontWeight:700, flexShrink:0
    }}>{initials}</div>
  );
}

export function Table({ cols, rows, emptyMsg="No data" }) {
  if (!rows || !rows.length) return (
    <div style={{ textAlign:"center", padding:"48px", color:"var(--text-muted)", fontSize:14 }}>{emptyMsg}</div>
  );
  return (
    <div style={{ overflowX:"auto" }}>
      <style>{`
        .metro-table-row { transition:transform 200ms var(--ease), box-shadow 200ms var(--ease); position:relative; }
        .metro-table-row td { transition:background 180ms var(--ease), box-shadow 180ms var(--ease); }
        .metro-table-row:hover { transform:scale(1.012); box-shadow:0 10px 26px rgba(31,18,54,.18); z-index:5; }
        .metro-table-row:hover td { background:var(--surface-hover) !important; }
        .metro-table-row:hover td:first-child { box-shadow:inset 3px 0 0 var(--brand-purple); border-top-left-radius:10px; border-bottom-left-radius:10px; }
        .metro-table-row:hover td:last-child { border-top-right-radius:10px; border-bottom-right-radius:10px; }
      `}</style>
      <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13 }}>
        <thead>
          <tr style={{ borderBottom:"2px solid var(--border-soft)", background:"var(--surface-sunken)" }}>
            {cols.map(c => (
              <th key={c.key} style={{
                textAlign: c.align||"left", padding:"11px 14px",
                fontWeight:700, fontSize:11, color:"var(--brand-purple)",
                textTransform:"uppercase", letterSpacing:".05em", whiteSpace:"nowrap"
              }}>{c.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row,i) => (
            <tr key={i} className="metro-table-row" style={{ borderBottom:"1px solid var(--border-soft)" }}>
              {cols.map(c => (
                <td key={c.key} style={{
                  padding:"11px 14px", transition:"background var(--t-fast) var(--ease)",
                  textAlign:c.align||"left",
                  color: c.muted ? "var(--text-muted)" : "var(--text-primary)",
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
  );
}

// ── Premium search + sort toolbar ────────────────────────────
// Used above leaderboard tables. Search input and sort dropdown share
// identical height/radius/padding so they read as one unified control.
export function SearchSortToolbar({
  searchValue, onSearchChange, searchPlaceholder = "Search…",
  sortValue, onSortChange, sortOptions = [],
}) {
  return (
    <div className="ds-toolbar">
      <style>{`
        .ds-toolbar {
          display:flex; align-items:center; gap:10px; flex-wrap:wrap;
        }
        .ds-toolbar-search {
          position:relative; flex:1 1 220px; min-width:180px; max-width:300px;
          display:flex; align-items:center;
        }
        .ds-toolbar-search input {
          width:100%; height:38px; box-sizing:border-box;
          padding:0 14px 0 36px; margin:0;
          border-radius:12px; border:1px solid var(--border);
          font-size:12.5px; color:var(--text-primary); background:var(--surface-sunken);
          outline:none; transition:border-color .18s ease, box-shadow .18s ease, background .18s ease;
        }
        .ds-toolbar-search input::placeholder { color:var(--text-muted); }
        .ds-toolbar-search input:hover { border-color:#d8b4fe; background:var(--surface); }
        .ds-toolbar-search input:focus {
          border-color:${METRO_PURPLE}; background:var(--surface);
          box-shadow:0 0 0 3px rgba(91,45,142,.13);
        }
        .ds-toolbar-search .ds-toolbar-icon {
          position:absolute; left:12px; top:50%; transform:translateY(-50%);
          color:var(--text-muted); pointer-events:none; display:flex; transition:color .18s ease;
        }
        .ds-toolbar-search input:focus ~ .ds-toolbar-icon { color:${METRO_PURPLE}; }
        .ds-toolbar-sort { position:relative; flex:0 0 auto; display:flex; align-items:center; }
        .ds-toolbar-sort select {
          appearance:none; -webkit-appearance:none; -moz-appearance:none;
          height:38px; box-sizing:border-box; margin:0;
          padding:0 32px 0 14px;
          border-radius:12px; border:1px solid var(--border);
          font-size:12.5px; color:var(--text-primary); background:var(--surface-sunken);
          outline:none; cursor:pointer;
          transition:border-color .18s ease, box-shadow .18s ease, background .18s ease;
        }
        .ds-toolbar-sort select:hover { border-color:#d8b4fe; background:var(--surface); }
        .ds-toolbar-sort select:focus {
          border-color:${METRO_PURPLE}; background:var(--surface);
          box-shadow:0 0 0 3px rgba(91,45,142,.13);
        }
        .ds-toolbar-sort .ds-toolbar-icon {
          position:absolute; right:11px; top:50%; transform:translateY(-50%);
          color:var(--text-muted); pointer-events:none; display:flex;
        }
        @media (max-width:520px) {
          .ds-toolbar { flex-direction:column; align-items:stretch; }
          .ds-toolbar-search { max-width:none; }
          .ds-toolbar-sort select { width:100%; }
        }
      `}</style>

      {sortOptions.length > 0 && (
        <div className="ds-toolbar-sort">
          <select value={sortValue} onChange={e => onSortChange(e.target.value)}>
            {sortOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
          <span className="ds-toolbar-icon"><ChevronDown size={14}/></span>
        </div>
      )}

      <div className="ds-toolbar-search">
        <input
          value={searchValue}
          onChange={e => onSearchChange(e.target.value)}
          placeholder={searchPlaceholder}
        />
        <span className="ds-toolbar-icon"><Search size={14}/></span>
      </div>
    </div>
  );
}

// ── Premium multi-select filter dropdown ─────────────────────
// Drop-in replacement for the single-select purple-pill filters
// (Market / DM / Tier). Renders as a chip-style pill in its closed
// state and a searchable checkbox panel with a built-in "Clear
// Selection" action when open.
// `options` accepts either an array of strings, or an array of
// { value, label } objects when the display text differs from the
// underlying filter value (e.g. Tier's "High (≥$1,000)").
export function MultiSelectDropdown({ label, options, selected, onChange, placeholder }) {
  const [open, setOpen]     = useState(false);
  const [search, setSearch] = useState("");
  const [align, setAlign]   = useState("left");
  const ref = useRef();
  const panelRef = useRef();

  const normOptions = options.map(o => (typeof o === "string" ? { value:o, label:o } : o));

  useEffect(() => {
    if (!open) return;
    const onDocClick = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [open]);

  // Flip the panel to hang from the right edge of the trigger instead of
  // the left whenever it would otherwise overflow the viewport — this is
  // what was clipping/pushing the whole page sideways for filters that
  // sit near the right edge of the header (Markets, DMs, Tiers).
  useLayoutEffect(() => {
    if (!open || !panelRef.current) return;
    const rect = panelRef.current.getBoundingClientRect();
    setAlign(rect.right > window.innerWidth - 8 ? "right" : "left");
  }, [open]);

  const toggle = (val) => {
    onChange(selected.includes(val) ? selected.filter(v => v !== val) : [...selected, val]);
  };

  const filteredOptions = normOptions.filter(o => o.label.toLowerCase().includes(search.toLowerCase()));

  const summary = selected.length === 0
    ? placeholder
    : selected.length === 1
    ? (normOptions.find(o => o.value === selected[0])?.label || selected[0])
    : `${selected.length} ${label} selected`;

  return (
    <div ref={ref} style={{ position:"relative" }}>
      <style>{`
        .msd-trigger {
          display:flex; align-items:center; gap:8px;
          padding:7px 11px; border-radius:10px;
          border:1px solid rgba(255,255,255,.2);
          background:rgba(255,255,255,.12);
          color:#fff; font-size:12px; cursor:pointer;
          max-width:190px; transition:background 200ms ease, border-color 200ms ease, box-shadow 200ms ease;
        }
        .msd-trigger:hover { background:rgba(255,255,255,.2); border-color:rgba(255,255,255,.32); box-shadow:0 4px 10px rgba(0,0,0,.12); }
        .msd-trigger.active { background:rgba(255,255,255,.24); border-color:rgba(255,255,255,.4); box-shadow:0 4px 12px rgba(0,0,0,.15); }
        .msd-panel {
          position:absolute; top:calc(100% + 8px); z-index:500;
          width:236px; max-width:calc(100vw - 24px); background:var(--surface); border-radius:16px;
          border:1px solid var(--border); box-shadow:var(--shadow-lg);
          overflow:hidden; animation:msd-fade .18s cubic-bezier(.4,0,.2,1);
        }
        @keyframes msd-fade { from { opacity:0; transform:translateY(-4px) scale(.98); } to { opacity:1; transform:translateY(0) scale(1); } }
        .msd-search { padding:10px; border-bottom:1px solid var(--border-soft); }
        .msd-search input {
          width:100%; box-sizing:border-box; padding:7px 10px;
          border-radius:8px; border:1px solid var(--border); font-size:12px; color:var(--text-primary);
          outline:none; background:var(--surface-sunken); text-align:center;
        }
        .msd-search input:focus { border-color:${METRO_PURPLE}; background:var(--surface); }
        .msd-list { max-height:210px; overflow-y:auto; padding:6px; }
        .msd-option {
          display:flex; align-items:center; gap:9px; padding:7px 8px;
          border-radius:7px; cursor:pointer; font-size:12.5px; color:var(--text-secondary);
          transition:background .12s ease;
        }
        .msd-option:hover { background:var(--surface-hover); }
        .msd-footer {
          border-top:1px solid var(--border-soft); padding:8px 10px;
          display:flex; justify-content:space-between; align-items:center;
        }
        .msd-clear {
          border:none; background:transparent; color:${METRO_PINK};
          font-size:12px; font-weight:600; cursor:pointer; padding:4px 2px;
        }
        .msd-clear:hover { text-decoration:underline; }
      `}</style>

      <button className={`msd-trigger${open ? " active" : ""}`} onClick={() => setOpen(o => !o)}>
        <span style={{ flex:1, textAlign:"left", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
          {summary}
        </span>
        <ChevronDown size={12}/>
      </button>

      {open && (
        <div ref={panelRef} className="msd-panel" style={{
          left: align === "left" ? 0 : "auto",
          right: align === "right" ? 0 : "auto",
        }}>
          {normOptions.length > 6 && (
            <div className="msd-search">
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search"
                autoFocus
              />
            </div>
          )}
          <div className="msd-list">
            {filteredOptions.length === 0 && (
              <div style={{ padding:"10px 8px", fontSize:12, color:"#9ca3af" }}>No matches</div>
            )}
            {filteredOptions.map(o => (
              <label key={o.value} className="msd-option">
                <input type="checkbox" checked={selected.includes(o.value)} onChange={() => toggle(o.value)}/>
                {o.label}
              </label>
            ))}
          </div>
          <div className="msd-footer">
            <span style={{ fontSize:11, color:"#9ca3af" }}>{selected.length} selected</span>
            <button className="msd-clear" onClick={() => { onChange([]); }}>
              Clear Selection
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
