// ── CREDENTIALS ─────────────────────────────────────────────
export const CREDENTIALS = {
  admin:      { password: "admin123",  market: null,          role: "admin",  label: "Admin" },
  arizona:    { password: "arz2024",   market: "ARIZONA",     role: "market", label: "Arizona" },
  dallas:     { password: "dal2024",   market: "DALLAS",      role: "market", label: "Dallas" },
  houston:    { password: "hou2024",   market: "HOUSTON",     role: "market", label: "Houston" },
  memphis:    { password: "mem2024",   market: "MEMPHIS",     role: "market", label: "Memphis" },
  losangeles: { password: "lax2024",   market: "LOS ANGELES", role: "market", label: "Los Angeles" },
};

// ── DEMO DATASET ─────────────────────────────────────────────
export const DEMO_DATA = [
  { name:"ADRIYAN KHAN", dm:"ALI KHAN", market:"ARIZONA", commission:290.04, ntid:"", totalBox:0, finalCommission:290.04, contestPayout:0, spiff:0, boxCommission:39.76, actRetComm:50.32, featRetComm:1.45, vasCommission:3.45, accCommission:157.72, accDisqComm:0, referralBonus:0.26, mimPayout:18.77, rebateChargeback:-2.53, pendingChargeback:-15.3, otherCharges:0, invChargeback:-0.24, depChargeback:-5.6, adminCharges:-5.28, qaChargeback:0, lateClockIn:-12.67, writeUps:0 },
  { name:"AFZAL MD", dm:"ALI KHAN", market:"ARIZONA", commission:1073.33, ntid:"", totalBox:0, finalCommission:1073.33, contestPayout:0, spiff:20, boxCommission:147.15, actRetComm:186.22, featRetComm:5.37, vasCommission:12.77, accCommission:583.68, accDisqComm:0, referralBonus:0.97, mimPayout:69.44, rebateChargeback:-9.35, pendingChargeback:-56.63, otherCharges:0, invChargeback:-0.88, depChargeback:-20.73, adminCharges:-19.55, qaChargeback:0, lateClockIn:-46.88, writeUps:0 },
  { name:"ABUBAKER ASLAM", dm:"ALI KHAN", market:"ARIZONA", commission:152.34, ntid:"", totalBox:0, finalCommission:152.34, contestPayout:0, spiff:0, boxCommission:20.89, actRetComm:26.43, featRetComm:0.76, vasCommission:1.81, accCommission:82.84, accDisqComm:0, referralBonus:0.14, mimPayout:9.86, rebateChargeback:-1.33, pendingChargeback:-8.04, otherCharges:0, invChargeback:-0.12, depChargeback:-2.94, adminCharges:-2.77, qaChargeback:0, lateClockIn:-6.65, writeUps:0 },
  { name:"FAISAL KHAN", dm:"ALI KHAN", market:"ARIZONA", commission:1464.68, ntid:"", totalBox:0, finalCommission:1464.68, contestPayout:0, spiff:0, boxCommission:200.81, actRetComm:254.12, featRetComm:7.32, vasCommission:17.43, accCommission:796.49, accDisqComm:0, referralBonus:1.32, mimPayout:94.76, rebateChargeback:-12.76, pendingChargeback:-77.28, otherCharges:0, invChargeback:-1.2, depChargeback:-28.29, adminCharges:-26.67, qaChargeback:0, lateClockIn:-63.98, writeUps:0 },
  { name:"SARFARAZ SHAIK", dm:"ALI KHAN", market:"ARIZONA", commission:1823.56, ntid:"", totalBox:0, finalCommission:1823.56, contestPayout:0, spiff:0, boxCommission:250.01, actRetComm:316.39, featRetComm:9.12, vasCommission:21.7, accCommission:991.65, accDisqComm:0, referralBonus:1.64, mimPayout:117.98, rebateChargeback:-15.88, pendingChargeback:-96.22, otherCharges:0, invChargeback:-1.49, depChargeback:-35.22, adminCharges:-33.21, qaChargeback:0, lateClockIn:-79.66, writeUps:0 },
  { name:"SAAD AHMED", dm:"ALI KHAN", market:"ARIZONA", commission:1949.03, ntid:"", totalBox:0, finalCommission:1949.03, contestPayout:0, spiff:0, boxCommission:267.21, actRetComm:338.16, featRetComm:9.75, vasCommission:23.19, accCommission:1059.88, accDisqComm:0, referralBonus:1.75, mimPayout:126.1, rebateChargeback:-16.98, pendingChargeback:-102.84, otherCharges:0, invChargeback:-1.59, depChargeback:-37.65, adminCharges:-35.49, qaChargeback:0, lateClockIn:-85.14, writeUps:0 },
  { name:"VENKAT SAI", dm:"ALI KHAN", market:"ARIZONA", commission:1085.28, ntid:"", totalBox:0, finalCommission:1085.28, contestPayout:0, spiff:0, boxCommission:148.79, actRetComm:188.3, featRetComm:5.43, vasCommission:12.91, accCommission:590.18, accDisqComm:0, referralBonus:0.98, mimPayout:70.22, rebateChargeback:-9.45, pendingChargeback:-57.27, otherCharges:0, invChargeback:-0.89, depChargeback:-20.96, adminCharges:-19.76, qaChargeback:0, lateClockIn:-47.41, writeUps:0 },
  { name:"JOSHAN LAKHANI", dm:"ASLAM KHAN", market:"ARIZONA", commission:2703.09, ntid:"", totalBox:0, finalCommission:2703.09, contestPayout:70, spiff:0, boxCommission:370.59, actRetComm:468.99, featRetComm:13.52, vasCommission:32.17, accCommission:1469.94, accDisqComm:0, referralBonus:2.43, mimPayout:174.89, rebateChargeback:-23.54, pendingChargeback:-142.63, otherCharges:0, invChargeback:-2.21, depChargeback:-52.21, adminCharges:-49.22, qaChargeback:0, lateClockIn:-118.07, writeUps:0 },
  { name:"SYED IDRIS", dm:"ASLAM KHAN", market:"ARIZONA", commission:2605.46, ntid:"", totalBox:0, finalCommission:2605.46, contestPayout:80, spiff:0, boxCommission:357.21, actRetComm:452.05, featRetComm:13.03, vasCommission:31.0, accCommission:1416.85, accDisqComm:0, referralBonus:2.34, mimPayout:168.57, rebateChargeback:-22.69, pendingChargeback:-137.48, otherCharges:0, invChargeback:-2.13, depChargeback:-50.32, adminCharges:-47.45, qaChargeback:0, lateClockIn:-113.81, writeUps:0 },
  { name:"MUZAMMIL MUHAMMAD", dm:"ASLAM KHAN", market:"ARIZONA", commission:2406.02, ntid:"", totalBox:0, finalCommission:2406.02, contestPayout:0, spiff:0, boxCommission:329.87, actRetComm:417.44, featRetComm:12.03, vasCommission:28.63, accCommission:1308.39, accDisqComm:0, referralBonus:2.17, mimPayout:155.67, rebateChargeback:-20.96, pendingChargeback:-126.95, otherCharges:0, invChargeback:-1.97, depChargeback:-46.47, adminCharges:-43.81, qaChargeback:0, lateClockIn:-105.1, writeUps:0 },
  { name:"PARVEZ PASHA", dm:"TALHA QURESHI", market:"ARIZONA", commission:3098.25, ntid:"", totalBox:0, finalCommission:3098.25, contestPayout:0, spiff:0, boxCommission:424.77, actRetComm:537.55, featRetComm:15.49, vasCommission:36.87, accCommission:1684.83, accDisqComm:0, referralBonus:2.79, mimPayout:200.46, rebateChargeback:-26.99, pendingChargeback:-163.48, otherCharges:0, invChargeback:-2.53, depChargeback:-59.84, adminCharges:-56.42, qaChargeback:0, lateClockIn:-135.34, writeUps:0 },
  { name:"TAZNEEM SYED", dm:"TALHA QURESHI", market:"ARIZONA", commission:3419.75, ntid:"", totalBox:0, finalCommission:3419.75, contestPayout:0, spiff:0, boxCommission:468.85, actRetComm:593.33, featRetComm:17.1, vasCommission:40.7, accCommission:1859.66, accDisqComm:0, referralBonus:3.08, mimPayout:221.26, rebateChargeback:-29.79, pendingChargeback:-180.44, otherCharges:0, invChargeback:-2.8, depChargeback:-66.05, adminCharges:-62.27, qaChargeback:0, lateClockIn:-149.38, writeUps:0 },
  { name:"MAHRU KHAN", dm:"TALHA QURESHI", market:"ARIZONA", commission:3085.4, ntid:"", totalBox:0, finalCommission:3085.4, contestPayout:0, spiff:0, boxCommission:423.01, actRetComm:535.32, featRetComm:15.43, vasCommission:36.72, accCommission:1677.84, accDisqComm:0, referralBonus:2.78, mimPayout:199.63, rebateChargeback:-26.87, pendingChargeback:-162.8, otherCharges:0, invChargeback:-2.52, depChargeback:-59.59, adminCharges:-56.18, qaChargeback:0, lateClockIn:-134.77, writeUps:0 },
  { name:"ANWAR KARIM", dm:"SALIM THANAWALA", market:"DALLAS", commission:2826.13, ntid:"", totalBox:0, finalCommission:2826.13, contestPayout:0, spiff:0, boxCommission:387.46, actRetComm:490.33, featRetComm:14.13, vasCommission:33.63, accCommission:1536.85, accDisqComm:0, referralBonus:2.54, mimPayout:182.85, rebateChargeback:-24.62, pendingChargeback:-149.12, otherCharges:0, invChargeback:-2.31, depChargeback:-54.59, adminCharges:-51.46, qaChargeback:0, lateClockIn:-123.45, writeUps:0 },
  { name:"SHOEB KHAN", dm:"SALIM THANAWALA", market:"DALLAS", commission:2754.31, ntid:"", totalBox:0, finalCommission:2754.31, contestPayout:0, spiff:0, boxCommission:377.62, actRetComm:477.87, featRetComm:13.77, vasCommission:32.78, accCommission:1497.79, accDisqComm:0, referralBonus:2.48, mimPayout:178.2, rebateChargeback:-23.99, pendingChargeback:-145.33, otherCharges:0, invChargeback:-2.25, depChargeback:-53.2, adminCharges:-50.16, qaChargeback:0, lateClockIn:-120.31, writeUps:0 },
  { name:"RAHEELKHAN ABDUL", dm:"SALIM THANAWALA", market:"DALLAS", commission:2577.07, ntid:"", totalBox:0, finalCommission:2577.07, contestPayout:0, spiff:0, boxCommission:353.32, actRetComm:447.12, featRetComm:12.89, vasCommission:30.67, accCommission:1401.41, accDisqComm:0, referralBonus:2.32, mimPayout:166.74, rebateChargeback:-22.45, pendingChargeback:-135.98, otherCharges:0, invChargeback:-2.11, depChargeback:-49.78, adminCharges:-46.93, qaChargeback:0, lateClockIn:-112.57, writeUps:0 },
  { name:"WAIZ MOHD", dm:"AHMED IMRAN", market:"DALLAS", commission:2575.62, ntid:"", totalBox:0, finalCommission:2575.62, contestPayout:0, spiff:0, boxCommission:353.12, actRetComm:446.87, featRetComm:12.88, vasCommission:30.65, accCommission:1400.62, accDisqComm:0, referralBonus:2.32, mimPayout:166.64, rebateChargeback:-22.43, pendingChargeback:-135.9, otherCharges:0, invChargeback:-2.11, depChargeback:-49.75, adminCharges:-46.9, qaChargeback:0, lateClockIn:-112.51, writeUps:0 },
  { name:"OMER MOHAMMAD", dm:"AHMED IMRAN", market:"DALLAS", commission:2440.29, ntid:"", totalBox:0, finalCommission:2440.29, contestPayout:0, spiff:0, boxCommission:334.56, actRetComm:423.39, featRetComm:12.2, vasCommission:29.04, accCommission:1327.03, accDisqComm:0, referralBonus:2.2, mimPayout:157.89, rebateChargeback:-21.26, pendingChargeback:-128.76, otherCharges:0, invChargeback:-2.0, depChargeback:-47.13, adminCharges:-44.44, qaChargeback:0, lateClockIn:-106.59, writeUps:0 },
  { name:"SYED MUQEEM", dm:"AHMED IMRAN", market:"DALLAS", commission:2146.04, ntid:"", totalBox:0, finalCommission:2146.04, contestPayout:0, spiff:0, boxCommission:294.22, actRetComm:372.34, featRetComm:10.73, vasCommission:25.54, accCommission:1167.02, accDisqComm:0, referralBonus:1.93, mimPayout:138.85, rebateChargeback:-18.69, pendingChargeback:-113.24, otherCharges:0, invChargeback:-1.76, depChargeback:-41.45, adminCharges:-39.08, qaChargeback:0, lateClockIn:-93.74, writeUps:0 },
  { name:"WASEEM AKRAM", dm:"SUBHAN ANSARI", market:"HOUSTON", commission:2112.8, ntid:"", totalBox:0, finalCommission:2112.8, contestPayout:0, spiff:0, boxCommission:289.66, actRetComm:366.57, featRetComm:10.56, vasCommission:25.14, accCommission:1148.94, accDisqComm:0, referralBonus:1.9, mimPayout:136.7, rebateChargeback:-18.4, pendingChargeback:-111.48, otherCharges:0, invChargeback:-1.73, depChargeback:-40.81, adminCharges:-38.47, qaChargeback:0, lateClockIn:-92.29, writeUps:0 },
  { name:"PRAMEELA RANI", dm:"SUBHAN ANSARI", market:"HOUSTON", commission:2093.59, ntid:"", totalBox:0, finalCommission:2093.59, contestPayout:0, spiff:0, boxCommission:287.03, actRetComm:363.24, featRetComm:10.47, vasCommission:24.91, accCommission:1138.49, accDisqComm:0, referralBonus:1.88, mimPayout:135.46, rebateChargeback:-18.24, pendingChargeback:-110.47, otherCharges:0, invChargeback:-1.71, depChargeback:-40.44, adminCharges:-38.12, qaChargeback:0, lateClockIn:-91.45, writeUps:0 },
  { name:"ABRAR MOHAMMED", dm:"SUBHAN ANSARI", market:"HOUSTON", commission:2093.16, ntid:"", totalBox:0, finalCommission:2093.16, contestPayout:0, spiff:0, boxCommission:286.97, actRetComm:363.16, featRetComm:10.47, vasCommission:24.91, accCommission:1138.26, accDisqComm:0, referralBonus:1.88, mimPayout:135.43, rebateChargeback:-18.23, pendingChargeback:-110.45, otherCharges:0, invChargeback:-1.71, depChargeback:-40.43, adminCharges:-38.12, qaChargeback:0, lateClockIn:-91.43, writeUps:0 },
  { name:"OSAMA NAAZ", dm:"MAAZ KHAN", market:"HOUSTON", commission:2053.15, ntid:"", totalBox:0, finalCommission:2053.15, contestPayout:0, spiff:0, boxCommission:281.49, actRetComm:356.22, featRetComm:10.27, vasCommission:24.43, accCommission:1116.5, accDisqComm:0, referralBonus:1.85, mimPayout:132.84, rebateChargeback:-17.88, pendingChargeback:-108.34, otherCharges:0, invChargeback:-1.68, depChargeback:-39.66, adminCharges:-37.39, qaChargeback:0, lateClockIn:-89.69, writeUps:0 },
  { name:"ADNAN AHMED", dm:"MAAZ KHAN", market:"HOUSTON", commission:2045.08, ntid:"", totalBox:0, finalCommission:2045.08, contestPayout:0, spiff:0, boxCommission:280.38, actRetComm:354.82, featRetComm:10.23, vasCommission:24.34, accCommission:1112.11, accDisqComm:0, referralBonus:1.84, mimPayout:132.32, rebateChargeback:-17.81, pendingChargeback:-107.91, otherCharges:0, invChargeback:-1.67, depChargeback:-39.5, adminCharges:-37.24, qaChargeback:0, lateClockIn:-89.33, writeUps:0 },
  { name:"ABDUL REHMAN", dm:"SHARIK TOBANI", market:"LOS ANGELES", commission:5012.23, ntid:"", totalBox:0, finalCommission:5012.23, contestPayout:0, spiff:0, boxCommission:687.18, actRetComm:869.62, featRetComm:25.06, vasCommission:59.65, accCommission:2725.65, accDisqComm:0, referralBonus:4.51, mimPayout:324.29, rebateChargeback:-43.66, pendingChargeback:-264.47, otherCharges:0, invChargeback:-4.1, depChargeback:-96.81, adminCharges:-91.27, qaChargeback:0, lateClockIn:-218.94, writeUps:0 },
  { name:"AAMER ALI", dm:"SHARIK TOBANI", market:"LOS ANGELES", commission:886.53, ntid:"", totalBox:0, finalCommission:886.53, contestPayout:0, spiff:0, boxCommission:121.54, actRetComm:153.81, featRetComm:4.43, vasCommission:10.55, accCommission:482.1, accDisqComm:0, referralBonus:0.8, mimPayout:57.36, rebateChargeback:-7.72, pendingChargeback:-46.78, otherCharges:0, invChargeback:-0.73, depChargeback:-17.12, adminCharges:-16.14, qaChargeback:0, lateClockIn:-38.73, writeUps:0 },
  { name:"KAMRANMOHAMMED", dm:"KAMRANMOHAMMED", market:"SAN FRANCISCO", commission:1200.0, ntid:"", totalBox:0, finalCommission:1200.0, contestPayout:0, spiff:0, boxCommission:164.52, actRetComm:208.2, featRetComm:6.0, vasCommission:14.28, accCommission:652.56, accDisqComm:0, referralBonus:1.08, mimPayout:77.64, rebateChargeback:-10.45, pendingChargeback:-63.32, otherCharges:0, invChargeback:-0.98, depChargeback:-23.18, adminCharges:-21.85, qaChargeback:0, lateClockIn:-52.42, writeUps:0 },
  { name:"AFZAL M", dm:"AFZAL M", market:"BOSTON", commission:1450.0, ntid:"", totalBox:0, finalCommission:1450.0, contestPayout:0, spiff:0, boxCommission:198.79, actRetComm:251.57, featRetComm:7.25, vasCommission:17.26, accCommission:788.51, accDisqComm:0, referralBonus:1.3, mimPayout:93.81, rebateChargeback:-12.63, pendingChargeback:-76.51, otherCharges:0, invChargeback:-1.19, depChargeback:-28.01, adminCharges:-26.4, qaChargeback:0, lateClockIn:-63.34, writeUps:0 },
  { name:"SALMAN RIAZ", dm:"SALMAN RIAZ", market:"MEMPHIS", commission:980.0, ntid:"", totalBox:0, finalCommission:980.0, contestPayout:0, spiff:0, boxCommission:134.36, actRetComm:170.03, featRetComm:4.9, vasCommission:11.66, accCommission:532.92, accDisqComm:0, referralBonus:0.88, mimPayout:63.41, rebateChargeback:-8.54, pendingChargeback:-51.71, otherCharges:0, invChargeback:-0.8, depChargeback:-18.93, adminCharges:-17.85, qaChargeback:0, lateClockIn:-42.81, writeUps:0 },
];

