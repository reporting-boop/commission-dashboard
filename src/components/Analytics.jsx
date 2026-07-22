import { useState } from "react";
import { ChevronDown, ChevronRight, Users, DollarSign, TrendingUp, AlertTriangle, TrendingDown, Award } from "../icons";
import {
  EARNING_VERTICALS, CHARGEBACK_CATEGORIES,
  buildCategorySummary, computeExecutiveInsights,
  fmtFull,
} from "../data";

const METRO_PURPLE = "#5b2d8e";
const CB_RED       = "#dc2626";
const CB_RED_DARK  = "#7f1d1d";

const EARN_GRADIENT = ["#5b2d8e", "#7c3fae", "#9857c4", "#b477d6", "#cf9ce3", "#e0b8ec"];
const CB_GRADIENT   = ["#dc2626", "#e6007e", "#f0507f", "#f27a95", "#f5a3b3", "#f8c9d3"];

// Each section keeps its own permanent color identity — purple for
// Paying Verticals, red for Chargebacks — in every visual state
// (collapsed card, expanded header, breakdown list, ranking bars).
const THEMES = {
  purple: {
    accentText: METRO_PURPLE,
    openBg: `linear-gradient(135deg,${METRO_PURPLE} 0%,#3d1d63 100%)`,
    track: "rgba(91,45,142,.09)",
    outsideText: "var(--rankbar-text-purple)",
  },
  red: {
    accentText: CB_RED,
    openBg: `linear-gradient(135deg,${CB_RED} 0%,${CB_RED_DARK} 100%)`,
    track: "rgba(220,38,38,.09)",
    outsideText: "var(--rankbar-text-red)",
  },
};

// One horizontal ranking bar — label lives inside the filled bar when
// there's room, otherwise it steps just outside so it never gets clipped.
// The value always sits in its own reserved zone on the far right, so
// it never collides with the label either way.
function RankingBar({ label, value, pct, color, theme }) {
  const fillPct     = Math.max(pct, 3); // keep a sliver visible even for tiny shares
  const fitsInside  = pct >= 34;
  const valueOnFill = fillPct >= 85; // value sits near the right edge — only "on" the fill once it's nearly full width
  return (
    <div style={{ position:"relative", height:36, borderRadius:9, background:theme.track, overflow:"hidden" }}>
      <div style={{
        position:"absolute", left:0, top:0, bottom:0, width:`${fillPct}%`,
        borderRadius:9, background:color, transition:"width .4s ease",
      }}/>
      <div style={{
        position:"absolute", inset:0, display:"flex", alignItems:"center",
        paddingLeft: fitsInside ? 12 : `calc(${fillPct}% + 10px)`,
        paddingRight:72,
        fontSize:12, fontWeight:600,
        color: fitsInside ? "#fff" : theme.outsideText,
        whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis",
      }}>
        {label}
      </div>
      <div style={{
        position:"absolute", right:10, top:0, bottom:0, display:"flex", alignItems:"center",
        fontSize:11.5, fontWeight:700, color: valueOnFill ? "#fff" : theme.outsideText,
      }}>
        {value}
      </div>
    </div>
  );
}

// Small circular rank badge shown to the left of each bar.
function RankBadge({ n, theme }) {
  return (
    <div style={{
      width:28, height:28, borderRadius:"50%", flexShrink:0,
      display:"flex", alignItems:"center", justifyContent:"center",
      background:theme.track, color:theme.outsideText,
      fontSize:12, fontWeight:800, border:`1.5px solid ${theme.accentText}40`,
    }}>
      {n}
    </div>
  );
}

