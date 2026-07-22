import { useState, useMemo } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell
} from "recharts";
import { fmt, fmtFull, statusOf, MASTER_COLUMNS } from "../data";
import { StatCard, PageHeader, Badge, CommBar, Avatar, Table, TabBar } from "../components/UI";
import DetailTable from "../components/DetailTable";
import CommissionAnalytics, { ExecutiveInsightHero } from "../components/Analytics";
import { ChevronDown, ChevronRight } from "../icons";

const METRO_PURPLE = "#5b2d8e";
const METRO_PINK   = "#e6007e";
const MKT_COLORS = [METRO_PURPLE,"#7c3aed","#9333ea","#a855f7","#c026d3",METRO_PINK,"#db2777","#be185d","#065f46","#0e7490"];

// ── Aggregated row for Market / DM level ──────────────────────
function aggregateRows(rows) {
  if (!rows || !rows.length) return {};
  const out = {};
  MASTER_COLUMNS.forEach(c => {
    if (["market","dm","name","ntid"].includes(c.key)) return;
    const nums = rows.map(r => Number(r[c.key])||0);
    out[c.key] = nums.reduce((s,v) => s+v, 0);
  });
  return out;
}

// ── Detailed View Tab ─────────────────────────────────────────
function DetailedViewTab({ data, user }) {
  const [drillMarket, setDrillMarket] = useState(null);
  const [drillDm,     setDrillDm]     = useState(null);
  const [drillEmp,    setDrillEmp]    = useState(null);
  const [level,       setLevel]       = useState("market"); // market | dm | employee

  const filteredData = useMemo(() => {
    if (user.role === "market") return data.filter(r => r.market === user.market);
    return data;
  }, [data, user]);

  // Market aggregates
  const marketGroups = useMemo(() => {
    const map = {};
    filteredData.forEach(r => {
      const k = r.market || "Unknown";
      if (!map[k]) map[k] = { market:k, employees:[], commission:0 };
      map[k].employees.push(r);
      map[k].commission += (r.finalCommission ?? r.commission);
    });
    return Object.values(map).sort((a,b) => b.commission - a.commission);
  }, [filteredData]);

  // DM aggregates for selected market
  const dmGroups = useMemo(() => {
    if (!drillMarket) return [];
    const rows = filteredData.filter(r => r.market === drillMarket);
    const map = {};
    rows.forEach(r => {
      const k = r.dm || "Unknown";
      if (!map[k]) map[k] = { dm:k, market:drillMarket, employees:[], commission:0 };
      map[k].employees.push(r);
      map[k].commission += (r.finalCommission ?? r.commission);
    });
    return Object.values(map).sort((a,b) => b.commission - a.commission);
  }, [filteredData, drillMarket]);

  // Employees for selected DM
  const empRows = useMemo(() => {
    if (!drillDm) return [];
    return filteredData
      .filter(r => r.market === drillMarket && r.dm === drillDm)
      .sort((a,b) => (b.finalCommission??b.commission) - (a.finalCommission??a.commission));
  }, [filteredData, drillMarket, drillDm]);

  const breadcrumb = (
    <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:16, fontSize:13, flexWrap:"wrap" }}>
      <span
        style={{ color: !drillMarket ? METRO_PURPLE : "#6b7280", fontWeight: !drillMarket ? 700 : 400, cursor:"pointer" }}
        onClick={() => { setDrillMarket(null); setDrillDm(null); setDrillEmp(null); setLevel("market"); }}
      >All Markets</span>
      {drillMarket && <>
        <ChevronRight size={14} color="#9ca3af"/>
        <span
          style={{ color: !drillDm ? METRO_PURPLE : "#6b7280", fontWeight: !drillDm ? 700 : 400, cursor:"pointer" }}
          onClick={() => { setDrillDm(null); setDrillEmp(null); setLevel("dm"); }}
        >{drillMarket}</span>
      </>}
      {drillDm && <>
        <ChevronRight size={14} color="#9ca3af"/>
        <span
          style={{ color: !drillEmp ? METRO_PURPLE : "#6b7280", fontWeight: !drillEmp ? 700 : 400, cursor:"pointer" }}
          onClick={() => { setDrillEmp(null); setLevel("employee"); }}
        >{drillDm}</span>
      </>}
      {drillEmp && <>
        <ChevronRight size={14} color="#9ca3af"/>
        <span style={{ color:METRO_PURPLE, fontWeight:700 }}>{drillEmp.name}</span>
      </>}
    </div>
  );

  // ── MARKET LEVEL ──────────────────────────────────────────
  if (!drillMarket) {
    // Build aggregated rows for detail table
    const aggRows = marketGroups.map(mg => ({
      market: mg.market, dm:"(All DMs)", ntid:"", name:`${mg.employees.length} employees`,
      ...aggregateRows(mg.employees)
    }));

    return (
      <div style={{ padding:"20px 28px" }}>
        {breadcrumb}
        <div style={{ display:"flex", gap:14, marginBottom:20, flexWrap:"wrap" }}>
          <StatCard label="Markets" value={marketGroups.length} sub="Click to drill down" accent="purple"/>
          <StatCard label="Total Commission" value={fmt(marketGroups.reduce((s,m)=>s+m.commission,0))} sub="All markets" accent="pink"/>
          <StatCard label="Total Employees" value={filteredData.length} sub="Across all markets" accent="blue"/>
        </div>

        {/* Market summary cards */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:12, marginBottom:20 }}>
          {marketGroups.map((mg, i) => {
            const color = MKT_COLORS[i % MKT_COLORS.length];
            return (
              <div key={mg.market}
                onClick={() => { setDrillMarket(mg.market); setLevel("dm"); }}
                style={{
                  background:"var(--surface)", borderRadius:12, padding:"16px",
                  border:`1px solid #e9eaf0`, cursor:"pointer", transition:"all .15s",
                  borderLeft:`4px solid ${color}`,
                  boxShadow:"0 2px 6px rgba(91,45,142,.05)"
                }}
                onMouseEnter={e => e.currentTarget.style.boxShadow=`0 4px 16px ${color}33`}
                onMouseLeave={e => e.currentTarget.style.boxShadow="0 2px 6px rgba(91,45,142,.05)"}
              >
                <div style={{ fontWeight:700, color:"var(--text-primary)", fontSize:13, marginBottom:6 }}>{mg.market}</div>
                <div style={{ fontSize:11, color:"var(--text-muted)", marginBottom:8 }}>{mg.employees.length} employees</div>
                <div style={{ fontFamily:"monospace", fontWeight:700, color:color, fontSize:14 }}>{fmtFull(mg.commission)}</div>
                <div style={{ marginTop:6 }}>
                  <CommBar commission={mg.commission} max={marketGroups[0]?.commission||1}/>
                </div>
                <div style={{ marginTop:8 }}>
                  <Badge commission={mg.commission}/>
                </div>
              </div>
            );
          })}
        </div>

        {/* Aggregated detail table */}
        <div style={{ background:"var(--surface)", borderRadius:18, border:"1px solid var(--border)", boxShadow:"var(--shadow-sm)" }}>
          <div style={{ padding:"12px 18px", borderBottom:"1px solid var(--border-soft)", background:"var(--surface-sunken)" }}>
            <div style={{ fontSize:14, fontWeight:600, color:METRO_PURPLE }}>Market-Level Aggregated Detail</div>
            <div style={{ fontSize:11, color:"var(--text-muted)", marginTop:2 }}>Expand column groups by clicking ▶ headers</div>
          </div>
          <DetailTable rows={aggRows}/>
        </div>
      </div>
    );
  }

  // ── DM LEVEL ──────────────────────────────────────────────
  if (drillMarket && !drillDm) {
    const aggRows = dmGroups.map(dg => ({
      market: dg.market, dm: dg.dm, ntid:"", name:`${dg.employees.length} employees`,
      ...aggregateRows(dg.employees)
    }));

    return (
      <div style={{ padding:"20px 28px" }}>
        {breadcrumb}
        <div style={{ display:"flex", gap:14, marginBottom:20, flexWrap:"wrap" }}>
          <StatCard label="DMs in Market" value={dmGroups.length} sub={drillMarket} accent="purple"/>
          <StatCard label="Total Commission" value={fmt(dmGroups.reduce((s,d)=>s+d.commission,0))} sub={drillMarket} accent="pink"/>
          <StatCard label="Total Employees" value={dmGroups.reduce((s,d)=>s+d.employees.length,0)} sub="In market" accent="blue"/>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:12, marginBottom:20 }}>
          {dmGroups.map((dg, i) => {
            const color = MKT_COLORS[i % MKT_COLORS.length];
            return (
              <div key={dg.dm}
                onClick={() => { setDrillDm(dg.dm); setLevel("employee"); }}
                style={{
                  background:"var(--surface)", borderRadius:12, padding:"16px",
                  border:`1px solid #e9eaf0`, cursor:"pointer", transition:"all .15s",
                  borderLeft:`4px solid ${color}`,
                }}
                onMouseEnter={e => e.currentTarget.style.boxShadow=`0 4px 16px ${color}33`}
                onMouseLeave={e => e.currentTarget.style.boxShadow="none"}
              >
                <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:6 }}>
                  <Avatar name={dg.dm} color={["#f3e8ff","#5b2d8e"]}/>
                  <div style={{ fontWeight:700, color:"var(--text-primary)", fontSize:13 }}>{dg.dm}</div>
                </div>
                <div style={{ fontSize:11, color:"var(--text-muted)", marginBottom:8 }}>{dg.employees.length} employees</div>
                <div style={{ fontFamily:"monospace", fontWeight:700, color:color, fontSize:14 }}>{fmtFull(dg.commission)}</div>
                <div style={{ marginTop:6 }}><CommBar commission={dg.commission} max={dmGroups[0]?.commission||1}/></div>
                <div style={{ marginTop:8 }}><Badge commission={dg.commission}/></div>
              </div>
            );
          })}
        </div>

        <div style={{ background:"var(--surface)", borderRadius:18, border:"1px solid var(--border)", boxShadow:"var(--shadow-sm)" }}>
          <div style={{ padding:"12px 18px", borderBottom:"1px solid var(--border-soft)", background:"var(--surface-sunken)" }}>
            <div style={{ fontSize:14, fontWeight:600, color:METRO_PURPLE }}>DM-Level Aggregated Detail — {drillMarket}</div>
            <div style={{ fontSize:11, color:"var(--text-muted)", marginTop:2 }}>Click a DM card above to see individual employees</div>
          </div>
          <DetailTable rows={aggRows}/>
        </div>
      </div>
    );
  }

  // ── EMPLOYEE LEVEL ─────────────────────────────────────────
  return (
    <div style={{ padding:"20px 28px" }}>
      {breadcrumb}
      <div style={{ display:"flex", gap:14, marginBottom:20, flexWrap:"wrap" }}>
        <StatCard label="Employees" value={empRows.length} sub={drillDm} accent="purple"/>
        <StatCard label="DM Commission" value={fmt(empRows.reduce((s,r)=>s+(r.finalCommission??r.commission),0))} sub={drillDm} accent="pink"/>
      </div>

      <div style={{ background:"var(--surface)", borderRadius:18, border:"1px solid var(--border)", boxShadow:"var(--shadow-sm)" }}>
        <div style={{ padding:"12px 18px", borderBottom:"1px solid var(--border-soft)", background:"var(--surface-sunken)" }}>
          <div style={{ fontSize:14, fontWeight:600, color:METRO_PURPLE }}>Employee Detail — {drillDm}</div>
          <div style={{ fontSize:11, color:"var(--text-muted)", marginTop:2 }}>All columns · expand groups via ▶</div>
        </div>
        <DetailTable rows={empRows}/>
      </div>
    </div>
  );
}

