import { Component } from "react";
import { Outlet, Link } from "react-router-dom";
import withNavigation from "./withNavigation";
import './Menu.css';

class Menu extends Component {
    render() {
        return (
         <>
            <Link to="/chambre">Afficher les types de chambre</Link>
            <br></br><br></br>
            <Link to="/RechercherChambreLibre">Rechercher les chambres Libres</Link>
            <br></br><br></br>
            <Link to="/CreerTypeChambre">Créer un type de chambre</Link>
            <br></br><br></br>
            <Link to="/CreerChambre">Créer une chambre</Link>
            <br></br><br></br>
            <Link to="/client">Client</Link>
            <br></br><br></br>
            <Link to="/admin">Administration</Link>
            <br></br><br></br>
            <Link to="/rechercherReservation">Rechercher une réservations</Link>
            <br></br><br></br>
            <Link to="/CreerReservation">Créer une réservation</Link>
            <br></br><br></br>
            <Link to="/login">Connexion</Link>
            <br></br><br></br>
            <Link to="/login"onClick={this.logout}>Déconnexion</Link>
            <br></br><br></br>
            <br></br>
            <Outlet />
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