// All master columns in order
export const MASTER_COLUMNS = [
  { key:"market",         label:"MARKET" },
  { key:"dm",             label:"DM" },
  { key:"ntid",           label:"NTID" },
  { key:"name",           label:"EMPLOYEE NAME" },
  { key:"commission",     label:"Commission" },
  { key:"totalBox",       label:"Total BOX" },
  { key:"plan0",          label:"0$ plan" },
  { key:"mrc5",           label:"5 MRC" },
  { key:"mrc10",          label:"10 MRC" },
  { key:"mrc15",          label:"15 MRC" },
  { key:"mrc20",          label:"20 MRC" },
  { key:"mrc24",          label:"24 MRC" },
  { key:"mrc25",          label:"25 MRC" },
  { key:"mrc26",          label:"26 MRC" },
  { key:"mrc30",          label:"30 MRC" },
  { key:"mrc35",          label:"35 MRC" },
  { key:"mrc40",          label:"40 MRC" },
  { key:"mrc45",          label:"45 MRC" },
  { key:"mrc48",          label:"48 MRC" },
  { key:"mrc50",          label:"50 MRC" },
  { key:"mrc55",          label:"55 MRC" },
  { key:"mrc60",          label:"60 MRC" },
  { key:"mrc65",          label:"65 MRC" },
  { key:"mrc75",          label:"75 MRC" },
  { key:"mrc155",         label:"155 MRC" },
  { key:"flex50",         label:"Flex 50" },
  { key:"flex60",         label:"Flex 60" },
  { key:"flex70",         label:"Flex 70" },
  { key:"hint",           label:"Hint" },
  { key:"migration",      label:"Migration" },
  { key:"smartride",      label:"Smartride & Watch" },
  { key:"tab10",          label:"Tab 10" },
  { key:"tab15",          label:"Tab 15" },
  { key:"tab20",          label:"Tab 20" },
  { key:"tab25",          label:"Tab 25" },
  { key:"tab30",          label:"Tab 30" },
  { key:"upgrade",        label:"UPGRADE" },
  { key:"boxCommission",  label:"BOX Commission" },
  { key:"actRetComm",     label:"Activation Retention Commission" },
  { key:"featRetComm",    label:"Feature Retention Commission" },
  { key:"vasMrc",         label:"VAS MRC" },
  { key:"vasCommission",  label:"VAS Commission" },
  { key:"accSales",       label:"Acc Sales" },
  { key:"accCommission",  label:"Acc Commission" },
  { key:"accDisq",        label:"Acc Disqualified" },
  { key:"accDisqComm",    label:"Acc Disqualified Commission" },
  { key:"rebateChargeback", label:"Rebate Chargeback" },
  { key:"pendingChargeback", label:"Pending Payment Chargeback" },
  { key:"otherCharges",   label:"Advances/Other Charges" },
  { key:"invChargeback",  label:"Inventory Chargeback" },
  { key:"depChargeback",  label:"Deposit Chargeback" },
  { key:"adminCharges",   label:"Admin Charges" },
  { key:"qaChargeback",   label:"QA Chargebacks" },
  { key:"lateClockIn",    label:"Late Clock In" },
  { key:"writeUps",       label:"Write-Ups Chargebacks" },
  { key:"spiff",          label:"40L1WEB Comm." },
  { key:"referralBonus",  label:"Referral Bonus/Reimbursement" },
  { key:"contestPayout",  label:"Contest Payout" },
  { key:"mimPayout",      label:"MIM Payout" },
  { key:"finalCommission",label:"Final Commission After Deduction" },
];

