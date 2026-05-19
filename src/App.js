import React, { useState, createContext, useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

/* ---------- Contexts ---------- */
const ThemeContext = createContext();
const AuthContext = createContext();

/* ---------- App ---------- */
function App() {
  const [dark, setDark] = useState(false);
  const [user, setUser] = useState(null);

  return (
    <ThemeContext.Provider value={{ dark, setDark }}>
      <AuthContext.Provider value={{ user, setUser }}>
        <div className={`app-container ${dark ? "dark" : "light"}`}>

          {/* ❌ NO Router HERE (important fix) */}
          <Routes>
            <Route
              path="/"
              element={user ? <Navigate to="/dashboard" /> : <Login />}
            />
            <Route
              path="/signup"
              element={user ? <Navigate to="/dashboard" /> : <Signup />}
            />
            <Route
              path="/dashboard"
              element={user ? <DashboardLayout /> : <Navigate to="/" />}
            />
          </Routes>

        </div>
      </AuthContext.Provider>
    </ThemeContext.Provider>
  );
}

/* ---------- Login ---------- */
function Login() {
  const { setUser } = useContext(AuthContext);
  const { dark, setDark } = useContext(ThemeContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">Techuvo</h1>
        <p className="auth-subtitle">Sign in to your account</p>

        <form
          className="auth-form"
          onSubmit={(e) => {
            e.preventDefault();
            setUser({ email });
          }}
        >
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>

        <p className="auth-link">
          Don't have an account? <a href="/#/signup">Sign Up</a>
        </p>

        <button className="theme-btn" onClick={() => setDark(!dark)}>
          {dark ? "Light Mode" : "Dark Mode"}
        </button>
      </div>
    </div>
  );
}

/* ---------- Signup ---------- */
function Signup() {
  const { setUser } = useContext(AuthContext);
  const { dark, setDark } = useContext(ThemeContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">Create Account</h1>
        <p className="auth-subtitle">Get started with Techuvo</p>

        <form
          className="auth-form"
          onSubmit={(e) => {
            e.preventDefault();
            setUser({ email });
          }}
        >
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Sign Up</button>
        </form>

        <p className="auth-link">
          Already have an account? <a href="/#/"></a>
        </p>

        <button className="theme-btn" onClick={() => setDark(!dark)}>
          {dark ? "Light Mode" : "Dark Mode"}
        </button>
      </div>
    </div>
  );
}

/* ---------- Dashboard Layout ---------- */
function DashboardLayout() {
  const { setUser } = useContext(AuthContext);
  const { dark, setDark } = useContext(ThemeContext);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [section, setSection] = useState("Dashboard");
  const [requests, setRequests] = useState([
    { title: "Website Build", status: "Pending" },
    { title: "AI Automation", status: "Completed" },
  ]);
  const [modal, setModal] = useState(false);

  const addRequest = (title) => {
    setRequests([...requests, { title, status: "Pending" }]);
    setModal(false);
  };

  const menuItems = [
    { name: "Dashboard", icon: "🏠" },
    { name: "Requests", icon: "📦" },
    { name: "AI Tools", icon: "⚡" },
    { name: "Store", icon: "🛒" },
    { name: "Settings", icon: "⚙️" },
  ];

  return (
    <div className="dashboard-layout">
      <aside className={`sidebar ${mobileOpen ? "open" : ""}`}>
        <h2 className="sidebar-logo">Techuvo</h2>

        <div className="sidebar-nav">
          {menuItems.map((item) => (
            <div
              key={item.name}
              className={`sidebar-item ${section === item.name ? "active" : ""}`}
              onClick={() => {
                setSection(item.name);
                setMobileOpen(false);
              }}
            >
              <span className="icon">{item.icon}</span>
              <span>{item.name}</span>
            </div>
          ))}
        </div>

        <div className="sidebar-bottom">
          <button onClick={() => setDark(!dark)}>Theme</button>
          <button onClick={() => setUser(null)}>Logout</button>
        </div>
      </aside>

      <main className="main-content">
        <button className="mobile-menu-btn" onClick={() => setMobileOpen(!mobileOpen)}>
          ☰
        </button>

        {section === "Dashboard" && (
          <DashboardPage requests={requests} setModal={setModal} />
        )}
        {section === "Requests" && <RequestsPage requests={requests} />}
        {section === "AI Tools" && <AIToolsPage />}
        {section === "Store" && <StorePage />}
        {section === "Settings" && <SettingsPage dark={dark} setDark={setDark} />}

        {modal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3>Add Request</h3>
              <button onClick={() => addRequest("Website Build")}>Website</button>
              <button onClick={() => addRequest("Automation")}>Automation</button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

/* ---------- Pages ---------- */

function DashboardPage({ requests, setModal }) {
  return (
    <>
      <h1 className="title">Dashboard</h1>
      <div className="dashboard-metrics">
        <div className="metric-card">
          <div className="metric-number">{requests.length}</div>
          <div>Total Requests</div>
        </div>
        <div className="metric-card">
          <div className="metric-number">
            {requests.filter((r) => r.status === "Completed").length}
          </div>
          <div>Completed</div>
        </div>
        <div className="metric-card">
          <div className="metric-number">
            {requests.filter((r) => r.status === "Pending").length}
          </div>
          <div>Active</div>
        </div>
      </div>

      <div className="grid">
        <div className="action-card" onClick={() => setModal(true)}>
          ⚡ Request AI Automation
        </div>
        <div className="action-card" onClick={() => setModal(true)}>
          📦 Request Website
        </div>
      </div>
    </>
  );
}

function RequestsPage({ requests }) {
  return (
    <>
      <h1 className="title">Requests</h1>
      {requests.map((r, i) => (
        <div className="request-item" key={i}>
          <span>{r.title}</span>
          <span
            className={`request-status ${
              r.status === "Pending" ? "status-pending" : "status-completed"
            }`}
          >
            {r.status}
          </span>
        </div>
      ))}
    </>
  );
}

function AIToolsPage() {
  return (
    <>
      <h1 className="title">AI Tools</h1>
      <div className="card">Coming Soon</div>
    </>
  );
}

function StorePage() {
  return (
    <>
      <h1 className="title">Store</h1>
      <div className="card">Plans Coming Soon</div>
    </>
  );
}

function SettingsPage({ dark, setDark }) {
  return (
    <>
      <h1 className="title">Settings</h1>
      <div className="card">
        <button onClick={() => setDark(!dark)}>Toggle Theme</button>
      </div>
    </>
  );
}

export default App;