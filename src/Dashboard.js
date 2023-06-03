import React from 'react';

const Dashboard = () => {
    return (
        <div style={{ textAlign: "center" }}>
            <h1>Bienvenue dans PharmaMap</h1>
            <img
                src={require("./images/localisationPharma.png")}
                alt="Image du tableau de bord"
                style={{ width: "500px", height: "auto", margin: "0 auto" }}
            />
        </div>
    );
};

export default Dashboard;
