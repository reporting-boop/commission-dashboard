import { useState, useMemo, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from "recharts";
import { fmt, fmtFull, statusOf, MASTER_COLUMNS } from "../data";
import { PageHeader, Badge, CommBar, Avatar, TabBar, MultiSelectDropdown } from "../components/UI";
import { FilterableTable } from "../components/ColumnFilter";
import DetailTable from "../components/DetailTable";
import CommissionAnalytics, { ExecutiveInsightHero } from "../components/Analytics";
import { ChevronDown, ChevronUp } from "../icons";

const METRO_PURPLE = "#5b2d8e";
const METRO_PINK   = "#e6007e";
const COLORS = [METRO_PURPLE,"#7c3aed","#9333ea","#a855f7","#c026d3",METRO_PINK,"#db2777","#be185d"];

function aggregateRows(rows) {
  const out = {};
  MASTER_COLUMNS.forEach(c => {
    if (["market","dm","name","ntid"].includes(c.key)) return;
    out[c.key] = rows.reduce((s,r) => s + (Number(r[c.key])||0), 0);
  });
  return out;
}

export default function DMWise({ data, user }) {
  const [expanded, setExpanded] = useState(null);
  const [market,   setMarket]   = useState([]); // [] = All Markets
  const [dmFilter, setDmFilter] = useState([]); // [] = All DMs
  const [mainTab,  setMainTab]  = useState("overview"); // overview | detailed

  const markets = useMemo(() => [...new Set(data.map(d=>d.market).filter(Boolean))].sort(), [data]);

  const dmOptions = useMemo(() => {
    let d = data;
    if (user.role === "market") d = d.filter(r => r.market === user.market);
    if (market.length) d = d.filter(r => market.includes(r.market));
    return [...new Set(d.map(r => r.dm).filter(Boolean))].sort();
  }, [data, market, user]);

  const filtered = useMemo(() => {
    let d = data;
    if (user.role === "market") d = d.filter(r => r.market === user.market);
    if (market.length)          d = d.filter(r => market.includes(r.market));
    if (dmFilter.length)        d = d.filter(r => dmFilter.includes(r.dm));
    return d;
  }, [data, market, dmFilter, user]);

  // If the market selection narrows, drop any selected DMs that no
  // longer belong to one of the selected markets.
  useEffect(() => {
    setDmFilter(prev => prev.filter(d => dmOptions.includes(d)));
  }, [dmOptions]);

  const dms = useMemo(() => {
    const map = {};
    filtered.forEach(r => {
      const k = r.dm || "Unknown DM";
      if (!map[k]) map[k] = { dm:k, market:r.market, employees:[], commission:0 };
      map[k].employees.push(r);
      map[k].commission += (r.finalCommission ?? r.commission);
    });
    return Object.values(map)
      .map(d => ({ ...d, tier: statusOf(d.commission) }))
      .sort((a,b) => b.commission - a.commission);
  }, [filtered]);

  const maxComm    = dms.length ? dms[0].commission : 1;

  const chartData = dms.slice(0,12).map((d,i) => ({
    name:       d.dm.split(" ").slice(-1)[0],
    fullName:   d.dm,
    Commission: d.commission,
    color:      COLORS[i % COLORS.length]
  }));

  const highCount = dms.filter(d => d.tier.cls === "high").length;
  const midCount  = dms.filter(d => d.tier.cls === "mid").length;
  const lowCount  = dms.filter(d => d.tier.cls === "low").length;

  const pieData = [
    { name:"High", value:highCount, color:"#22c55e" },
    { name:"Mid",  value:midCount,  color:"#f59e0b" },
    { name:"Low",  value:lowCount,  color:"#ef4444" },
  ].filter(d => d.value > 0);

  const empCols = [
    { key:"name", label:"Employee", filterType:"multiselect", filterValue:r=>r.name, render:r => (
      <div style={{display:"flex",alignItems:"center",gap:8}}>
        <Avatar name={r.name}/>
        <span style={{fontWeight:500}}>{r.name||"—"}</span>
      </div>
    )},
    { key:"market",     label:"Market",     muted:true, filterType:"multiselect", filterValue:r=>r.market },
    { key:"commission", label:"Commission", align:"right", filterType:"number", filterValue:r=>(r.finalCommission??r.commission), render:r => (
      <span style={{color:METRO_PURPLE,fontWeight:700,fontFamily:"monospace"}}>{fmtFull(r.finalCommission??r.commission)}</span>
    )},
    { key:"status", label:"Status", filterType:"multiselect", filterValue:r=>statusOf(r.finalCommission??r.commission).label, render:r => <Badge commission={r.finalCommission??r.commission}/> },
  ];

  return (
    <div>
      <PageHeader
        title="DM Wise Report"
        sub={`${dms.length} district managers · ${filtered.length} employees`}
        extra={
          <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"}}>
            {user.role==="admin" && (
              <MultiSelectDropdown
                label="Markets"
                placeholder="All Markets"
                options={markets}
                selected={market}
                onChange={setMarket}
              />
            )}
            <MultiSelectDropdown
              label="DMs"
              placeholder="All DMs"
              options={dmOptions}
              selected={dmFilter}
              onChange={setDmFilter}
            />
          </div>
        }
      />

      {/* Overview / Detailed View tabs — directly below the page title */}
      <TabBar active={mainTab} onChange={setMainTab}/>

      {mainTab === "overview" && (
      <div style={{padding:"28px 32px"}}>
        {/* Executive Insight Hero — primary KPI section */}
        <ExecutiveInsightHero rows={filtered} level="dm"/>

        {/* Charts */}
        {chartData.length > 0 && (
          <div style={{display:"grid",gridTemplateColumns:"2fr 1fr",gap:16,marginBottom:24}}>
            <div className="metro-panel-hover" style={{background:"var(--surface)",borderRadius:18,border:"1px solid var(--border)",boxShadow:"var(--shadow-sm)",padding:"20px"}}>
              <div style={{fontSize:13,fontWeight:600,color:"var(--text-secondary)",marginBottom:16}}>Commission by DM (Top 12)</div>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={chartData} barCategoryGap="30%">
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border-soft)"/>
                  <XAxis dataKey="name" tick={{fontSize:10,fill:"var(--text-muted)"}} axisLine={false} tickLine={false}/>
                  <YAxis tick={{fontSize:10,fill:"var(--text-muted)"}} axisLine={false} tickLine={false} tickFormatter={v=>fmt(v)}/>
                  <Tooltip
                    formatter={v=>[`$${Number(v).toLocaleString()}`, "Commission"]}
                    labelFormatter={(_,p)=>p&&p[0]?p[0].payload.fullName:""}
                    cursor={{ fill:"rgba(91,45,142,.06)", radius:4 }}
                    contentStyle={{borderRadius:12,border:"1px solid var(--border)",fontSize:12,background:"var(--surface)",color:"var(--text-primary)",boxShadow:"var(--shadow-md)"}}/>
                  <Bar dataKey="Commission" radius={[4,4,0,0]} activeBar={{ stroke:"#fff", strokeWidth:2, filter:"brightness(1.12) drop-shadow(0 4px 10px rgba(91,45,142,.4))" }} cursor="pointer">
                    {chartData.map((d,i) => <Cell key={i} fill={d.color}/>)}
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
                  <Tooltip formatter={(v,n)=>[v+" DMs", n]} contentStyle={{borderRadius:12,fontSize:11,background:"var(--surface)",color:"var(--text-primary)",border:"1px solid var(--border)",boxShadow:"var(--shadow-md)"}}/>
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
        )}

        {/* Commission Intelligence — Paying Verticals & Chargeback Analytics */}
        <CommissionAnalytics rows={filtered}/>

        {/* DM Cards */}
        <div style={{display:"flex",flexDirection:"column",gap:12,marginBottom:24}}>
          {dms.length === 0 && (
            <div style={{background:"var(--surface)",borderRadius:14,padding:48,textAlign:"center",color:"var(--text-muted)",fontSize:14}}>No data available</div>
          )}
          {dms.map((dm,i) => {
            const isOpen = expanded === dm.dm;
            const color  = COLORS[i % COLORS.length];
            return (
              <div key={dm.dm} className="metro-panel-hover" style={{background:"var(--surface)",borderRadius:18,border:"1px solid var(--border)",boxShadow:"var(--shadow-sm)",overflow:"hidden"}}>
                <div
                  onClick={() => setExpanded(isOpen ? null : dm.dm)}
                  style={{
                    padding:"16px 20px", cursor:"pointer",
                    display:"flex", alignItems:"center", gap:16, flexWrap:"wrap",
                    borderLeft:`4px solid ${color}`
                  }}>
                  <Avatar name={dm.dm} color={["#f3e8ff","#5b2d8e"]}/>
                  <div style={{flex:1,minWidth:120}}>
                    <div style={{fontWeight:700,color:"var(--text-primary)",fontSize:14}}>{dm.dm}</div>
                    <div style={{fontSize:11,color:"var(--text-muted)"}}>{dm.market} · {dm.employees.length} employees</div>
                  </div>
                  <div style={{display:"flex",gap:20,flexWrap:"wrap",alignItems:"center"}}>
                    <div style={{textAlign:"right"}}>
                      <div style={{fontSize:10,color:"var(--text-muted)"}}>COMMISSION</div>
                      <div style={{fontFamily:"monospace",fontWeight:700,color:METRO_PURPLE,fontSize:14}}>{fmt(dm.commission)}</div>
                    </div>
                    <div style={{width:120}}><CommBar commission={dm.commission} max={maxComm}/></div>
                    <Badge commission={dm.commission}/>
                    {isOpen ? <ChevronUp size={16} color="#9ca3af"/> : <ChevronDown size={16} color="#9ca3af"/>}
                  </div>
                </div>
                {isOpen && (
                  <div style={{borderTop:"1px solid #f3f4f6",background:"var(--surface-sunken)"}}>
                    <FilterableTable cols={empCols} rows={dm.employees}/>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      )}

      {/* ── DETAILED VIEW TAB ── */}
      {mainTab === "detailed" && (
      <div style={{padding:"28px 32px"}}>
        {dms.length > 0 && (
          <div style={{ background:"var(--surface)", borderRadius:18, border:"1px solid var(--border)", boxShadow:"var(--shadow-sm)" }}>
            <div style={{ padding:"12px 18px", borderBottom:"1px solid var(--border-soft)", background:"var(--surface-sunken)" }}>
              <div style={{ fontSize:14, fontWeight:600, color:METRO_PURPLE }}>DM-Level Detailed View</div>
              <div style={{ fontSize:11, color:"var(--text-muted)", marginTop:2 }}>Aggregated across employees · expand column groups via ▶</div>
            </div>
            <DetailTable maxHeight="55vh" rows={dms.map(dm => ({
              market: dm.market, dm: dm.dm, ntid:"", name:`${dm.employees.length} employees`,
              ...aggregateRows(dm.employees)
            }))}/>
          </div>
        )}
      </div>
      )}
    </div>
  );
}