// ── Main MarketWise ───────────────────────────────────────────
export default function MarketWise({ data, user }) {
  const [selected,  setSelected]  = useState(null);
  const [dmFilter,  setDmFilter]  = useState("all");
  const [mainTab,   setMainTab]   = useState("overview"); // overview | detailed

  const filtered = useMemo(() => {
    let d = data;
    if (user.role === "market") d = d.filter(r => r.market === user.market);
    return d;
  }, [data, user]);

  const markets = useMemo(() => {
    const map = {};
    filtered.forEach(r => {
      const k = r.market || "Unknown";
      if (!map[k]) map[k] = { market:k, employees:[], dms:new Set(), commission:0 };
      map[k].employees.push(r);
      map[k].dms.add(r.dm);
      map[k].commission += (r.finalCommission ?? r.commission);
    });
    return Object.values(map)
      .map(m => ({ ...m, dms:m.dms.size, tier: statusOf(m.commission) }))
      .sort((a,b) => b.commission - a.commission);
  }, [filtered]);

  const barData = markets.map((m,i) => ({
    name:m.market.length > 10 ? m.market.slice(0,8)+"…" : m.market,
    fullName:m.market, Commission:m.commission, color:MKT_COLORS[i % MKT_COLORS.length]
  }));

  const highCount = markets.filter(m => m.tier.cls === "high").length;
  const midCount  = markets.filter(m => m.tier.cls === "mid").length;
  const lowCount  = markets.filter(m => m.tier.cls === "low").length;

  const pieData = [
    { name:"High", value:highCount, color:"#22c55e" },
    { name:"Mid",  value:midCount,  color:"#f59e0b" },
    { name:"Low",  value:lowCount,  color:"#ef4444" },
  ].filter(d => d.value > 0);

  const selectedMkt = selected ? markets.find(m=>m.market===selected) : null;
  const allDms = useMemo(() => {
    if (!selectedMkt) return [];
    return [...new Set(selectedMkt.employees.map(r=>r.dm).filter(Boolean))].sort();
  }, [selectedMkt]);

  const drillRows = useMemo(() => {
    if (!selectedMkt) return [];
    let rows = selectedMkt.employees;
    if (dmFilter !== "all") rows = rows.filter(r => r.dm === dmFilter);
    return [...rows].sort((a,b) => (b.finalCommission??b.commission) - (a.finalCommission??a.commission));
  }, [selectedMkt, dmFilter]);

  const empCols = [
    { key:"name", label:"Employee", render:r => (
      <div style={{display:"flex",alignItems:"center",gap:8}}>
        <Avatar name={r.name}/>
        <div>
          <div style={{fontWeight:600}}>{r.name||"—"}</div>
          <div style={{fontSize:11,color:"var(--text-muted)"}}>{r.dm||"—"}</div>
        </div>
      </div>
    )},
    { key:"commission", label:"Commission", align:"right", render:r=>(
      <span style={{color:METRO_PURPLE,fontWeight:700,fontFamily:"monospace"}}>{fmtFull(r.finalCommission??r.commission)}</span>
    )},
    { key:"status", label:"Status", render:r=><Badge commission={r.finalCommission??r.commission}/> },
  ];

  return (
    <div>
      <PageHeader
        title="Market Wise Report"
        sub={`${markets.length} markets · ${filtered.length} total employees`}
      />

      {/* Overview / Detailed View tabs — directly below the page title */}
      <TabBar active={mainTab} onChange={setMainTab}/>

      {/* ── DETAILED VIEW TAB ── */}
      {mainTab === "detailed" && (
        <DetailedViewTab data={data} user={user}/>
      )}

      {/* ── OVERVIEW TAB ── */}
      {mainTab === "overview" && (
        <div style={{padding:"28px 32px"}}>
          {/* Executive Insight Hero — primary KPI section */}
          <ExecutiveInsightHero rows={filtered} level="market"/>

          {/* Charts */}
          <div style={{display:"grid",gridTemplateColumns:"2fr 1fr",gap:16,marginBottom:24}}>
            <div className="metro-panel-hover" style={{background:"var(--surface)",borderRadius:18,border:"1px solid var(--border)",boxShadow:"var(--shadow-sm)",padding:"20px"}}>
              <div style={{fontSize:13,fontWeight:600,color:"var(--text-secondary)",marginBottom:12}}>Commission by Market</div>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={barData} barCategoryGap="30%">
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border-soft)"/>
                  <XAxis dataKey="name" tick={{fontSize:9,fill:"var(--text-muted)"}} axisLine={false} tickLine={false}/>
                  <YAxis tick={{fontSize:10,fill:"var(--text-muted)"}} axisLine={false} tickLine={false} tickFormatter={v=>fmt(v)}/>
                  <Tooltip
                    formatter={v=>[`$${Number(v).toLocaleString()}`, "Commission"]}
                    labelFormatter={(_,p)=>p&&p[0]?p[0].payload.fullName:""}
                    cursor={{ fill:"rgba(91,45,142,.06)", radius:4 }}
                    contentStyle={{borderRadius:12,border:"1px solid var(--border)",fontSize:12,background:"var(--surface)",color:"var(--text-primary)",boxShadow:"var(--shadow-md)"}}/>
                  <Bar dataKey="Commission" radius={[4,4,0,0]} activeBar={{ stroke:"#fff", strokeWidth:2, filter:"brightness(1.12) drop-shadow(0 4px 10px rgba(91,45,142,.4))" }} cursor="pointer">
                    {barData.map((d,i)=><Cell key={i} fill={d.color}/>)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="metro-panel-hover" style={{background:"var(--surface)",borderRadius:18,border:"1px solid var(--border)",boxShadow:"var(--shadow-sm)",padding:"20px"}}>
              <div style={{fontSize:13,fontWeight:600,color:"var(--text-secondary)",marginBottom:8}}>Commission Tier Distribution</div>
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie data={pieData} dataKey="value" cx="50%" cy="50%" innerRadius={40} outerRadius={72} paddingAngle={3}>
                    {pieData.map((e,i)=><Cell key={i} fill={e.color}/>)}
                  </Pie>
                  <Tooltip formatter={(v,n)=>[v+" markets", n]} contentStyle={{borderRadius:12,fontSize:11,background:"var(--surface)",color:"var(--text-primary)",border:"1px solid var(--border)",boxShadow:"var(--shadow-md)"}}/>
                </PieChart>
              </ResponsiveContainer>
              <div style={{display:"flex",flexWrap:"wrap",justifyContent:"center",gap:"6px 12px",marginTop:8}}>
                {pieData.map(d=>(
                  <div key={d.name} style={{display:"flex",alignItems:"center",gap:5,fontSize:11}}>
                    <span style={{width:10,height:10,borderRadius:2,background:d.color,display:"inline-block"}}/>
                    <span style={{color:"var(--text-secondary)"}}>{d.name} ({d.value})</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Commission Intelligence — Paying Verticals & Chargeback Analytics */}
          <CommissionAnalytics rows={filtered}/>

          {/* Market cards */}
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(270px,1fr))",gap:14,marginBottom:24}}>
            {markets.map((m,i)=>{
              const color      = MKT_COLORS[i % MKT_COLORS.length];
              const isSelected = selected===m.market;
              return (
                <div key={m.market}
                  onClick={()=>{setSelected(isSelected?null:m.market);setDmFilter("all");}}
                  style={{
                    background:"var(--surface)", borderRadius:14, padding:"20px",
                    border: isSelected ? `2px solid ${color}` : "1px solid #e9eaf0",
                    cursor:"pointer", transition:"all .15s",
                    boxShadow: isSelected ? `0 0 0 4px ${color}22` : "0 2px 8px rgba(91,45,142,.06)"
                  }}>
                  <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}>
                    <div style={{display:"flex",alignItems:"center",gap:8}}>
                      <div style={{width:10,height:10,borderRadius:"50%",background:color}}/>
                      <span style={{fontWeight:700,fontSize:14,color:"var(--text-primary)"}}>{m.market}</span>
                    </div>
                    <Badge commission={m.commission}/>
                  </div>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:12}}>
                    <div>
                      <div style={{fontSize:10,color:"var(--text-muted)",marginBottom:2}}>EMPLOYEES</div>
                      <div style={{fontWeight:700,color:"var(--text-primary)"}}>{m.employees.length}</div>
                    </div>
                    <div>
                      <div style={{fontSize:10,color:"var(--text-muted)",marginBottom:2}}>DMs</div>
                      <div style={{fontWeight:700,color:"var(--text-primary)"}}>{m.dms}</div>
                    </div>
                  </div>
                  <div style={{fontSize:13,color:METRO_PURPLE,fontWeight:700,fontFamily:"monospace"}}>{fmtFull(m.commission)}</div>
                  <div style={{marginTop:8}}><CommBar commission={m.commission} max={markets[0]?.commission||1}/></div>
                </div>
              );
            })}
          </div>

          {/* Drill-down for selected market */}
          {selectedMkt && (
            <div className="metro-panel-hover" style={{background:"var(--surface)",borderRadius:18,border:"1px solid var(--border)",boxShadow:"var(--shadow-sm)"}}>
              <div style={{
                padding:"14px 18px", borderBottom:"1px solid var(--border-soft)",
                display:"flex", alignItems:"center", justifyContent:"space-between",
                background:"var(--surface-sunken)", flexWrap:"wrap", gap:10
              }}>
                <div style={{fontWeight:700,fontSize:15,color:METRO_PURPLE}}>
                  {selectedMkt.market} — Employee Breakdown
                </div>
                <div style={{display:"flex",gap:8,alignItems:"center"}}>
                  <select value={dmFilter} onChange={e=>setDmFilter(e.target.value)} style={{
                    padding:"6px 10px",borderRadius:8,border:"1px solid #e5e7eb",
                    fontSize:12,color:"var(--text-secondary)",background:"var(--surface-sunken)"}}>
                    <option value="all">All DMs</option>
                    {allDms.map(d=><option key={d} value={d}>{d}</option>)}
                  </select>
                  <button onClick={()=>setSelected(null)} style={{
                    fontSize:12,color:"var(--text-secondary)",background:"var(--surface-sunken)",border:"none",
                    borderRadius:6,padding:"6px 12px",cursor:"pointer"}}>Close ✕</button>
                </div>
              </div>
              <Table cols={empCols} rows={drillRows}/>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
