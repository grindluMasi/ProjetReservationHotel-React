import { Component } from "react";
import ListeReservation from "./ListeReservation";
import axios from "axios";
import withAuthentication from "../login/withAuthentication";
import withNavigation from "../menu/withNavigation";

class RechercheReservation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reservations: [],
            nom: "",
            prenom: "",
            startDate: "",
            endDate: "",
            roomNumber: "",
            errorMessage: "",
            successMessage: "",
        };
        this.rechercheReservations = this.rechercheReservations.bind(this);
        this.effacerReservations = this.effacerReservations.bind(this);
        this.setResponseData = this.setResponseData.bind(this);
    }

    render() {
        let listeReservation = undefined;
        if (typeof this.state.reservations !== "undefined") {
            listeReservation = <ListeReservation reservations={this.state.reservations} />;
        }

        const messageLines = this.state.successMessage.split("\n");

        return (
            <>
                <button onClick={this.rechercheReservations}>Rechercher</button>
                <button onClick={this.effacerReservations}>Effacer</button>
                <br></br>
                <label htmlFor="nom">Nom:</label>
                <input
                    type="text"
                    id="nom"
                    value={this.state.nom}
                    onChange={(e) => this.onChangeInput("nom", e.target.value)}
                />
                <br></br>   
                <label htmlFor="prenom">Prénom:</label>
                <input
                    type="text"
                    id="prenom"
                    value={this.state.prenom}
                    onChange={(e) => this.onChangeInput("prenom", e.target.value)}
                />
                <br></br> 
                <label htmlFor="startDate">Date de début:</label>
                <input
                    type="date"
                    id="startDate"
                    value={this.state.startDate}
                    onChange={(e) => this.onChangeInput("startDate", e.target.value)}
                />
                <br></br> 
                <label htmlFor="endDate">Date de fin:</label>
                <input
                    type="date"
                    id="endDate"
                    value={this.state.endDate}
                    onChange={(e) => this.onChangeInput("endDate", e.target.value)}
                />
                <br></br>
                {messageLines.map((line, index) => (
                <p style={{color: "green"}} key={index}>{line}</p>
                ))}

                {listeReservation}
                {this.state.errorMessage && <p style={{ color: "red" }}>{this.state.errorMessage}</p>}
            </>
        );
    }

    rechercheReservations() {

        axios({
            method: "post",
            url: "http://127.0.0.1:8000/rechercherReservation",
            data: {
                nom: this.state.nom || null,
                prenom: this.state.prenom || null,
                startDate: this.state.startDate || null,
                endDate: this.state.endDate || null,
                roomNumber: this.state.roomNumber || null,
            },
        })
            .then(this.setResponseData)
            .catch((error) => {
                console.error(error);
                if (error.status === 401) {
                    localStorage.removeItem("AUTH_TOKEN");
                    console.log("Déconnecté.");
                    this.props.navigate("/login");
                }
            })
    }

    onChangeInput(field, value) {
        this.setState({ [field]: value });
    }

    setResponseData(response) {
        if (response.data.Erreur) {
            this.setState({
                errorMessage: response.data.Erreur,
                reservations: [],
                successMessage: "",
            });
        } else {
            let successMessage = "Résultats de la recherche pour les critères suivants:"
            if (this.state.nom !== "") {successMessage += "\nNom: " + this.state.nom}
            if (this.state.prenom!== "") {successMessage += "\nPrénom: " + this.state.prenom}
            if (this.state.startDate!== "") {successMessage += "\nDate de début: " + this.state.startDate}
            if (this.state.endDate!== "") {successMessage += "\nDate de fin: " + this.state.endDate}

            if (this.state.nom === "" && this.state.startDate === "" && this.state.endDate === "") {successMessage = "Lorsqu'aucun critère n'est spécifié, toutes les réservations vous sont présentées."}
            
            this.setState({
            reservations: response.data,
            nom: "",
            prenom: "",
            startDate: "",
            endDate: "",
            roomNumber: "",
            errorMessage: "",
            successMessage: successMessage,
            });
        }
    }

    effacerReservations() {
        this.setState({
            reservations: [],
            nom: "",
            prenom: "",
            startDate: "",
            endDate: "",
            roomNumber: "",
            errorMessage: "",
            successMessage: "",
        });
    }
}

export default withNavigation(withAuthentication(RechercheReservation));