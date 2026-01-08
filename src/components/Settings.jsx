function Settings({ theme, setTheme }) {
    

    return (
    <>
        <div className="center">
            <div className="settings-block">
                <div className="column">
                    <div className="settings-div">
                        Ustawienia
                    </div>
                    <div className="theme-box">
                        Motywy
                        <div className="themes">
                            <button className="theme-button dark" onClick={() => setTheme("dark")}></button>
                            <button className="theme-button light" onClick={() => setTheme("light")}></button>
                            <button className="theme-button purple" onClick={() => setTheme("purple")}></button>
                            <button className="theme-button red" onClick={() => setTheme("red")}></button>
                            <button className="theme-button blue" onClick={() => setTheme("blue")}></button>
                            <button className="theme-button green" onClick={() => setTheme("green")}></button>
                            <button className="theme-button orange" onClick={() => setTheme("orange")}></button>
                            <button className="theme-button brown" onClick={() => setTheme("brown")}></button>
                            <button className="theme-button yellow" onClick={() => setTheme("yellow")}></button>
                        </div>
                    </div>
                    <div className="deleteacc-box">
                        <button id="deleteacc-button">Usuń konto</button>
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}

export default Settings