// Columns F onwards (index 5) to AK (index 36) = group 1  (totalBox .. upgrade)
// Columns AS (index 44) to BB (index 56 = finalCommission) = group 2
export const GROUP1_KEYS = MASTER_COLUMNS.slice(6, 37).map(c => c.key);  // G-AK (0$ plan..UPGRADE)
export const GROUP2_KEYS = MASTER_COLUMNS.slice(44).map(c => c.key);     // AS-BB

// ── EXCEL COLUMN MAPPING ─────────────────────────────────────
export const COLUMN_MAP = {
  market:     ["market","city","region","area"],
  dm:         ["dm","district manager","manager","dm name"],
  ntid:       ["ntid","nt id","employee id","emp id"],
  name:       ["employee name","emp name","employee","name"],
  commission: ["commission","comm","earnings"],
  totalBox:   ["total box","totalbox","total boxes"],
  plan0:      ["0$ plan","0$plan","0 plan"],
  mrc5:       ["5 mrc"],mrc10:["10 mrc"],mrc15:["15 mrc"],mrc20:["20 mrc"],
  mrc24:      ["24 mrc"],mrc25:["25 mrc"],mrc26:["26 mrc"],mrc30:["30 mrc"],
  mrc35:      ["35 mrc"],mrc40:["40 mrc"],mrc45:["45 mrc"],mrc48:["48 mrc"],
  mrc50:      ["50 mrc"],mrc55:["55 mrc"],mrc60:["60 mrc"],mrc65:["65 mrc"],
  mrc75:      ["75 mrc"],mrc155:["155 mrc"],
  flex50:     ["flex 50"],flex60:["flex 60"],flex70:["flex 70"],
  hint:       ["hint"],migration:["migration"],smartride:["smartride & watch","smartride"],
  tab10:      ["tab 10"],tab15:["tab 15"],tab20:["tab 20"],tab25:["tab 25"],tab30:["tab 30"],
  upgrade:    ["upgrade"],
  boxCommission: ["box commission"],
  actRetComm: ["activation retention commission"],
  featRetComm:["feature retention commission"],
  vasMrc:     ["vas mrc"],
  vasCommission:["vas commission"],
  accSales:   ["acc sales"],
  accCommission:["acc commission"],
  accDisq:    ["acc disqualified"],
  accDisqComm:["acc disqualified commission"],
  rebateChargeback:["rebate chargeback (wrong discount given)","rebate chargeback"],
  pendingChargeback:["pending payment plan chargeback","pending payment chargeback"],
  otherCharges:["advances/ other charges","advances/other charges","other charges"],
  invChargeback:["inventory chargeback"],
  depChargeback:["deposit chargeback"],
  adminCharges:["admin charges"],
  qaChargeback:["qa chargebacks","qa chargeback"],
  lateClockIn: ["late clock in"],
  writeUps:   ["write-ups chargebacks","write ups chargebacks"],
  spiff:      ["40l1web comm.","40l1web comm","spiff","40l1web spiff"],
  referralBonus:["referral bonus/ reimbursement","referral bonus/reimbursement","referral bonus"],
  contestPayout:["contest payout","contest payout / additional spiff"],
  mimPayout:  ["mim payout"],
  finalCommission:["final commission after deduction","final commission"],
};

