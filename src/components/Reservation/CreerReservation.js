import React, { Component } from "react";
import axios from "axios";
import withAuthentication from "../login/withAuthentication";
import { v4 as uuidv4 } from "uuid";
import withNavigation from "../menu/withNavigation";

class CreerReservation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nomClient: "",
            prenomClient: "",
            courrielClient: "",
            roomNumber: "",
            startDate: "",
            endDate: "",
            pricePerDay: "",
            infoReservation: "",
            successMessage: "",
            errorMessage: "",
        };

        this.createReservation = this.createReservation.bind(this);
        this.setResponseData = this.setResponseData.bind(this);
        this.onChangeInput = this.onChangeInput.bind(this);  
    }

    render() {
        return (
            <>
                <h2>Créer une Réservation</h2>
                <form onSubmit={(e) => { e.preventDefault(); this.createReservation(); }}>
                    <label htmlFor="nomClient">Nom du Client:</label>
                    <input
                        type="text"
                        id="nomClient"
                        value={this.state.nomClient}
                        onChange={(e) => this.onChangeInput("nomClient", e.target.value)}
                        required
                    />
                    <br />
                    <label htmlFor="prenomClient">Prénom du Client:</label>
                    <input
                        type="text"
                        id="prenomClient"
                        value={this.state.prenomClient}
                        onChange={(e) => this.onChangeInput("prenomClient", e.target.value)}
                        required
                    />
                    <br />
                    <label htmlFor="courrielClient">Adresse courriel du Client:</label>
                    <input
                        type="email"
                        id="courrielClient"
                        value={this.state.courrielClient}
                        onChange={(e) => this.onChangeInput("courrielClient", e.target.value)}
                        required
                    />
                    <br />
                    <label htmlFor="roomNumber">Numéro de Chambre:</label>
                    <input
                        type="number"
                        id="roomNumber"
                        value={this.state.roomNumber}
                        onChange={(e) => this.onChangeInput("roomNumber", e.target.value)}
                        required
                    />
                    <br />
                    <label htmlFor="startDate">Date de Début:</label>
                    <input
                        type="date"
                        id="startDate"
                        value={this.state.startDate}
                        onChange={(e) => this.onChangeInput("startDate", e.target.value)}
                        required
                    />
                    <br />
                    <label htmlFor="endDate">Date de Fin:</label>
                    <input
                        type="date"
                        id="endDate"
                        value={this.state.endDate}
                        onChange={(e) => this.onChangeInput("endDate", e.target.value)}
                        required
                    />
                    <br />
                    <label htmlFor="pricePerDay">Prix par Jour:</label>
                    <input
                        type="number"
                        step="0.01"
                        id="pricePerDay"
                        value={this.state.pricePerDay}
                        onChange={(e) => this.onChangeInput("pricePerDay", e.target.value)}
                        required
                    />
                    <br />
                    <label htmlFor="infoReservation">Informations Réservation:</label>
                    <textarea
                        id="infoReservation"
                        value={this.state.infoReservation}
                        onChange={(e) => this.onChangeInput("infoReservation", e.target.value)}
                    />
                    <br />
                    <button type="submit">Créer</button>
                </form>
                {this.state.successMessage && <p style={{ color: "green" }}>{this.state.successMessage}</p>}
                {this.state.errorMessage && <p style={{ color: "red" }}>{this.state.errorMessage}</p>}
            </>
        );
    }

    onChangeInput(field, value) {
        this.setState({ [field]: value });
    }

    createReservation() {
    
        axios({
            method: "post",
            url: `http://127.0.0.1:8000/creerreservation`,
            params: {
                CLI_nom: this.state.nomClient,
                CHA_roomNumber: this.state.roomNumber,
            },
            
            data: {
                CLI_prenom: this.state.prenomClient,
                CLI_courriel: this.state.courrielClient,
                RES_startDate: this.state.startDate, 
                RES_endDate: this.state.endDate,
                RES_pricePerDay: parseFloat(this.state.pricePerDay),
                RES_infoReservation: this.state.infoReservation,
                idReservation: uuidv4(),// Génération d'un UUID
                roomNumber: parseInt(this.state.roomNumber)
            }
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
    
    setResponseData(response) {
        if (response.data && response.data.Message) {
            this.setState({
                successMessage: response.data.Message,
                errorMessage: "",
            });
        } else {
            this.setState({
                successMessage: "",
                errorMessage: response.data.Erreur,
            });
        }
    }
}

export default withNavigation(withAuthentication(CreerReservation));
