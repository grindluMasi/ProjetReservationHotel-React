import { Component } from "react";
import axios from "axios";
import withAuthentication from "../login/withAuthentication";

class RechercherChambreLibre extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chambresLibres: [], // List of available rooms
            errorMessage: "",
            token: null, // Token for authorization
            startDate: "", // Start date for search
            endDate: "", // End date for search
        };

        this.getChambresLibres = this.getChambresLibres.bind(this);
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
                <label htmlFor="startDate">Date de début:</label>
                <input
                    type="date"
                    id="startDate"
                    value={this.state.startDate}
                    onChange={(e) => this.onChangeInput("startDate", e.target.value)}
                />
                <br />
                <label htmlFor="endDate">Date de fin:</label>
                <input
                    type="date"
                    id="endDate"
                    value={this.state.endDate}
                    onChange={(e) => this.onChangeInput("endDate", e.target.value)}
                />
                <br />
                <button onClick={this.getChambresLibres}>Rechercher Chambres Libres</button>
                {this.state.errorMessage && (
                    <p style={{ color: "red" }}>{this.state.errorMessage}</p>
                )}
                <ul>
                    {this.state.chambresLibres.map((chambre, index) => (
                        <li key={index}>
                            <strong>Numéro de Chambre:</strong> {chambre["numéro de chambre"]} <br />
                            <strong>Type:</strong> {chambre["type_chambre"]} <br />
                            <strong>Disponibilité:</strong> {chambre["Disponibilité"] ? "Oui" : "Non"}
                        </li>
                    ))}
                </ul>
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

    getChambresLibres() {
        const token = this.state.token || localStorage.getItem("AUTH_TOKEN"); // Use state or stored token

        if (!token) {
            this.setState({
                errorMessage: "No token available. Please login first.",
            });
            return;
        }

        const { startDate, endDate } = this.state;
        if (!startDate || !endDate) {
            this.setState({
                errorMessage: "Veuillez entrer une plage horaire valide.",
            });
            return;
        }

        axios({
            method: "post",
            url: `http://127.0.0.1:8000/rechercherchambrelibre`, // Adjust API endpoint if necessary
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`, // Include token in the header
            },
            data: {
                startDate: startDate,
                endDate: endDate,
            },
        })
            .then(this.setResponseData)
            .catch((error) => {
                console.error(error);
                this.setState({
                    errorMessage: error.response?.data?.detail || "Authorization failed.",
                });
            });
    }

    setResponseData(response) {
        if (response.data && response.data["Chambres Libres"]) {
            this.setState({
                chambresLibres: response.data["Chambres Libres"],
                errorMessage: "",
            });
        } else {
            this.setState({
                chambresLibres: [],
                errorMessage: response.data || "No data found.",
            });
        }
    }
}

export default withAuthentication(RechercherChambreLibre);

