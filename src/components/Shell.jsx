import { useState, useRef, useEffect } from "react";
import { Users, Map, LayoutDashboard, LogOut, Sun, Moon, ChevronLeft } from "../icons";
import { useTheme } from "../theme";

const NAV = [
  { id:"all",    label:"Employee Wise", icon: Users },
  { id:"dm",     label:"DM Wise",       icon: LayoutDashboard },
  { id:"market", label:"Market Wise",   icon: Map },
];

const METRO_PURPLE = "#5b2d8e";
const METRO_PINK   = "#e6007e";
const WIDTH_OPEN      = 240;
const WIDTH_COLLAPSED = 78;

function getInitialCollapsed() {
  try { return localStorage.getItem("metro-sidebar-collapsed") === "1"; }
  catch (e) { return false; }
}

function ThemeToggle({ collapsed }) {
  const { isDark, toggleTheme } = useTheme();
  if (collapsed) {
    return (
      <button
        onClick={toggleTheme}
        title={isDark ? "Switch to light mode" : "Switch to dark mode"}
        style={{
          width:38, height:38, borderRadius:12, border:"1px solid rgba(255,255,255,.1)",
          background:"rgba(255,255,255,.05)", cursor:"pointer",
          display:"flex", alignItems:"center", justifyContent:"center",
          color:"rgba(255,255,255,.7)", margin:"0 auto",
          transition:"background .18s ease, color .18s ease",
        }}
      >
        {isDark ? <Moon size={15}/> : <Sun size={15}/>}
      </button>
    );
  }
  return (
    <button
      onClick={toggleTheme}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      style={{
        width:"100%", display:"flex", alignItems:"center", justifyContent:"space-between",
        padding:"9px 12px", borderRadius:12, border:"1px solid rgba(255,255,255,.1)",
        background:"rgba(255,255,255,.05)", cursor:"pointer",
      }}
    >
      <span style={{ display:"flex", alignItems:"center", gap:8, fontSize:11.5, fontWeight:500, color:"rgba(255,255,255,.72)" }}>
        {isDark ? <Moon size={13}/> : <Sun size={13}/>}
        {isDark ? "Dark mode" : "Light mode"}
      </span>
      <span style={{
        position:"relative", width:34, height:19, borderRadius:20, flexShrink:0,
        background: isDark ? METRO_PINK : "rgba(255,255,255,.22)",
        transition:"background .25s ease",
      }}>
        <span style={{
          position:"absolute", top:2, left: isDark ? 17 : 2, width:15, height:15, borderRadius:"50%",
          background:"#fff", boxShadow:"0 1px 3px rgba(0,0,0,.3)",
          transition:"left .25s cubic-bezier(.4,0,.2,1)",
          display:"flex", alignItems:"center", justifyContent:"center",
        }}>
          {isDark ? <Moon size={9} color={METRO_PINK}/> : <Sun size={9} color="#d97706"/>}
        </span>
      </span>
    </button>
  );
}

