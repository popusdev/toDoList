import { useState } from "react";
import { useEffect } from "react";

function Tasks({ auth }) {
    const [ newTask, setNewTask ] = useState({ name: "", date: ""})
    const [ tasks, setTasks ] = useState([])
    const [ msg, setMsg ] = useState({ text: "", type: "" })
    const [ loading, setLoading ] = useState(false)

    useEffect(() => {
        if (auth.login && auth.password) {
            loadTasks();
            }
        }, [auth]);

    function handleChange(e) {
    const { name, value } = e.target;
    setNewTask((prev) => ({ ...prev, [name]: value }));
  }

    async function addTask() {
        setMsg({ text: "", type: "" })

        const payload = {
            login: auth.login.trim(),
            password: auth.password.trim(),
            name : newTask.name.trim(),
            date : newTask.date.trim()
        }

        if (!payload.login || !payload.password) {
        setMsg({ text: "Zaloguj się, żeby dodać zadanie.", type: "error" });
        return;
        }

        if (!payload.name || !payload.date) {
        setMsg({ text: "Podaj nazwę oraz datę zadania", type: "error" });
        return;
        }

    setLoading(true)
    try {
        const res = await fetch("https://popusuwu.pythonanywhere.com/api/task/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        const data = await res.json().catch(() => ({}));

        if (!res.ok) {
        const backendError = data?.error
        setMsg({ text: `${backendError} (${res.status})`, type: "error" });
        return;
        }

        setMsg({ text: `Dodano zadanie "${payload.name}"`, type: "success" });
        setNewTask({ name: "", date: ""})
    } catch(err) {
        setMsg({ text: "Bład. Spróbuj ponownie", type: "error"})
    } finally {
        setLoading(false)
    }
    await loadTasks()
    }

    async function loadTasks() {
        setLoading(true)
        setMsg({text: "", type: ""})

        try {
            const res = await fetch(`https://popusuwu.pythonanywhere.com/api/tasks?login=${encodeURIComponent(auth.login)}&password=${encodeURIComponent(auth.password)}`);

            const data = await res.json();

            if(!res.ok) {
                setMsg({text: data.error || "Błąd pobierania tasków.", type: "error"});
                setTasks([]);
                return;
            }

            setTasks(data.tasks || []);
        } catch(err) {
            setMsg({text: "Brak połączenia z API", type: "error"})
        } finally {
            setLoading(false)
        }
    }

    async function deleteTask(index) {
        try {
            const res = await fetch("https://popusuwu.pythonanywhere.com/api/task/delete", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                login: auth.login,
                password: auth.password,
                index: index,
                }),
            });

        const data = await res.json();

        if (!res.ok) {
            setMsg({text: data.error || "Błąd usuwania", type: "error"});
            return;
            }

        loadTasks();
        } catch (err) {
            setMsg({text: "Błąd połączenia z API", type: "error"})
            }
        }

    return (
    <div className="addTaskCenter">
        <div id="error"
            style={{ color: msg.type === "error" ? "red" : "green" }}
          >{msg.text}
          {loading && <div style={{ color: "white" }}>Ładowanie...</div>}
            {!loading && tasks.length === 0 && <div style={{ color: "white" }}>Brak zadań</div>}</div>
        <div className="addTask">
            <div className="box4">
            <div className="box1">
            <label htmlFor="taskName">Nazwa zadania</label>
            <input
            type="text"
            name="name"
            id="taskName"
            value={newTask.name}
            onChange={handleChange}
            />
            </div>
            <div className="box2">
            <label htmlFor="taskDate">Data</label>
            <input
            type="date"
            name="date"
            id="taskDate"
            value={newTask.date}
            onChange={handleChange}
            />
            </div>
            </div>
            <div className="box3">
            <button onClick={addTask} disabled={loading} id="addTaskButton">{loading ? "Dodaję..." : "Dodaj zadanie"}</button>
            </div>
        </div>
        <div className="taskLi">{tasks.map((t, i) => (
            <div className="task" key={i}>
                {t.name} - {t.date} <button id="deleteTaskButton" onClick={() => deleteTask(i)}>Usuń</button>
            </div>
        ))}</div>
    </div>
    )
}

export default Tasks