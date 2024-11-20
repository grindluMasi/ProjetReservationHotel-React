import { Component } from "react";
import ListeReservation from "./ListeReservation";
import logoChambre from "../../logo/chambreDouble.jpeg";
import logoChambre2 from "../../logo/chambreKing.jpeg";

class RechercheReservation extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.rechercheReservations = this.rechercheReservations.bind(this);
        this.effacerReservations = this.effacerReservations.bind(this);
    }

    render() {
        let listeReservation = undefined;
        if(typeof this.state.reservations !=="undefined") {
            listeReservation = <ListeReservation reservations={this.state.reservations} />
        }

        return (
         <>
            <button onClick={this.rechercheReservations}>Rechercher</button>
            <button onClick={this.effacerReservations}>Effacer</button>
                {listeReservation}
         </>
        );
    }

    rechercheReservations() {
            this.setState({
                reservations: reservations
                }
            );
    }

    effacerReservations() {
        this.setState({
            reservations: []
        });
    }
}

export default RechercheReservation;


/* json mock en attendant que l'on bind le front-end avec le back-end */
const reservations = [{
    du: "15 décembre 2024",
    au: "24 décembre 2024",
    prix: "129.99",
    client: {
      prenom:"Jean",
      nom: "Saisrien",
      adresse: "1234 rue Des Tulipes, Gaspé",
      mobile: "418-123-4567"
    },
    chambre: {
      numero: "14",
      logo: logoChambre
    }
  },
   {
    du: "25 décembre 2024",
    au: "31 décembre 2024",
    prix: "159.99",
    client: {
      prenom:"Paul",
      nom: "Therrien",
      adresse: "6789 rue Des Érables, Matane",
      mobile: "418-456-1234"
    },
    chambre: {
      numero: "324",
      logo: logoChambre2
    }
  }]