import { useState, useEffect } from "react";
import Login from "./pages/Login";
import Shell from "./components/Shell";
import AllEmployees from "./pages/AllEmployees";
import DMWise from "./pages/DMWise";
import MarketWise from "./pages/MarketWise";
import { DEMO_DATA, fetchCommissionRecords } from "./data";
import { supabase } from "./supabaseClient";
import { ThemeProvider } from "./theme";

export default function App() {
  const [user, setUser]   = useState(null);
  const [page, setPage]   = useState("all");
  const [data, setData]   = useState(DEMO_DATA);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [contestData, setContestData] = useState([]);
  const [spiffData,   setSpiffData]   = useState([]);

  useEffect(() => {
    if (!user) return;
    // Admins (market: null) see every market; market-role users are
    // scoped server-side to just their own market.
    const scopeMarket = user.role === "market" ? user.market : undefined;

    setLoading(true);
    setLoadError("");
    fetchCommissionRecords(supabase, { market: scopeMarket })
      .then(rows => { if (rows.length) setData(rows); })
      .catch(err => {
        console.error("Supabase fetch failed, keeping demo data:", err);
        setLoadError("Couldn't load live data — showing demo data instead.");
      })
      .finally(() => setLoading(false));
  }, [user]);

  return (
    <ThemeProvider>
      {!user ? <Login onLogin={setUser}/> : (
        <Shell user={user} page={page} setPage={setPage}>
          {loading && <div style={{padding:16,opacity:.6,fontSize:13}}>Loading commission data…</div>}
          {loadError && <div style={{padding:16,color:"#f87171",fontSize:13}}>{loadError}</div>}
          {page === "all"    && <AllEmployees data={data} contestData={contestData} spiffData={spiffData} user={user}/>}
          {page === "dm"     && <DMWise       data={data} user={user}/>}
          {page === "market" && <MarketWise   data={data} user={user}/>}
        </Shell>
      )}
    </ThemeProvider>
  );
}
