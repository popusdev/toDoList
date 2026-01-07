import { useState } from "react";

function Login({ onLoginSuccess }) {
  const [ form, setForm ] = useState({ login: "", password: "" });
  const [ msg, setMsg ] = useState({ text: "", type: "" });
  const [ loading, setLoading ] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleLogin() {
    setMsg({ text: "", type: "" });

    const payload = {
      login: form.login.trim(),
      password: form.password.trim(),
    };

    if (!payload.login || !payload.password) {
      setMsg({ text: "Podaj login i hasło.", type: "error" });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("https://popusuwu.pythonanywhere.com/api/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        const backendError = data?.error || "Zły login lub hasło! Spróbuj ponownie.";
        setMsg({ text: `${backendError} (${res.status})`, type: "error" });
        return;
      }

      onLoginSuccess(payload.login, payload.password);
      setMsg({ text: `Zalogowano! Witaj ${payload.login}.`, type: "success" });

      setForm({ login: "", password: "" });
    } catch (err) {
      setMsg({ text: "Błąd sieci / serwera. Spróbuj ponownie.", type: "error" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div id="main">
      <div className="center">
        {msg.text && (
          <div
            id="error"
            style={{ color: msg.type === "error" ? "red" : "green" }}
          >
            {msg.text}
          </div>
        )}

        <div className="auth">
          <div className="auth-header">Logowanie</div>

          <label htmlFor="login" id="label-login">
            Imie
          </label>
          <input
            type="text"
            id="login"
            name="login"
            value={form.login}
            onChange={handleChange}
            autoComplete="username"
          />

          <label htmlFor="password" id="label-pass">
            Hasło
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            autoComplete="current-password"
          />

          <button id="commit" onClick={handleLogin} disabled={loading}>
            {loading ? "Loguję..." : "Zaloguj"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
