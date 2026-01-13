

function Dashboard({ login }){

    return (
    <>
        <div className="columnbetter">
            <h1 className="welcome">
                {`Witaj, ${login}`}
            </h1>
            <div className="dashboardTaskBox">
                
            </div>
        </div>
    </>
    )
}

export default Dashboard