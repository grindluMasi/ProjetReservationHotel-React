import React, { Component } from "react";
import axios from "axios";
import withAuthentication from "../login/withAuthentication";

class CreerChambre extends Component {
    constructor(props) {
        super(props);
        this.state = {
            CHA_roomNumber: "",
            CHA_otherInfo: "",
            CHA_availability: true,
            Type_chambre: "",
            successMessage: "",
            errorMessage: "",
            token: null,
        };

        this.onChangeInput = this.onChangeInput.bind(this);
        this.creerChambre = this.creerChambre.bind(this);
        this.loginAndSetToken = this.loginAndSetToken.bind(this);
    }

    componentDidMount() {
        this.loginAndSetToken();
    }

    render() {
        return (
            <>
                <h2>Créer une Chambre</h2>
                <form onSubmit={this.creerChambre}>
                    <label htmlFor="CHA_roomNumber">Numéro de chambre :</label>
                    <input
                        type="number"
                        id="CHA_roomNumber"
                        value={this.state.CHA_roomNumber}
                        onChange={(e) => this.onChangeInput("CHA_roomNumber", e.target.value)}
                        required
                    />
                    <br />
                    <label htmlFor="CHA_otherInfo">Autres informations :</label>
                    <textarea
                        id="CHA_otherInfo"
                        value={this.state.CHA_otherInfo}
                        onChange={(e) => this.onChangeInput("CHA_otherInfo", e.target.value)}
                    ></textarea>
                    <br />
                    <label htmlFor="CHA_availability">Disponibilité :</label>
                    <select
                        id="CHA_availability"
                        value={this.state.CHA_availability}
                        onChange={(e) => this.onChangeInput("CHA_availability", e.target.value === "true")}
                    >
                        <option value="true">Disponible</option>
                        <option value="false">Indisponible</option>
                    </select>
                    <br />
                    <label htmlFor="Type_chambre">Type de chambre :</label>
                    <select
                        id="Type_chambre"
                        value={this.state.Type_chambre}
                        onChange={(e) => this.onChangeInput("Type_chambre", e.target.value)}
                        required
                    >
                        <option value="">Sélectionnez un type</option>
                        <option value="single">Simple</option>
                        <option value="double">Double</option>
                        <option value="suite">Suite</option>
                    </select>
                    <br />
                    <button type="submit">Créer Chambre</button>
                </form>
                {this.state.successMessage && (
                    <p style={{ color: "green" }}>{this.state.successMessage}</p>
                )}
                {this.state.errorMessage && (
                    <p style={{ color: "red" }}>{this.state.errorMessage}</p>
                )}
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
            this.setState({ token });
            localStorage.setItem("AUTH_TOKEN", token);
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            console.log("Token récupéré avec succès");
        } catch (error) {
            console.error("Erreur lors de la récupération du token :", error);
        }
    }

    onChangeInput(field, value) {
        this.setState({ [field]: value });
    }

    creerChambre(event) {
        event.preventDefault(); // Prevent page reload
        const token = this.state.token || localStorage.getItem("AUTH_TOKEN");

        if (!token) {
            this.setState({
                errorMessage: "Aucun token disponible. Veuillez vous connecter.",
            });
            return;
        }

        const { CHA_roomNumber, CHA_otherInfo, CHA_availability, Type_chambre } = this.state;

        // Basic validation
        if (!CHA_roomNumber || !Type_chambre) {
            this.setState({
                errorMessage: "Le numéro de chambre et le type de chambre sont requis.",
            });
            return;
        }

        axios({
            method: "post",
            url: "http://127.0.0.1:8000/creerchambre",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            data: {
                CHA_roomNumber: parseInt(CHA_roomNumber, 10),
                CHA_otherInfo: CHA_otherInfo || null,
                CHA_availability: Boolean(CHA_availability),
                Type_chambre: Type_chambre,
            },
        })
            .then((response) => {
                this.setState({
                    successMessage: "Chambre créée avec succès !",
                    errorMessage: "",
                    CHA_roomNumber: "",
                    CHA_otherInfo: "",
                    CHA_availability: true,
                    Type_chambre: "",
                });
            })
            .catch((error) => {
                console.error("Erreur :", error);

                // Safely set errorMessage to a string
                const errorDetail =
                    error.response?.data?.detail
                        ? typeof error.response.data.detail === "string"
                            ? error.response.data.detail
                            : JSON.stringify(error.response.data.detail)
                        : "Une erreur est survenue.";

                this.setState({
                    errorMessage: errorDetail,
                    successMessage: "",
                });
            });
    }
}

export default withAuthentication(CreerChambre);

