# CommTrack — Employee Commission Dashboard

## Quick Start

```bash
npm install
npm start
```

Then open http://localhost:3000

---

## Deploy to Vercel (free)

1. Push this folder to a GitHub repo
2. Go to https://vercel.com → New Project → Import your repo
3. Leave all defaults → click **Deploy**
4. Done! You get a live URL like `https://your-app.vercel.app`

---

## Demo Login Credentials

| Username   | Password   | Access           |
|------------|------------|------------------|
| admin      | admin123   | All markets      |
| karachi    | khi2024    | Karachi only     |
| lahore     | lhe2024    | Lahore only      |
| islamabad  | isb2024    | Islamabad only   |
| peshawar   | pew2024    | Peshawar only    |

To change passwords → edit `src/data.js` → `CREDENTIALS` object.
To add a new market → add a new entry there.

---

## Excel Upload Format

Your Excel file must have these column headers (case-insensitive):

| Column       | Aliases accepted                            |
|--------------|---------------------------------------------|
| Name         | Name, Employee Name, Emp Name               |
| DM           | DM, District Manager, Manager               |
| Market       | Market, City, Region, Area                  |
| Target       | Target, Goal, Quota, Target Sales           |
| Sales        | Sales, Achieved, Actual, Actual Sales       |
| Commission   | Commission, Comm, Earnings, Payout          |
| Month        | Month, Period, Month Name                   |

### Example Excel rows:

| Name          | DM           | Market   | Target  | Sales   | Commission | Month |
|---------------|--------------|----------|---------|---------|------------|-------|
| Ali Hassan    | Tariq Memon  | Karachi  | 500000  | 572000  | 57200      | May   |
| Sara Ahmed    | Nadia Malik  | Lahore   | 400000  | 388000  | 27160      | May   |

**Commission is calculated from your data** — just put whatever value you want shown.

---

## Pages

1. **All Employees** — Searchable, sortable leaderboard of every employee with progress bars, achievement %, commission earned, and status badges.

2. **DM Wise** — Each District Manager shown as an expandable card. Click to see their team breakdown below.

3. **Market Wise** — City/region cards with pie chart for commission distribution. Click any card to drill into that market's employees.

---

## Customization

- **Colors/branding**: `src/components/Shell.jsx` and `src/pages/Login.jsx`
- **Currency symbol**: `src/data.js` → `fmt()` function (currently ₨)
- **Achievement thresholds**: `src/data.js` → `statusOf()` (currently 100% = On Target, 85% = Near)
- **Add more markets/credentials**: `src/data.js` → `CREDENTIALS`
