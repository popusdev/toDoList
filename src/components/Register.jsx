import { useState } from "react";

function Register() {
  const [ form, setForm ] = useState({ login: "", password: "" });
  const [ msg, setMsg ] = useState({ text: "", type: "" });
  const [ loading, setLoading ] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleRegister() {
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
      const res = await fetch("https://popusuwu.pythonanywhere.com/api/lead/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        const backendError = data?.error || "Błąd rejestracji.";
        setMsg({ text: `${backendError} (${res.status})`, type: "error" });
        return;
      }

      setMsg({
        text: "Zarejestrowano! Teraz możesz się zalogować.",
        type: "success",
      });

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
          <div className="auth-header">Rejestracja</div>

          <label htmlFor="login-register" id="label-login">
            Podaj imie
          </label>
          <input
            type="text"
            id="login-register"
            name="login"
            value={form.login}
            onChange={handleChange}
            autoComplete="username"
          />

          <label htmlFor="password-register" id="label-pass">
            Podaj hasło
          </label>
          <input
            type="password"
            id="password-register"
            name="password"
            value={form.password}
            onChange={handleChange}
            autoComplete="new-password"
          />

          <button
            id="commit-register"
            onClick={handleRegister}
            disabled={loading}
          >
            {loading ? "Rejestruję..." : "Zarejestruj się"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;
