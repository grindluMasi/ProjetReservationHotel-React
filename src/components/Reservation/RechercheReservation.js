import { Component } from "react";
import ListeReservation from "./ListeReservation";
import axios from "axios";
import withAuthentication from "../login/withAuthentication";

class RechercheReservation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reservations: [],
            nom: "",
            token: null, // State to hold the token
        };
        this.rechercheReservations = this.rechercheReservations.bind(this);
        this.effacerReservations = this.effacerReservations.bind(this);
        this.setResponseData = this.setResponseData.bind(this);
        this.loginAndSetToken = this.loginAndSetToken.bind(this);
    }

    componentDidMount() {
        // Automatically fetch and set the token on component mount
        this.loginAndSetToken();
    }

    render() {
        let listeReservation = undefined;
        if (typeof this.state.reservations !== "undefined") {
            listeReservation = <ListeReservation reservations={this.state.reservations} />;
        }

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
                    onChange={(e) => this.onChangeInputNom(e.target.value)}
                />

                {listeReservation}
            </>
        );
    }

    // Fetch token and set it in state and local storage
    async loginAndSetToken() {
        try {
            // Use URLSearchParams to format data as x-www-form-urlencoded
            const formData = new URLSearchParams();
            formData.append("username", "johndoe"); // Replace with valid username
            formData.append("password", "secret"); // Replace with valid password

            const response = await axios.post("http://127.0.0.1:8000/token", formData, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded", // Proper content type
                },
            });

            const token = response.data.access_token;
            this.setState({ token }); // Save token in state
            localStorage.setItem("token", token); // Save token in local storage
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`; // Set default header
            console.log("Token fetched and set successfully");
        } catch (error) {
            console.error("Failed to fetch token:", error);
        }
    }

    // Search reservations using the backend API
    rechercheReservations() {
        const token = this.state.token || localStorage.getItem("token"); // Use token from state or local storage

        if (!token) {
            console.error("No token available. Please login first.");
            return;
        }

        axios({
            method: "post",
            url: `http://127.0.0.1:8000/rechercherReservation?nom=${this.state.nom}`, // Backend endpoint
            data: {
                prenom: "", // Static placeholder
                nom: this.state.nom, // Dynamic React state
                roomNumber: null,
                idClient: null,
                idReservation: null,
                startDate: null,
                endDate: null,
            },
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`, // Include the token in the request
            },
        })
            .then(this.setResponseData) // Update the state with response data
            .catch((error) => console.error(error));
    }

    onChangeInputNom(data) {
        this.setState({ nom: data });
    }

    setResponseData(response) {
        this.setState({
            reservations: response.data,
            nom: "",
        });
    }

    effacerReservations() {
        this.setState({
            reservations: [],
            nom: "",
        });
    }
}

export default withAuthentication(RechercheReservation);