// One "Total X" summary card that expands into a full-width ranked breakdown.
function VerticalSummarySection({ title, subtitle, summary, gradient, negative, emptyHint, theme }) {
  const [open, setOpen] = useState(false);
  const hasData = summary.categories.length > 0;
  const t = THEMES[theme] || THEMES.purple;
  const maxAbs = hasData ? Math.abs(summary.categories[0].value) : 0;

  return (
    <div className="metro-panel-hover" style={{
      background:"var(--surface)", borderRadius:18, border:"1px solid var(--border)",
      boxShadow:"var(--shadow-sm)", overflow:"hidden",
      transition:"box-shadow var(--t-med) var(--ease), transform var(--t-med) var(--ease)",
    }}>
      <button
        onClick={() => hasData && setOpen(o => !o)}
        style={{
          width:"100%", textAlign:"left", border:"none", cursor: hasData ? "pointer" : "default",
          background: open ? t.openBg : "var(--surface)",
          padding:"22px 24px",
          display:"flex", alignItems:"center", justifyContent:"space-between", gap:16,
          transition:"background var(--t-med) var(--ease)",
        }}
      >
        <div>
          <div style={{
            fontSize:12, fontWeight:600, letterSpacing:".04em", textTransform:"uppercase",
            color: open ? "rgba(255,255,255,.65)" : "var(--text-muted)", marginBottom:8,
          }}>{title}</div>
          <div style={{
            fontSize:30, fontWeight:800, letterSpacing:"-.5px",
            color: open ? "#fff" : t.accentText,
          }}>
            {hasData ? (negative ? "-" : "") + fmtFull(Math.abs(summary.total)) : "$0.00"}
          </div>
          <div style={{
            fontSize:12, marginTop:6,
            color: open ? "rgba(255,255,255,.55)" : "var(--text-secondary)",
          }}>
            {hasData ? `${summary.count} categor${summary.count===1?"y":"ies"} · ${subtitle}` : emptyHint}
          </div>
        </div>
        {hasData && (
          <div style={{
            display:"flex", alignItems:"center", gap:6, flexShrink:0,
            fontSize:12, fontWeight:600,
            color: open ? "#fff" : t.accentText,
          }}>
            {open ? "Hide breakdown" : "View Breakdown"}
            {open ? <ChevronDown size={16}/> : <ChevronRight size={16}/>}
          </div>
        )}
      </button>

      {open && hasData && (
        <div style={{ padding:"24px 26px 26px", borderTop:"1px solid var(--border-soft)" }}>
          <div style={{ fontSize:12, fontWeight:700, color:"var(--text-muted)", textTransform:"uppercase", letterSpacing:".05em", marginBottom:16 }}>
            Ranked Breakdown
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
            {summary.categories.map((c, i) => {
              const pct = maxAbs !== 0 ? (Math.abs(c.value) / maxAbs) * 100 : 0;
              return (
                <div key={c.key} style={{ display:"flex", alignItems:"center", gap:14 }}>
                  <RankBadge n={i+1} theme={t}/>
                  <div style={{ flex:1, minWidth:0 }}>
                    <RankingBar
                      label={c.label}
                      value={(negative ? "-" : "") + fmtFull(Math.abs(c.value))}
                      pct={pct}
                      color={gradient[i % gradient.length]}
                      theme={t}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Executive Insight Hero — premium gradient KPI cards ─────────
// Each tone maps to a rich two-stop gradient (not a plain white card)
// plus a matching icon, so every metric has its own visual identity.
const TONE_STYLES = {
  purple: { gradient:"linear-gradient(135deg,#6d3aa8 0%,#3d1d63 100%)", icon:Users,         shadow:"rgba(91,45,142,.35)"  },
  green:  { gradient:"linear-gradient(135deg,#16a34a 0%,#065f46 100%)", icon:DollarSign,    shadow:"rgba(6,95,70,.35)"    },
  blue:   { gradient:"linear-gradient(135deg,#2563eb 0%,#1e3a8a 100%)", icon:TrendingUp,    shadow:"rgba(30,58,138,.35)"  },
  red:    { gradient:"linear-gradient(135deg,#ef4444 0%,#7f1d1d 100%)", icon:AlertTriangle, shadow:"rgba(127,29,29,.35)" },
  teal:   { gradient:"linear-gradient(135deg,#14b8a6 0%,#115e59 100%)", icon:DollarSign,    shadow:"rgba(17,94,89,.35)"  },
  orange: { gradient:"linear-gradient(135deg,#f97316 0%,#7c2d12 100%)", icon:TrendingDown,  shadow:"rgba(124,45,18,.35)" },
  indigo: { gradient:"linear-gradient(135deg,#6366f1 0%,#312e81 100%)", icon:Award,         shadow:"rgba(49,46,129,.35)" },
};

function KpiHeroCard({ label, value, sub, tone }) {
  const t = TONE_STYLES[tone] || TONE_STYLES.purple;
  const Icon = t.icon;
  return (
    <div className="kpi-hero-card metro-fade-in" style={{
      position:"relative", overflow:"hidden",
      background: t.gradient,
      borderRadius:19,
      padding:"14px 16px",
      boxShadow:`0 6px 16px ${t.shadow}`,
      minHeight:104,
      minWidth:0,
      transition:"transform 200ms var(--ease), box-shadow 200ms var(--ease)",
    }}>
      {/* Decorative glow shapes */}
      <div style={{
        position:"absolute", top:-28, right:-28, width:104, height:104, borderRadius:"50%",
        background:"rgba(255,255,255,.10)", pointerEvents:"none",
      }}/>
      <div style={{
        position:"absolute", bottom:-36, left:-18, width:80, height:80, borderRadius:"50%",
        background:"rgba(255,255,255,.06)", pointerEvents:"none",
      }}/>

      {/* Icon badge — small, top-right corner, secondary to the text */}
      <div style={{
        position:"absolute", top:12, right:12, width:26, height:26, borderRadius:9,
        background:"rgba(255,255,255,.2)",
        backdropFilter:"blur(6px)", WebkitBackdropFilter:"blur(6px)",
        border:"1px solid rgba(255,255,255,.25)",
        display:"flex", alignItems:"center", justifyContent:"center",
        flexShrink:0,
      }}>
        <Icon size={13} color="#fff"/>
      </div>

      {/* Text — the primary content, full width from the left */}
      <div style={{ position:"relative", minWidth:0, paddingRight:34 }}>
        <div style={{
          fontSize:10, fontWeight:700, letterSpacing:".055em", textTransform:"uppercase",
          color:"rgba(255,255,255,.75)", marginBottom:5, lineHeight:1.35,
          display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical", overflow:"hidden",
        }}>
          {label}
        </div>
        <div style={{
          fontSize:17, fontWeight:800, color:"#fff", letterSpacing:"-.2px", lineHeight:1.22,
          display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical", overflow:"hidden",
        }} title={String(value)}>
          {value}
        </div>
        {sub && (
          <div style={{
            fontSize:10.5, fontWeight:400, color:"rgba(255,255,255,.6)", marginTop:4,
            whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis",
          }} title={String(sub)}>
            {sub}
          </div>
        )}
      </div>
    </div>
  );
}

// The primary KPI hero — sits at the very top of every Overview tab.
// "level" = "employee" | "dm" | "market" drives both the Total-count
// card and the per-level averages/leader card.
export function ExecutiveInsightHero({ rows, level = "employee" }) {
  const insights = computeExecutiveInsights(rows, level);
  if (!insights.length) return null;

  return (
    <div style={{ marginBottom:24 }}>
      <style>{`
        .kpi-hero-grid {
          display:grid;
          grid-template-columns: repeat(1, 1fr);
          gap:14px;
        }
        @media (min-width: 560px) {
          .kpi-hero-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (min-width: 900px) {
          .kpi-hero-grid { grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); }
        }
        @media (min-width: 1480px) {
          .kpi-hero-grid { grid-template-columns: repeat(7, 1fr); }
        }
        .kpi-hero-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 24px rgba(0,0,0,.2) !important;
        }
      `}</style>
      <div className="kpi-hero-grid">
        {insights.map(ins => <KpiHeroCard key={ins.key} {...ins}/>)}
      </div>
    </div>
  );
}

// Main export — the "Commission Intelligence" section (Paying Verticals +
// Chargebacks). Drop this into any Overview tab, lower on the page, and
// pass the page's already-filtered rows. Executive Insights now live in
// the separate ExecutiveInsightHero component at the top of the page.
export default function CommissionAnalytics({ rows }) {
  const earnSummary = buildCategorySummary(rows, EARNING_VERTICALS);
  const cbSummary   = buildCategorySummary(rows, CHARGEBACK_CATEGORIES);

  if (!earnSummary.categories.length && !cbSummary.categories.length) {
    return null; // nothing to show — e.g. demo rows with no granular breakdown loaded
  }

  return (
    <div style={{ marginBottom:24 }}>
      <div style={{ display:"flex", alignItems:"baseline", justifyContent:"space-between", marginBottom:14 }}>
        <div style={{ fontSize:15, fontWeight:700, color:"var(--text-primary)" }}>Commission Intelligence</div>
        <div style={{ fontSize:11.5, color:"var(--text-muted)" }}>Where the money comes from — and where it's going</div>
      </div>

      <style>{`
        .ci-outer-grid { display:grid; grid-template-columns:1fr 1fr; gap:16px; }
        @media (max-width:760px) {
          .ci-outer-grid { grid-template-columns:1fr; }
        }
      `}</style>
      <div className="ci-outer-grid">
        <VerticalSummarySection
          title="Total Paying Verticals"
          subtitle="Every earning category"
          summary={earnSummary}
          gradient={EARN_GRADIENT}
          negative={false}
          emptyHint="No earning-vertical data in this selection"
          theme="purple"
        />
        <VerticalSummarySection
          title="Total Chargebacks"
          subtitle="Every deduction category"
          summary={cbSummary}
          gradient={CB_GRADIENT}
          negative={true}
          emptyHint="No chargeback data in this selection"
          theme="red"
        />
      </div>
    </div>
  );
}
