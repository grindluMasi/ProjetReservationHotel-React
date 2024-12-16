import React, { Component } from "react";
import { Outlet, Link, Navigate } from "react-router-dom";
import withNavigation from "./withNavigation";
import './Menu.css';

class Menu extends Component {
    
    render() {
        // Navigate to /login by default
        if (window.location.pathname === "/") {
            return <Navigate to="/login" replace />;
        }
        return (
            <>
                <header className="header">
                    <h1>Outback Hotel Management System</h1>
                    <nav className="nav">
                        <Link to="/chambre">Types de Chambre</Link>
                        <Link to="/RechercherChambreLibre">Chambres Libres</Link>
                        <Link to="/CreerTypeChambre">Créer Type de Chambre</Link>
                        <Link to="/CreerChambre">Créer une Chambre</Link>
                        {/*<Link to="/client">Client</Link>
                        <Link to="/admin">Administration</Link> */}
                        <Link to="/rechercherReservation">Rechercher Réservation</Link>
                        <Link to="/CreerReservation">Créer Réservation</Link>
                        <Link to="/login" onClick={this.logout}>Déconnexion</Link>
                    </nav>
                </header>
                <main className="main-content">
                    <Outlet />
                </main>
                <footer className="footer">
                    <p>&copy; 2024 Outback Hotel Management. Tous droits réservés.</p>
                </footer>
            </>
        );
    }

    logout = () => {
        localStorage.removeItem("AUTH_TOKEN");
        console.log("Déconnecté.");
        this.props.navigate("/login");
    };
}

export default withNavigation(Menu);