export function parseExcelRow(row, headers) {
  const out = {};
  for (const [key, aliases] of Object.entries(COLUMN_MAP)) {
    const col = headers.find(h => aliases.includes(h.toLowerCase().trim()));
    if (col !== undefined) out[key] = row[col];
  }
  out.commission     = Number(out.commission)     || 0;
  out.finalCommission= Number(out.finalCommission)|| out.commission;
  out.totalBox       = Number(out.totalBox)       || 0;
  out.contestPayout  = Number(out.contestPayout)  || 0;
  out.spiff          = Number(out.spiff)           || 0;
  return out;
}

export function parseContestRow(row, headers) {
  const map = {
    market:["market"], employee:["employee","employee name"],
    ntid:["ntid"], groupName:["group name"],
    competition:["competition"], startDate:["start date"],
    endDate:["end date"], contestPayout:["contest payout"],
    expectedPayout:["expected payout"], raffles:["no. of raffle"],
    zellePayout:["zelle payout"], payoutDate:["payout date"],
    addedBy:["added by"],
  };
  const out = {};
  for (const [key, aliases] of Object.entries(map)) {
    const col = headers.find(h => aliases.includes(h.toLowerCase().trim()));
    if (col !== undefined) out[key] = row[col];
  }
  out.contestPayout  = Number(out.contestPayout)  || 0;
  out.expectedPayout = Number(out.expectedPayout) || 0;
  out.zellePayout    = Number(out.zellePayout)    || 0;
  return out;
}

