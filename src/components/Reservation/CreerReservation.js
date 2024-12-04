import React, { Component } from "react";
import axios from "axios";
import withAuthentication from "../login/withAuthentication";

class CreerReservation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nomClient: "",
            roomNumber: "",
            startDate: "",
            endDate: "",
            pricePerDay: "",
            infoReservation: "",
            successMessage: "",
            errorMessage: "",
            token: null, // Token for authorization
        };

        this.createReservation = this.createReservation.bind(this);
        this.setResponseData = this.setResponseData.bind(this);
        this.loginAndSetToken = this.loginAndSetToken.bind(this);
        this.onChangeInput = this.onChangeInput.bind(this);
    }

    componentDidMount() {
        this.loginAndSetToken(); // Fetch and set token on component mount
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

    async loginAndSetToken() {
        try {
            const formData = new URLSearchParams();
            formData.append("username", "johndoe"); // Replace with valid credentials
            formData.append("password", "secret");

            const response = await axios.post("http://127.0.0.1:8000/token", formData, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            });

            const token = response.data.access_token;
            this.setState({ token }); // Save token in state
            localStorage.setItem("AUTH_TOKEN", token); // Save token in local storage
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`; // Set default header
            console.log("Token fetched and set successfully");
        } catch (error) {
            console.error("Failed to fetch token:", error);
        }
    }

    onChangeInput(field, value) {
        this.setState({ [field]: value });
    }

    createReservation() {
        const token = this.state.token || localStorage.getItem("AUTH_TOKEN");

        if (!token) {
            this.setState({
                errorMessage: "No token available. Please login first.",
            });
            return;
        }

        const { nomClient, roomNumber, startDate, endDate, pricePerDay, infoReservation } = this.state;

        axios({
            method: "post",
            url: `http://127.0.0.1:8000/creerreservation?CLI_nom=${nomClient}&CHA_roomNumber=${roomNumber}`, // Pass CLI_nom and CHA_roomNumber as query params
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            data: {
                RES_startDate: startDate,
                RES_endDate: endDate,
                RES_pricePerDay: parseFloat(pricePerDay),
                RES_infoReservation: infoReservation || null,
            },
        })
            .then(this.setResponseData)
            .catch((error) => {
                console.error(error);
                this.setState({
                    errorMessage: error.response?.data?.detail || "Une erreur est survenue lors de la création.",
                    successMessage: "",
                });
            });
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
                errorMessage: "Failed to create the reservation.",
            });
        }
    }
}

export default withAuthentication(CreerReservation);
