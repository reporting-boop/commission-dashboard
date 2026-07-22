import { useState, useRef } from "react";
import { CREDENTIALS } from "../data";
import { LogIn, Eye, EyeOff } from "../icons";

const METRO_PURPLE = "#5b2d8e";
const METRO_PINK   = "#e6007e";
const METRO_DARK   = "#2a1244";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPw,   setShowPw]   = useState(false);
  const [error,    setError]    = useState("");
  const [loading,  setLoading]  = useState(false);

  // Lamp pull-cord sequence: idle -> tugging -> lit -> card revealed
  const [lampStage, setLampStage] = useState("idle"); // idle | tugging | lit | revealed
  const pulledRef = useRef(false);

  function pullCord() {
    if (pulledRef.current) return;
    pulledRef.current = true;
    setLampStage("tugging");
    setTimeout(() => setLampStage("lit"), 260);
    setTimeout(() => setLampStage("revealed"), 620);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    setTimeout(() => {
      const cred = CREDENTIALS[username.toLowerCase().trim()];
      if (cred && cred.password === password) {
        onLogin({ username: username.toLowerCase().trim(), ...cred });
      } else {
        setError("Invalid username or password.");
        setLoading(false);
      }
    }, 600);
  }

  const isLit = lampStage === "lit" || lampStage === "revealed";
  const revealed = lampStage === "revealed";

  return (
    <div style={{
      minHeight:"100vh",
      background: isLit
        ? `linear-gradient(135deg, ${METRO_DARK} 0%, ${METRO_PURPLE} 100%)`
        : "#050208",
      display:"flex", alignItems:"center", justifyContent:"center",
      fontFamily:"'DM Sans','Segoe UI',sans-serif",
      position:"relative", overflow:"hidden",
      transition:"background 900ms ease"
    }}>
      <style>{`
        @keyframes swing {
          0%   { transform: rotate(-2.5deg); }
          50%  { transform: rotate(2.5deg); }
          100% { transform: rotate(-2.5deg); }
        }
        @keyframes tug {
          0%   { transform: translateY(0); }
          35%  { transform: translateY(26px); }
          60%  { transform: translateY(6px); }
          100% { transform: translateY(0); }
        }
        @keyframes flicker {
          0%   { opacity: 0; }
          8%   { opacity: 1; }
          14%  { opacity: .2; }
          20%  { opacity: 1; }
          28%  { opacity: .35; }
          36%  { opacity: 1; }
          100% { opacity: 1; }
        }
        @keyframes coneIn {
          0%   { opacity: 0; transform: scaleY(.7); }
          100% { opacity: 1; transform: scaleY(1); }
        }
        @keyframes cardIn {
          0%   { opacity: 0; transform: translateY(18px) scale(.97); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes hintPulse {
          0%, 100% { opacity: .35; }
          50%      { opacity: .75; }
        }
        .metro-lamp-pivot { animation: ${isLit ? "none" : "swing 4.2s ease-in-out infinite"}; transform-origin: top center; }
        .metro-lamp-tug    { animation: ${lampStage === "tugging" ? "tug 620ms ease-out" : "none"}; }
        .metro-cord-knob:hover .metro-knob-circle { fill: #f2f2f2; }
      `}</style>

      {/* Ambient blobs (only once room is lit, matching original theme) */}
      <div style={{position:"absolute",top:"-20%",left:"-10%",width:500,height:500,
        borderRadius:"50%",background:`radial-gradient(circle,rgba(230,0,126,.25) 0%,transparent 70%)`,
        pointerEvents:"none",opacity:isLit?1:0,transition:"opacity 900ms ease"}}/>
      <div style={{position:"absolute",bottom:"-15%",right:"-5%",width:400,height:400,
        borderRadius:"50%",background:`radial-gradient(circle,rgba(91,45,142,.4) 0%,transparent 70%)`,
        pointerEvents:"none",opacity:isLit?1:0,transition:"opacity 900ms ease"}}/>

      {/* Light cone shining down from the bulb */}
      {isLit && (
        <div style={{
          position:"absolute", top:0, left:"50%", transform:"translateX(-50%)",
          width:520, height:"70vh", pointerEvents:"none",
          background:"radial-gradient(ellipse at top, rgba(255,244,214,.16) 0%, rgba(255,244,214,.05) 35%, transparent 70%)",
          animation:"coneIn 500ms ease-out"
        }}/>
      )}

      {/* Hanging lamp */}
      <div className="metro-lamp-pivot" style={{
        position:"absolute", top:0, left:"50%", transform:"translateX(-50%)",
        display:"flex", flexDirection:"column", alignItems:"center", zIndex:5
      }}>
        {/* wire from ceiling to bulb */}
        <div style={{width:2, height:96, background:"rgba(255,255,255,.25)"}}/>

        {/* bulb */}
        <svg width="64" height="86" viewBox="0 0 64 86" style={{overflow:"visible"}}>
          {isLit && (
            <circle cx="32" cy="34" r="30" fill="#fff4d6" opacity="0.55"
              style={{filter:"blur(14px)", animation:"flicker 500ms ease-out"}}/>
          )}
          {/* socket */}
          <rect x="24" y="0" width="16" height="10" rx="2" fill="#3a3a3a"/>
          <rect x="25" y="9" width="14" height="4" fill="#222"/>
          {/* glass bulb */}
          <path d="M32 14 C16 14 12 28 18 40 C21 46 26 48 26 56 L38 56 C38 48 43 46 46 40 C52 28 48 14 32 14 Z"
            fill={isLit ? "#fff4d6" : "rgba(255,255,255,.08)"}
            stroke={isLit ? "#ffe9a8" : "rgba(255,255,255,.25)"}
            strokeWidth="1.5"
            style={{
              filter: isLit ? "drop-shadow(0 0 18px rgba(255,244,214,.9)) drop-shadow(0 0 36px rgba(255,200,120,.6))" : "none",
              animation: lampStage === "lit" ? "flicker 500ms ease-out" : "none",
              transition:"fill 250ms ease, stroke 250ms ease"
            }}/>
          {/* filament */}
          <path d="M27 30 Q32 38 37 30" fill="none"
            stroke={isLit ? "#ff9f2e" : "rgba(255,255,255,.3)"} strokeWidth="1.6" strokeLinecap="round"/>
          {/* base screw thread lines */}
          <line x1="26" y1="56" x2="38" y2="56" stroke="#555" strokeWidth="1.5"/>
          <rect x="26" y="56" width="12" height="8" rx="1.5" fill="#4a4a4a"/>
        </svg>

        {/* pull cord + knob (hidden once the room is lit) */}
        {!isLit && (
          <div className="metro-lamp-tug" style={{display:"flex",flexDirection:"column",alignItems:"center",marginTop:2}}>
            <div style={{width:1.5, height:64, background:"rgba(255,255,255,.35)"}}/>
            <div
              className="metro-cord-knob"
              onClick={pullCord}
              role="button"
              aria-label="Pull the cord to sign in"
              style={{cursor:"pointer", padding:14, marginTop:-6}}
            >
              <svg width="18" height="22" viewBox="0 0 18 22">
                <ellipse className="metro-knob-circle" cx="9" cy="9" rx="9" ry="9" fill="#d8d8d8"/>
                <rect x="7" y="14" width="4" height="8" rx="2" fill="#d8d8d8"/>
              </svg>
            </div>
            <div style={{
              color:"rgba(255,255,255,.55)", fontSize:12, marginTop:10, letterSpacing:".02em",
              animation:"hintPulse 2.2s ease-in-out infinite", whiteSpace:"nowrap"
            }}>
              Pull the cord to sign in
            </div>
          </div>
        )}
      </div>

      {/* Login card — identical to before, revealed once the light is on */}
      {revealed && (
        <div style={{
          background:"rgba(255,255,255,.06)", backdropFilter:"blur(24px)",
          border:"1px solid rgba(255,255,255,.12)", borderRadius:20,
          padding:"44px 42px", width:"100%", maxWidth:420,
          boxShadow:"0 32px 64px rgba(0,0,0,.5)",
          animation:"cardIn 480ms ease-out"
        }}>
          {/* Logo */}
          <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:36,justifyContent:"center"}}>
            <img src="/logo.png" alt="Metro by T-Mobile"
              style={{width:80,height:80,objectFit:"contain",borderRadius:12}}/>
            <div>
              <div style={{color:"#fff",fontWeight:700,fontSize:16,lineHeight:1.3}}>Employee Commission</div>
              <div style={{color:"#fff",fontWeight:700,fontSize:16,lineHeight:1.3}}>Dashboard</div>
              <div style={{color:METRO_PINK,fontSize:11,marginTop:4}}>Metro by T-Mobile</div>
            </div>
          </div>

          <h2 style={{color:"#fff",fontSize:21,fontWeight:600,marginBottom:6,letterSpacing:"-.3px"}}>Sign in</h2>
          <p style={{color:"rgba(255,255,255,.45)",fontSize:13,marginBottom:28}}>Enter your credentials to continue</p>

          <form onSubmit={handleSubmit}>
            <div style={{marginBottom:16}}>
              <label style={{display:"block",color:"rgba(255,255,255,.6)",fontSize:12,fontWeight:500,marginBottom:6,letterSpacing:".03em"}}>
                USERNAME
              </label>
              <input
                value={username} onChange={e=>setUsername(e.target.value)}
                placeholder="e.g. admin, dallas"
                style={{
                  width:"100%",padding:"11px 14px",borderRadius:10,fontSize:14,
                  background:"rgba(255,255,255,.08)",border:"1px solid rgba(255,255,255,.15)",
                  color:"#fff",outline:"none",boxSizing:"border-box",transition:"border .2s"
                }}
                onFocus={e=>e.target.style.borderColor=METRO_PINK}
                onBlur={e=>e.target.style.borderColor="rgba(255,255,255,.15)"}
              />
            </div>

            <div style={{marginBottom:24}}>
              <label style={{display:"block",color:"rgba(255,255,255,.6)",fontSize:12,fontWeight:500,marginBottom:6,letterSpacing:".03em"}}>
                PASSWORD
              </label>
              <div style={{position:"relative"}}>
                <input
                  type={showPw?"text":"password"}
                  value={password} onChange={e=>setPassword(e.target.value)}
                  placeholder="••••••••"
                  style={{
                    width:"100%",padding:"11px 40px 11px 14px",borderRadius:10,fontSize:14,
                    background:"rgba(255,255,255,.08)",border:"1px solid rgba(255,255,255,.15)",
                    color:"#fff",outline:"none",boxSizing:"border-box",transition:"border .2s"
                  }}
                  onFocus={e=>e.target.style.borderColor=METRO_PINK}
                  onBlur={e=>e.target.style.borderColor="rgba(255,255,255,.15)"}
                />
                <button type="button" onClick={()=>setShowPw(p=>!p)}
                  style={{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",
                    background:"none",border:"none",cursor:"pointer",color:"rgba(255,255,255,.4)",padding:0}}>
                  {showPw ? <EyeOff size={16}/> : <Eye size={16}/>}
                </button>
              </div>
            </div>

            {error && (
              <div style={{background:"rgba(239,68,68,.12)",border:"1px solid rgba(239,68,68,.3)",
                borderRadius:8,padding:"10px 14px",color:"#f87171",fontSize:13,marginBottom:16}}>
                {error}
              </div>
            )}

            <button type="submit" disabled={loading} style={{
              width:"100%",padding:"12px",borderRadius:10,fontSize:14,fontWeight:600,
              background: loading ? "rgba(230,0,126,.5)" : `linear-gradient(135deg,${METRO_PINK},${METRO_PURPLE})`,
              color:"#fff",border:"none",cursor:loading?"not-allowed":"pointer",
              display:"flex",alignItems:"center",justifyContent:"center",gap:8,
              transition:"opacity .2s"
            }}>
              {loading ? "Signing in…" : <><LogIn size={16}/> Sign in</>}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
