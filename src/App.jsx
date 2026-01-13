import { useEffect } from 'react'
import { useState } from 'react'
import './App.css'
import Login from './components/Login'
import Register from './components/Register'
import Settings from './components/Settings'
import Tasks from './components/Tasks'
import Dashboard from './components/Dashboard'

function App() {
  const [ page, setPage ] = useState("login")
  const [ login, setLogin] = useState("")
  const [ auth, setAuth ] = useState({ login: "", password: "" })
  const [ theme, setTheme ] = useState("light")

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme])

  useEffect(() => {
    if (auth.login && auth.password) {
      setPage("dashboard");
    }
  }, [auth.login, auth.password]);

  const handleLogout = () => {
    setLogin("")
    setAuth({ login: "", password: "" });
    setPage("login")
    setTheme("light")
  }

  return (
    <>
    <div className='auth-navbar row'>
      {login && (<><div className='login-div' onClick={() => setPage("dashboard")}>Dashboard</div></>)}
      {login && (<><div className='login-div' onClick={() => setPage("tasks")}>Zadania</div></>)}
      {!login && (<><div className='login-div' onClick={() => setPage("login")}>Logowanie</div></>)}
      {!login && (<><div className='login-div' onClick={() => setPage("register")}>Rejestracja</div></>)}
      <div className='custom-select'>
      <select className='login-div' value="" onChange={(e) => {
        if (e.target.value === "settings") setPage("settings");
        if (e.target.value === "logout") handleLogout();
        if (e.target.value === "goLogin") setPage("login")
      }}>
        <option value="" disabled hidden>{login ? `Witaj, ${login}` : "Gość"}</option>
        {login ? (
          <>
            <option value="settings">Ustawienia</option>
            <option value="logout">Wyloguj</option>
          </>
        ) : (
          <option value="goLogin">Przejdź do logowania</option>
        )}
      </select>
      </div>
    </div>

    {page === "dashboard" && <Dashboard login={login}/>}
    {page === "tasks" && <Tasks auth={auth}/>}
    {page === "register" && <Register/>}
    {page === "login" && <Login onLoginSuccess={(login, password) => {
      setLogin(login);
      setAuth({ login, password });
    }} />}
    {page === "settings" && <Settings theme={theme} setTheme={setTheme}/>}
    </>
  )
}

export default App