export default function Shell({ user, page, setPage, children }) {
  const [collapsed, setCollapsed] = useState(getInitialCollapsed);
  const [isMobile,  setIsMobile]  = useState(() => window.innerWidth < 768);

  useEffect(() => {
    try { localStorage.setItem("metro-sidebar-collapsed", collapsed ? "1" : "0"); } catch (e) { /* ignore */ }
  }, [collapsed]);

  // Force icon-only sidebar on narrow viewports, independent of the
  // user's saved preference (which is restored once the viewport widens).
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const handler = () => setIsMobile(mq.matches);
    handler();
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const effectiveCollapsed = collapsed || isMobile;
  const sidebarWidth = effectiveCollapsed ? WIDTH_COLLAPSED : WIDTH_OPEN;

  return (
    <div style={{ minHeight:"100vh", background:"var(--bg)", fontFamily:"'DM Sans','Segoe UI',sans-serif" }}>
      <style>{`
        .metro-sidebar { width:${sidebarWidth}px; transition:width 280ms cubic-bezier(.4,0,.2,1); }
        .metro-main { margin-left:${sidebarWidth}px; transition:margin-left 280ms cubic-bezier(.4,0,.2,1); }

        .nav-btn {
          position:relative; display:flex; align-items:center; gap:12px;
          padding:11px 14px; border-radius:13px; border:none; cursor:pointer;
          text-align:left; width:100%; font-size:13.5px;
          background:transparent;
          transition:background 200ms var(--ease), color 200ms ease, transform 180ms ease, box-shadow 200ms ease;
        }
        .nav-btn:hover:not(.active) { background:rgba(255,255,255,.09); color:#fff !important; transform:translateX(2px); }
        .nav-btn.active {
          background:linear-gradient(135deg, ${METRO_PURPLE} 0%, ${METRO_PINK} 100%);
          color:#fff; font-weight:600;
          box-shadow: 0 6px 16px rgba(230,0,126,.4), 0 2px 4px rgba(0,0,0,.2);
        }
        .nav-btn.active:hover { transform:scale(1.02); box-shadow: 0 8px 20px rgba(230,0,126,.48), 0 2px 4px rgba(0,0,0,.2); }
        .nav-btn.active svg { color:#fff; }
        .nav-btn.active::before {
          content:""; position:absolute; left:-12px; top:50%; transform:translateY(-50%);
          width:4px; height:22px; border-radius:4px;
          background:#fff; opacity:.85;
        }
        .metro-sidebar.collapsed .nav-btn { justify-content:center; padding:11px 0; }
        .metro-sidebar.collapsed .nav-btn.active::before { left:8px; }

        .signout-btn { transition:color .15s ease, background .15s ease; border-radius:8px; }
        .signout-btn:hover { color:#fff !important; background:rgba(255,255,255,.1); }
        .collapse-btn { transition:background .18s ease, transform .18s ease; }
        .collapse-btn:hover { background:rgba(255,255,255,.14) !important; }
      `}</style>

      {/* ── SIDEBAR — flush to viewport edges, rounded only on the right ── */}
      <div className={`metro-sidebar${effectiveCollapsed ? " collapsed" : ""}`} style={{
        position:"fixed", top:0, left:0, bottom:0,
        background: `linear-gradient(180deg, var(--sidebar-inner) 0%, #1a0b30 100%)`,
        borderRadius:"0 22px 22px 0",
        display:"flex", flexDirection:"column",
        zIndex:100, boxShadow:"var(--shadow-lg)",
        borderRight:"1px solid rgba(255,255,255,.06)",
      }}>
        {/* Logo */}
        <div style={{ padding: effectiveCollapsed ? "20px 0 16px" : "20px 16px 16px", borderBottom:"1px solid rgba(255,255,255,.08)" }}>
          <div style={{ display:"flex", alignItems:"center", gap:10, justifyContent: effectiveCollapsed ? "center" : "flex-start" }}>
            <img
              src="/logo.png"
              alt="Metro by T-Mobile"
              style={{ width:40, height:40, objectFit:"contain", borderRadius:11, flexShrink:0, boxShadow:"0 4px 10px rgba(0,0,0,.25)" }}
            />
            {!effectiveCollapsed && (
              <div>
                <div style={{ color:"#fff", fontWeight:700, fontSize:12.5, lineHeight:1.3 }}>Employee Commission</div>
                <div style={{ color:"#fff", fontWeight:700, fontSize:12.5, lineHeight:1.3 }}>Dashboard</div>
                <div style={{ color:METRO_PINK, fontSize:10, marginTop:2, fontWeight:500 }}>{user.label}</div>
              </div>
            )}
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex:1, padding: effectiveCollapsed ? "16px 10px" : "16px 12px", display:"flex", flexDirection:"column", gap:6 }}>
          {!effectiveCollapsed && (
            <div style={{
              color:"rgba(255,255,255,.32)", fontSize:10, fontWeight:700,
              letterSpacing:".1em", padding:"0 10px", marginBottom:8
            }}>NAVIGATION</div>
          )}
          {NAV.map(n => {
            const Icon   = n.icon;
            const active = page === n.id;
            return (
              <button key={n.id} onClick={() => setPage(n.id)}
                className={`nav-btn${active ? " active" : ""}`}
                title={effectiveCollapsed ? n.label : undefined}
                style={{ color: active ? "#fff" : "rgba(255,255,255,.72)" }}>
                <Icon size={16}/> {!effectiveCollapsed && <span>{n.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* Theme toggle */}
        <div style={{ padding: effectiveCollapsed ? "0 10px 12px" : "0 12px 12px" }}>
          <ThemeToggle collapsed={effectiveCollapsed}/>
        </div>

        {/* Collapse toggle — desktop/tablet only; mobile is always collapsed */}
        {!isMobile && (
        <div style={{ padding: effectiveCollapsed ? "0 10px 12px" : "0 12px 12px" }}>
          <button
            onClick={() => setCollapsed(c => !c)}
            className="collapse-btn"
            title={effectiveCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            style={{
              width:"100%", display:"flex", alignItems:"center", justifyContent: effectiveCollapsed ? "center" : "space-between",
              padding:"9px 12px", borderRadius:12, border:"1px solid rgba(255,255,255,.1)",
              background:"rgba(255,255,255,.04)", cursor:"pointer", color:"rgba(255,255,255,.6)",
            }}
          >
            {!effectiveCollapsed && <span style={{ fontSize:11.5, fontWeight:500 }}>Collapse</span>}
            <span style={{ display:"flex", transform: effectiveCollapsed ? "rotate(180deg)" : "none", transition:"transform 280ms cubic-bezier(.4,0,.2,1)" }}>
              <ChevronLeft size={14}/>
            </span>
          </button>
        </div>
        )}

        {/* User info */}
        <div style={{
          padding: effectiveCollapsed ? "14px 8px" : "14px",
          borderTop:"1px solid rgba(255,255,255,.08)",
          display:"flex", alignItems:"center", gap:10, justifyContent: effectiveCollapsed ? "center" : "flex-start",
        }}>
          <div style={{
            width:32, height:32, borderRadius:"50%",
            background:`linear-gradient(135deg,${METRO_PURPLE},${METRO_PINK})`,
            display:"flex", alignItems:"center", justifyContent:"center",
            fontSize:12, fontWeight:700, color:"#fff", flexShrink:0,
            boxShadow:"0 3px 8px rgba(230,0,126,.35)",
          }}>
            {user.username[0].toUpperCase()}
          </div>
          {!effectiveCollapsed && (
            <>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ color:"rgba(255,255,255,.92)", fontSize:12, fontWeight:600, textTransform:"capitalize" }}>{user.username}</div>
                <div style={{ color:"rgba(255,255,255,.5)", fontSize:10, textTransform:"capitalize" }}>{user.role}</div>
              </div>
              <button onClick={() => window.location.reload()} title="Sign out" className="signout-btn"
                style={{ background:"none", border:"none", cursor:"pointer", color:"rgba(255,255,255,.5)", padding:6 }}>
                <LogOut size={14}/>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Main content — flush next to sidebar, full remaining viewport */}
      <div className="metro-main" style={{ minHeight:"100vh" }}>
        {children}
      </div>
    </div>
  );
}