export function parseSpiffRow(row, headers) {
  return {
    market:   row[headers.find(h => h.toLowerCase() === "market")] || "",
    name:     row[headers.find(h => h.toLowerCase() === "employee name")] || "",
    spiff:    Number(row[headers.find(h => h.toLowerCase().includes("40l1web"))] || 0),
  };
}

// Tier thresholds: High >= 1000, Mid 500-799, Low < 500
export function statusOf(commission) {
  if (commission >= 1000) return { label:"High", cls:"high" };
  if (commission >= 500)  return { label:"Mid",  cls:"mid"  };
  return                         { label:"Low",  cls:"low"  };
}

export function commissionTier(commission) {
  return statusOf(commission);
}

export function fmt(n) {
  if (n >= 1000000) return "$" + (n/1000000).toFixed(1) + "M";
  if (n >= 1000)    return "$" + (n/1000).toFixed(0)    + "K";
  return "$" + Number(n).toFixed(0);
}

export function fmtFull(n) {
  return "$" + Number(n).toLocaleString("en-US", { minimumFractionDigits:2, maximumFractionDigits:2 });
}

// ── COMMISSION ANALYTICS (Paying Verticals / Chargebacks) ──────
// Derived from a full analysis of the source commission workbook:
// every column that adds to "Commission before Deductions" is a paying
// vertical; every column that adds to "Total Deductions" is a chargeback.
// Order = each category's real-world share of the total, largest first.
export const EARNING_VERTICALS = [
  { key:"accCommission",  label:"Accessories Commission" },
  { key:"actRetComm",     label:"Activation Retention" },
  { key:"boxCommission",  label:"Box Commission" },
  { key:"mimPayout",      label:"MIM Payout" },
  { key:"contestPayout",  label:"Contest Payout / Spiff" },
  { key:"vasCommission",  label:"VAS Commission" },
  { key:"featRetComm",    label:"Feature Retention" },
  { key:"spiff",          label:"40L1WEB Spiff" },
  { key:"referralBonus",  label:"Referral Bonus / Reimbursement" },
  { key:"accDisqComm",    label:"Acc Disqualified Commission" },
];

