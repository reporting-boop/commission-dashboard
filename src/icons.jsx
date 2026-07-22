// Inline SVG icons — no external dependency needed
const iconProps = (size=16, color="currentColor") => ({
  width:size, height:size, viewBox:"0 0 24 24", fill:"none",
  stroke:color, strokeWidth:2, strokeLinecap:"round", strokeLinejoin:"round",
  style:{display:"inline-block",verticalAlign:"middle",flexShrink:0}
});

export function TrendingUp({size=16,color="currentColor"}) {
  return <svg {...iconProps(size,color)}><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>;
}
export function Users({size=16,color="currentColor"}) {
  return <svg {...iconProps(size,color)}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
}
export function Map({size=16,color="currentColor"}) {
  return <svg {...iconProps(size,color)}><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>;
}
export function LayoutDashboard({size=16,color="currentColor"}) {
  return <svg {...iconProps(size,color)}><rect x="3" y="3" width="7" height="9"/><rect x="14" y="3" width="7" height="5"/><rect x="14" y="12" width="7" height="9"/><rect x="3" y="16" width="7" height="5"/></svg>;
}
export function Upload({size=16,color="currentColor"}) {
  return <svg {...iconProps(size,color)}><polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/></svg>;
}
export function LogOut({size=16,color="currentColor"}) {
  return <svg {...iconProps(size,color)}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>;
}
export function LogIn({size=16,color="currentColor"}) {
  return <svg {...iconProps(size,color)}><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg>;
}
export function Eye({size=16,color="currentColor"}) {
  return <svg {...iconProps(size,color)}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>;
}
export function EyeOff({size=16,color="currentColor"}) {
  return <svg {...iconProps(size,color)}><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>;
}
export function CheckCircle({size=16,color="currentColor"}) {
  return <svg {...iconProps(size,color)}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>;
}
export function X({size=16,color="currentColor"}) {
  return <svg {...iconProps(size,color)}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;
}
export function Search({size=16,color="currentColor"}) {
  return <svg {...iconProps(size,color)}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>;
}
export function ChevronDown({size=16,color="currentColor"}) {
  return <svg {...iconProps(size,color)}><polyline points="6 9 12 15 18 9"/></svg>;
}
export function ChevronUp({size=16,color="currentColor"}) {
  return <svg {...iconProps(size,color)}><polyline points="18 15 12 9 6 15"/></svg>;
}

export function ChevronRight({size=16,color="currentColor"}) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>;
}
export function ChevronLeft({size=16,color="currentColor"}) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>;
}
export function Filter({size=16,color="currentColor"}) {
  return <svg {...iconProps(size,color)}><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>;
}
export function DollarSign({size=16,color="currentColor"}) {
  return <svg {...iconProps(size,color)}><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>;
}
export function TrendingDown({size=16,color="currentColor"}) {
  return <svg {...iconProps(size,color)}><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/><polyline points="17 18 23 18 23 12"/></svg>;
}
export function AlertTriangle({size=16,color="currentColor"}) {
  return <svg {...iconProps(size,color)}><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>;
}
export function Award({size=16,color="currentColor"}) {
  return <svg {...iconProps(size,color)}><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>;
}
export function Sun({size=16,color="currentColor"}) {
  return <svg {...iconProps(size,color)}><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>;
}
export function Moon({size=16,color="currentColor"}) {
  return <svg {...iconProps(size,color)}><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>;
}
