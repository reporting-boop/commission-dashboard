import { useState, useMemo, useEffect } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell
} from "recharts";
import { fmt, fmtFull, statusOf } from "../data";
import { PageHeader, Badge, CommBar, Avatar, TabBar, SearchSortToolbar, MultiSelectDropdown } from "../components/UI";
import { FilterableTable } from "../components/ColumnFilter";
import DetailTable from "../components/DetailTable";
import CommissionAnalytics, { ExecutiveInsightHero } from "../components/Analytics";

const METRO_PURPLE = "#5b2d8e";
const METRO_PINK   = "#e6007e";

// ── Main AllEmployees ─────────────────────────────────────────
export default function AllEmployees({ data, contestData, spiffData, user }) {
  const [search, setSearch]   = useState("");
  const [market, setMarket]   = useState([]); // [] = All Markets
  const [dm,     setDm]       = useState([]); // [] = All DMs
  const [tier,   setTier]     = useState([]); // [] = All Tiers
  const [sort,   setSort]     = useState("comm_desc");
  const [mainTab, setMainTab] = useState("overview"); // overview | detailed

  const markets = useMemo(() => [...new Set(data.map(d=>d.market).filter(Boolean))].sort(), [data]);
  const dms     = useMemo(() => {
    let d = data;
    if (user.role === "market") d = d.filter(r => r.market === user.market);
    if (market.length) d = d.filter(r => market.includes(r.market));
    return [...new Set(d.map(r=>r.dm).filter(Boolean))].sort();
  }, [data, market, user]);

  const visible = useMemo(() => {
    let d = data;
    if (user.role === "market") d = d.filter(r => r.market === user.market);
    if (market.length)          d = d.filter(r => market.includes(r.market));
    if (dm.length)               d = d.filter(r => dm.includes(r.dm));
    if (tier.length)             d = d.filter(r => tier.includes(statusOf(r.finalCommission || r.commission).cls));
    if (search)                 d = d.filter(r =>
      (r.name||"").toLowerCase().includes(search.toLowerCase()) ||
      (r.dm||"").toLowerCase().includes(search.toLowerCase())
    );
    if (sort === "comm_desc") d = [...d].sort((a,b) => b.commission - a.commission);
    if (sort === "comm_asc")  d = [...d].sort((a,b) => a.commission - b.commission);
    if (sort === "name_asc")  d = [...d].sort((a,b) => (a.name||"").localeCompare(b.name||""));
    return d;
  }, [data, market, dm, tier, search, sort, user]);

  // If the market selection changes, drop any selected DMs that no
  // longer belong to one of the selected markets.
  useEffect(() => {
    setDm(prev => prev.filter(d => dms.includes(d)));
  }, [dms]);

  const useComm   = r => r.finalCommission ?? r.commission;
  const highCount = visible.filter(r => statusOf(useComm(r)).cls === "high").length;
  const midCount  = visible.filter(r => statusOf(useComm(r)).cls === "mid").length;
  const lowCount  = visible.filter(r => statusOf(useComm(r)).cls === "low").length;
  const maxComm   = Math.max(...visible.map(r => useComm(r)), 1);

  const chartData = [...visible]
    .sort((a,b) => useComm(b) - useComm(a))
    .slice(0, 10)
    .map(r => ({ name:(r.name||"—").split(" ")[0], Commission: useComm(r) }));

  const pieData = [
    { name:"High", value:highCount, color:"#22c55e" },
    { name:"Mid",  value:midCount,  color:"#f59e0b" },
    { name:"Low",  value:lowCount,  color:"#ef4444" },
  ].filter(d => d.value > 0);

  const ranked = visible.map((r,i) => ({ ...r, rank:i+1 }));

  const cols = [
    { key:"rank",       label:"#",          render:r => <span style={{color:"var(--text-muted)",fontWeight:600}}>{r.rank}</span> },
    { key:"name",       label:"Employee",   filterType:"multiselect", filterValue:r=>r.name, render:r => (
      <div style={{display:"flex",alignItems:"center",gap:10}}>
        <Avatar name={r.name}/>
        <div>
          <div style={{fontWeight:600,color:"var(--text-primary)"}}>{r.name||"—"}</div>
          <div style={{fontSize:11,color:"var(--text-muted)"}}>{r.dm||"—"}</div>
        </div>
      </div>
    )},
    { key:"market",     label:"Market",     muted:true, filterType:"multiselect", filterValue:r=>r.market },
    { key:"commission", label:"Commission", align:"right", filterType:"number", filterValue:r=>useComm(r), render:r => (
      <span style={{color:METRO_PURPLE,fontWeight:700,fontFamily:"monospace"}}>{fmtFull(useComm(r))}</span>
    )},
    { key:"bar",        label:"Volume",     render:r => <CommBar commission={useComm(r)} max={maxComm}/> },
    { key:"status",     label:"Status",     filterType:"multiselect", filterValue:r=>statusOf(useComm(r)).label, render:r => <Badge commission={useComm(r)}/> },
  ];

  return (
    <div>
      <PageHeader
        title="Employee Wise"
        sub={`${visible.length} employees · ${user.role==="market" ? user.market : "All markets"}`}
        extra={
          <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"}}>
            {/* Filters — unchanged position, now multi-select */}
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
              options={dms}
              selected={dm}
              onChange={setDm}
            />
            <MultiSelectDropdown
              label="Tiers"
              placeholder="All Tiers"
              options={[
                { value:"high", label:"High (≥$1,000)" },
                { value:"mid",  label:"Mid ($500–$999)" },
                { value:"low",  label:"Low (<$500)" },
              ]}
              selected={tier}
              onChange={setTier}
            />
          </div>
        }
      />

      {/* Overview / Detailed View tabs — directly below the page title */}
      <TabBar active={mainTab} onChange={setMainTab}/>

      {/* ── OVERVIEW TAB ── */}
      {mainTab === "overview" && (
        <div style={{padding:"28px 32px"}}>
          {/* Executive Insight Hero — primary KPI section */}
          <ExecutiveInsightHero rows={visible} level="employee"/>

          {/* Charts */}
          <div style={{display:"grid",gridTemplateColumns:"2fr 1fr",gap:16,marginBottom:24}}>
            <div className="metro-panel-hover" style={{background:"var(--surface)",borderRadius:18,border:"1px solid var(--border)",boxShadow:"var(--shadow-sm)",padding:"20px"}}>
              <div style={{fontSize:13,fontWeight:600,color:"var(--text-secondary)",marginBottom:16}}>Top 10 Employees by Commission</div>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={chartData} barCategoryGap="30%">
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border-soft)"/>
                  <XAxis dataKey="name" tick={{fontSize:10,fill:"var(--text-muted)"}} axisLine={false} tickLine={false}/>
                  <YAxis tick={{fontSize:10,fill:"var(--text-muted)"}} axisLine={false} tickLine={false} tickFormatter={v=>fmt(v)}/>
                  <Tooltip formatter={v=>[`$${Number(v).toLocaleString()}`, "Commission"]}
                    cursor={{ fill:"rgba(91,45,142,.06)", radius:4 }}
                    contentStyle={{borderRadius:12,border:"1px solid var(--border)",fontSize:12,background:"var(--surface)",color:"var(--text-primary)",boxShadow:"var(--shadow-md)"}}/>
                  <Bar dataKey="Commission" radius={[4,4,0,0]} activeBar={{ stroke:"#fff", strokeWidth:2, filter:"brightness(1.12) drop-shadow(0 4px 10px rgba(91,45,142,.4))" }} cursor="pointer">
                    {chartData.map((_,i) => <Cell key={i} fill={i===0 ? METRO_PINK : METRO_PURPLE}/>)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="metro-panel-hover" style={{background:"var(--surface)",borderRadius:18,border:"1px solid var(--border)",boxShadow:"var(--shadow-sm)",padding:"20px"}}>
              <div style={{fontSize:13,fontWeight:600,color:"var(--text-secondary)",marginBottom:16}}>Commission Tier Distribution</div>
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie data={pieData} dataKey="value" cx="50%" cy="50%" innerRadius={45} outerRadius={72} paddingAngle={3}>
                    {pieData.map((e,i) => <Cell key={i} fill={e.color}/>)}
                  </Pie>
                  <Tooltip formatter={(v,n)=>[v+" employees", n]} contentStyle={{borderRadius:12,fontSize:12,background:"var(--surface)",color:"var(--text-primary)",border:"1px solid var(--border)",boxShadow:"var(--shadow-md)"}}/>
                </PieChart>
              </ResponsiveContainer>
              <div style={{display:"flex",justifyContent:"center",gap:14,marginTop:8}}>
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
          <CommissionAnalytics rows={visible}/>

          {/* Employee Leaderboard */}
          <div className="metro-panel-hover" style={{background:"var(--surface)",borderRadius:18,border:"1px solid var(--border)",boxShadow:"var(--shadow-sm)"}}>
            <div style={{
              padding:"14px 18px",
              borderBottom:"1px solid var(--border-soft)",
              display:"flex",alignItems:"center",justifyContent:"space-between",gap:12,flexWrap:"wrap",
              background:"var(--surface-sunken)"
            }}>
              <div style={{fontSize:14,fontWeight:600,color:METRO_PURPLE}}>Employee Leaderboard</div>
              <SearchSortToolbar
                searchValue={search}
                onSearchChange={setSearch}
                searchPlaceholder="Search employee, market, DM…"
                sortValue={sort}
                onSortChange={setSort}
                sortOptions={[
                  { value:"comm_desc", label:"Sort: Commission ↓" },
                  { value:"comm_asc",  label:"Sort: Commission ↑" },
                  { value:"name_asc",  label:"Sort: Name A–Z" },
                ]}
              />
            </div>
            <FilterableTable cols={cols} rows={ranked} emptyMsg="No employees match the filter"/>
          </div>
        </div>
      )}

      {/* ── DETAILED VIEW TAB ── */}
      {mainTab === "detailed" && (
        <div style={{padding:"28px 32px"}}>
          <div style={{ background:"var(--surface)", borderRadius:18, border:"1px solid var(--border)", boxShadow:"var(--shadow-sm)" }}>
            <div style={{ padding:"12px 18px", borderBottom:"1px solid var(--border-soft)", background:"var(--surface-sunken)", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:8 }}>
              <div style={{ fontSize:14, fontWeight:600, color:METRO_PURPLE }}>
                Master — Detailed View
              </div>
              <div style={{ fontSize:11, color:"var(--text-muted)" }}>
                Click column group headers to expand/collapse hidden columns
              </div>
            </div>
            <DetailTable rows={ranked}/>
          </div>
        </div>
      )}
    </div>
  );
}