export const CHARGEBACK_CATEGORIES = [
  { key:"pendingChargeback", label:"Pending Payment Plan" },
  { key:"lateClockIn",       label:"Late Clock In" },
  { key:"depChargeback",     label:"Deposit Chargeback" },
  { key:"adminCharges",      label:"Admin Charges" },
  { key:"rebateChargeback",  label:"Rebate Chargeback" },
  { key:"invChargeback",     label:"Inventory Chargeback" },
  { key:"otherCharges",      label:"Advances / Other Charges" },
  { key:"qaChargeback",      label:"QA Chargebacks" },
  { key:"writeUps",          label:"Write-Ups Chargebacks" },
];

// Summarize a set of rows into a ranked category breakdown.
// Categories with no data anywhere in the row set are skipped —
// nothing is shown unless the underlying workbook actually has it.
export function buildCategorySummary(rows, categoryDefs) {
  const categories = categoryDefs
    .map(def => ({
      key: def.key,
      label: def.label,
      value: rows.reduce((sum, r) => sum + (Number(r[def.key]) || 0), 0),
    }))
    .filter(c => c.value !== 0)
    .sort((a, b) => Math.abs(b.value) - Math.abs(a.value));
  const total = categories.reduce((s, c) => s + c.value, 0);
  return { categories, total, count: categories.length };
}

