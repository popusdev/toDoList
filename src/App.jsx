import { useState } from 'react'
import './App.css'
import Login from './components/Login'
import Register from './components/Register'
import Settings from './components/Settings'
import Tasks from './components/Tasks'

function App() {
  const [ page, setPage ] = useState("login")
  const [ login, setLogin] = useState("")
  const [ auth, setAuth ] = useState({ login: "", password: "" })

  const handleLogout = () => {
    setLogin("")
    setPage("main")
  }

  return (
    <>
    <div className='auth-navbar row'>
      {login && (<><div className='login-div' onClick={() => setPage("tasks")}>Zadania</div></>)}
      <div className='login-div' onClick={() => setPage("login")}>Logowanie</div>
      <div className='login-div' onClick={() => setPage("register")}>Rejestracja</div>
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

    {page === "tasks" && <Tasks auth={auth}/>}
    {page === "main" && <Main/>}
    {page === "register" && <Register/>}
    {page === "login" && <Login onLoginSuccess={(login, password) => {
      setLogin(login);
      setAuth({ login, password });
    }} />}
    {page === "settings" && <Settings/>}
    </>
  )
}

export default App
