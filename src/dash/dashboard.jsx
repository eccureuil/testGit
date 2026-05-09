import { useState, useEffect, useRef } from "react";

const COLORS = {
  blue: "#185FA5",
  teal: "#1D9E75",
  amber: "#BA7517",
  pink: "#D4537E",
};

const metrics = [
  { icon: "💰", label: "Total revenue", value: "$84,320", badge: "+12.4%", up: true },
  { icon: "👥", label: "Active users", value: "14,892", badge: "+8.1%", up: true },
  { icon: "📈", label: "Conversion rate", value: "3.67%", badge: "-0.3%", up: false },
  { icon: "⏱", label: "Avg. session", value: "4m 22s", badge: "+5.7%", up: true },
];

const sources = [
  { label: "Organic", pct: 62, color: COLORS.blue },
  { label: "Referral", pct: 21, color: COLORS.teal },
  { label: "Email", pct: 11, color: COLORS.amber },
  { label: "Paid", pct: 6, color: COLORS.pink },
];

const transactions = [
  { icon: "💳", name: "Stripe payout", date: "09 May · 11:42 AM", amount: "+$4,200", pos: true },
  { icon: "🖥", name: "AWS invoice", date: "09 May · 09:15 AM", amount: "−$840", pos: false },
  { icon: "⭐", name: "New Pro subscription", date: "08 May · 06:33 PM", amount: "+$99", pos: true },
  { icon: "📣", name: "Google Ads spend", date: "08 May · 12:00 AM", amount: "−$1,250", pos: false },
];

function LineChart() {
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current || !window.Chart) return;
    const existing = window.Chart.getChart(ref.current);
    if (existing) existing.destroy();
    new window.Chart(ref.current, {
      type: "line",
      data: {
        labels: ["Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May"],
        datasets: [{
          data: [51000, 63000, 58000, 71000, 68000, 79000, 84320],
          borderColor: COLORS.blue,
          backgroundColor: "transparent",
          borderWidth: 1.5,
          pointRadius: 3,
          pointBackgroundColor: COLORS.blue,
          tension: 0.4,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { color: "rgba(0,0,0,0.06)" }, ticks: { font: { size: 11 } }, border: { display: false } },
          y: {
            grid: { color: "rgba(0,0,0,0.06)" },
            border: { display: false },
            ticks: { maxTicksLimit: 4, callback: v => "$" + Math.round(v / 1000) + "k", font: { size: 11 } },
          },
        },
      },
    });
  }, []);
  return <canvas ref={ref} role="img" aria-label="Revenue trend line chart" />;
}

function BarChart() {
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current || !window.Chart) return;
    const existing = window.Chart.getChart(ref.current);
    if (existing) existing.destroy();
    new window.Chart(ref.current, {
      type: "bar",
      data: {
        labels: ["Pro", "Enterprise", "Starter", "Add-ons"],
        datasets: [{
          data: [38000, 29000, 12000, 5000],
          backgroundColor: ["#B5D4F4", "#9FE1CB", "#FAC775", "#F4C0D1"],
          borderRadius: 4,
          borderSkipped: false,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { display: false }, ticks: { font: { size: 11 } }, border: { display: false } },
          y: {
            grid: { color: "rgba(0,0,0,0.06)" },
            border: { display: false },
            ticks: { maxTicksLimit: 4, callback: v => "$" + Math.round(v / 1000) + "k", font: { size: 11 } },
          },
        },
      },
    });
  }, []);
  return <canvas ref={ref} role="img" aria-label="Revenue by product bar chart" />;
}