// Generic executive KPIs — level-aware (employee | dm | market).
// Always returns up to seven focused cards, computed against whichever
// grouping level the calling page represents:
//   1. Total <Employees|DMs|Markets>
//   2. Net Commission
//   3. Highest Paying Vertical
//   4. Highest Chargeback Category
//   5. Average Commission / <level>
//   6. Average Chargeback / <level>
//   7. Highest Performing <level>
// Each card carries a stable `key` (not just a label) so the UI can map
// it to a consistent icon/color regardless of the level-specific label text.
export function computeExecutiveInsights(rows, level = "employee") {
  const insights = [];
  if (!rows.length) return insights;

  const LEVELS = {
    employee: { label:"Employee", plural:"Employees", groupKey: r => r.name },
    dm:       { label:"DM",       plural:"DMs",       groupKey: r => r.dm   },
    market:   { label:"Market",   plural:"Markets",   groupKey: r => r.market },
  };
  const cfg = LEVELS[level] || LEVELS.employee;

  // Distinct group count at this level (falls back to row count if the
  // grouping field isn't populated, e.g. no DM data on this row set).
  const groupSet   = new Set(rows.map(cfg.groupKey).filter(Boolean));
  const groupCount = groupSet.size || rows.length;

  insights.push({ key:"total", label:`Total ${cfg.plural}`, value: String(groupCount), sub:"Filtered results", tone:"purple" });

  const earn = buildCategorySummary(rows, EARNING_VERTICALS);
  const cb   = buildCategorySummary(rows, CHARGEBACK_CATEGORIES);

  // Net Commission: use the granular vertical/chargeback breakdown when
  // it's loaded; otherwise fall back to each row's own commission field
  // so this card is always meaningful, even without a real Excel upload.
  const hasGranular = earn.total !== 0 || cb.total !== 0;
  const netValue = hasGranular
    ? earn.total + cb.total
    : rows.reduce((s, r) => s + (Number(r.finalCommission ?? r.commission) || 0), 0);
  insights.push({ key:"net", label:"Net Commission", value: fmtFull(netValue), sub:"Current selection", tone:"green" });

  if (earn.categories.length) {
    const top = earn.categories[0];
    insights.push({ key:"topVertical", label:"Highest Paying Vertical", value: top.label, sub: fmtFull(top.value), tone:"blue" });
  }

  if (cb.categories.length) {
    const largest = cb.categories[0];
    insights.push({ key:"topChargeback", label:"Highest Chargeback Category", value: largest.label, sub: fmtFull(largest.value), tone:"red" });
  }

  if (earn.total) {
    insights.push({ key:"avgCommission", label:`Avg. Commission / ${cfg.label}`, value: fmtFull(earn.total / groupCount), sub:`Per ${cfg.label}`, tone:"teal" });
  }

  if (cb.total) {
    insights.push({ key:"avgChargeback", label:`Avg. Chargeback / ${cfg.label}`, value: fmtFull(cb.total / groupCount), sub:`Per ${cfg.label}`, tone:"orange" });
  }

  const val = r => Number(r.finalCommission ?? r.commission) || 0;
  const groups = {};
  rows.forEach(r => {
    const k = cfg.groupKey(r);
    if (!k) return;
    groups[k] = (groups[k] || 0) + val(r);
  });
  const entries = Object.entries(groups);
  if (entries.length) {
    entries.sort((a, b) => b[1] - a[1]);
    const [bestName, bestVal] = entries[0];
    insights.push({ key:"topPerformer", label:`Highest Performing ${cfg.label}`, value: bestName, sub: fmtFull(bestVal), tone:"indigo" });
  }

  return insights;
}

export function pct(sales, target) {
  if (!target) return 0;
  return Math.round((sales / target) * 100);
}

// ── SUPABASE ROW MAPPING ─────────────────────────────────────
// Converts one row from the commission_records table (snake_case,
// matches supabase_schema.sql exactly) into the camelCase shape the
// rest of the app already expects (same keys as MASTER_COLUMNS /
// DEMO_DATA), so every page, filter, and chart works unchanged.
const n = v => Number(v) || 0;

export function mapDbRow(row) {
  return {
    market:          row.market,
    dm:              row.dm || "",
    ntid:            row.ntid,
    name:            row.employee_name,
    commission:      n(row.commission_before_deductions),
    totalBox:        n(row.total_box),
    plan0:           n(row.plan_0),
    mrc5:  n(row.mrc_5),  mrc10: n(row.mrc_10), mrc15: n(row.mrc_15), mrc20: n(row.mrc_20),
    mrc24: n(row.mrc_24), mrc25: n(row.mrc_25), mrc26: n(row.mrc_26), mrc30: n(row.mrc_30),
    mrc35: n(row.mrc_35), mrc40: n(row.mrc_40), mrc45: n(row.mrc_45), mrc48: n(row.mrc_48),
    mrc50: n(row.mrc_50), mrc55: n(row.mrc_55), mrc60: n(row.mrc_60), mrc65: n(row.mrc_65),
    mrc75: n(row.mrc_75),
    flex50:          n(row.flex_50),
    flex60:          n(row.flex_60),
    flex70:          n(row.flex_70),
    hint:            n(row.hint),
    migration:       n(row.migration),
    smartride:       n(row.smartride_watch),
    tab10:           n(row.tab_10),
    tab15:           n(row.tab_15),
    tab20:           n(row.tab_20),
    tab25:           n(row.tab_25),
    tab30:           n(row.tab_30),
    upgrade:         n(row.upgrade),
    boxCommission:   n(row.box_commission),
    actRetComm:      n(row.activation_retention_commission),
    featRetComm:     n(row.feature_retention_commission),
    vasMrc:          n(row.vas_mrc),
    vasCommission:   n(row.vas_commission),
    accSales:        n(row.acc_sales),
    accCommission:   n(row.acc_commission),
    accDisq:         n(row.acc_disqualified),
    accDisqComm:     n(row.acc_disqualified_commission),
    rebateChargeback:    n(row.rebate_chargeback),
    pendingChargeback:   n(row.pending_payment_chargeback),
    otherCharges:        n(row.other_charges),
    invChargeback:       n(row.inventory_chargeback),
    depChargeback:       n(row.deposit_chargeback),
    adminCharges:        n(row.admin_charges),
    qaChargeback:        n(row.qa_chargebacks),
    lateClockIn:         n(row.late_clock_in),
    writeUps:            n(row.write_ups_chargebacks),
    spiff:           n(row.spiff_40l1web),
    referralBonus:   n(row.referral_bonus),
    contestPayout:   n(row.contest_payout),
    mimPayout:       n(row.mim_payout),
    finalCommission: n(row.final_commission),
    month:           row.month,
    year:            row.year,
  };
}

// Fetches every commission row from Supabase, mapped and ready for the
// app's existing pages. Pass a market to scope the query (e.g. for a
// market-role user); leave it undefined for admin (sees everything).
export async function fetchCommissionRecords(supabase, { market } = {}) {
  let query = supabase.from("commission_records").select("*");
  if (market) query = query.eq("market", market);

  const { data: rows, error } = await query;
  if (error) throw error;
  return (rows || []).map(mapDbRow);
}