export default function Dashboard() {
  const [activeNav, setActiveNav] = useState("Overview");
  const navItems = ["Overview", "Analytics", "Reports", "Settings"];

  return (
    <>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@2.44.0/tabler-icons.min.css" />
      <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.js" />

      <div style={{ padding: "1.5rem", background: "#f4f4f0", minHeight: "100vh", fontFamily: "system-ui, sans-serif" }}>

        {/* Topbar */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ background: "#fff", border: "0.5px solid rgba(0,0,0,0.12)", borderRadius: 8, padding: "6px 12px", fontSize: 13, fontWeight: 500, display: "flex", alignItems: "center", gap: 6 }}>
              📊 Vantage
            </div>
            {navItems.map(n => (
              <button key={n} onClick={() => setActiveNav(n)} style={{ fontSize: 13, color: activeNav === n ? "#111" : "#888", fontWeight: activeNav === n ? 500 : 400, padding: "6px 12px", borderRadius: 8, border: "none", background: "transparent", cursor: "pointer" }}>
                {n}
              </button>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ fontSize: 12, color: "#888", background: "#fff", border: "0.5px solid rgba(0,0,0,0.12)", borderRadius: 8, padding: "5px 10px" }}>May 2026</div>
            <div style={{ width: 30, height: 30, borderRadius: "50%", background: "#dbeafe", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 500, color: "#185FA5" }}>JD</div>
          </div>
        </div>

        {/* Metrics */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: "1.25rem" }}>
          {metrics.map(m => (
            <div key={m.label} style={{ background: "#fff", border: "0.5px solid rgba(0,0,0,0.1)", borderRadius: 12, padding: "1rem 1.25rem" }}>
              <div style={{ fontSize: 12, color: "#888", marginBottom: 6 }}>{m.label}</div>
              <div style={{ fontSize: 24, fontWeight: 500, letterSpacing: "-0.5px", color: "#111" }}>{m.value}</div>
              <div style={{ fontSize: 12, marginTop: 5, color: "#888", display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ fontSize: 11, background: m.up ? "#dcfce7" : "#fee2e2", color: m.up ? "#16a34a" : "#dc2626", padding: "2px 6px", borderRadius: 4 }}>
                  {m.badge}
                </span>
                vs last month
              </div>
            </div>
          ))}
        </div>

        {/* Charts row */}
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 10, marginBottom: "1.25rem" }}>
          <div style={{ background: "#fff", border: "0.5px solid rgba(0,0,0,0.1)", borderRadius: 12, padding: "1rem 1.25rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 500 }}>Revenue over time</div>
                <div style={{ fontSize: 12, color: "#888" }}>Last 7 months</div>
              </div>
            </div>
            <div style={{ position: "relative", height: 180 }}><LineChart /></div>
          </div>
          <div style={{ background: "#fff", border: "0.5px solid rgba(0,0,0,0.1)", borderRadius: 12, padding: "1rem 1.25rem" }}>
            <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 4 }}>Traffic sources</div>
            <div style={{ fontSize: 12, color: "#888", marginBottom: "1rem" }}>By channel</div>
            {sources.map(s => (
              <div key={s.label} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                <span style={{ fontSize: 12, color: "#888", width: 70 }}>{s.label}</span>
                <div style={{ flex: 1, height: 5, background: "rgba(0,0,0,0.08)", borderRadius: 3, overflow: "hidden" }}>
                  <div style={{ width: s.pct + "%", height: "100%", background: s.color, borderRadius: 3 }} />
                </div>
                <span style={{ fontSize: 12, fontWeight: 500, width: 36, textAlign: "right" }}>{s.pct}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom row */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <div style={{ background: "#fff", border: "0.5px solid rgba(0,0,0,0.1)", borderRadius: 12, padding: "1rem 1.25rem" }}>
            <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 4 }}>Recent transactions</div>
            <div style={{ fontSize: 12, color: "#888", marginBottom: "0.75rem" }}>Today</div>
            {transactions.map(t => (
              <div key={t.name} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0", borderBottom: "0.5px solid rgba(0,0,0,0.08)" }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: "#f4f4f0", display: "flex", alignItems: "center", justifyContent: "center", marginRight: 10, fontSize: 14 }}>{t.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 500 }}>{t.name}</div>
                  <div style={{ fontSize: 12, color: "#888" }}>{t.date}</div>
                </div>
                <span style={{ fontSize: 13, fontWeight: 500, color: t.pos ? "#16a34a" : "#dc2626" }}>{t.amount}</span>
              </div>
            ))}
          </div>
          <div style={{ background: "#fff", border: "0.5px solid rgba(0,0,0,0.1)", borderRadius: 12, padding: "1rem 1.25rem" }}>
            <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 4 }}>Revenue by product</div>
            <div style={{ fontSize: 12, color: "#888", marginBottom: "1rem" }}>This month</div>
            <div style={{ position: "relative", height: 180 }}><BarChart /></div>
          </div>
        </div>

      </div>
    </>
  );
}