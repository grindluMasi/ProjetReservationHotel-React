import { Component } from "react";
import axios from "axios";
import withAuthentication from "../login/withAuthentication";
import withNavigation from "../menu/withNavigation";
import './chambre.css';

class RechercherChambreLibre extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chambresLibres: [], // List of available rooms
            errorMessage: "",
            startDate: "", // Start date for search
            endDate: "", // End date for search
        };

        this.getChambresLibres = this.getChambresLibres.bind(this);
        this.setResponseData = this.setResponseData.bind(this);
        this.onChangeInput = this.onChangeInput.bind(this);
    }

    render() {
        return (
            <>
                <h2>Chambres libres</h2>
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
                <button onClick={this.getChambresLibres}>Rechercher</button>
                {this.state.errorMessage && (
                    <p style={{ color: "#FFEB3B" }}>{this.state.errorMessage}</p>
                )}
                <ul>
                    {this.state.chambresLibres.map((chambre, index) => (
                        <li key={index}>
                            <strong>Numéro de Chambre:</strong> {chambre["numéro de chambre"]} <br />
                            <strong>Type:</strong> {chambre["type_chambre"]} <br />
                        </li>
                    ))}
                </ul>
            </>
        );
    }

    onChangeInput(field, value) {
        this.setState({ [field]: value });
    }

    getChambresLibres() {

        const { startDate, endDate } = this.state;
        if (!startDate || !endDate) {
            this.setState({
                errorMessage: "Veuillez entrer une plage horaire valide.",
            });
            return;
        }

        axios({
            method: "POST",
            url: `http://127.0.0.1:8000/rechercherchambrelibre`, // Adjust API endpoint if necessary
            data: {
                startDate: startDate,
                endDate: endDate,
            },
        })
            .then(this.setResponseData)
            .catch((error) => {
                if (error.status === 401) {
                    localStorage.removeItem("AUTH_TOKEN");
                    console.log("Déconnecté.");
                    this.props.navigate("/login");
                }
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
                errorMessage: response.data.Erreur,
            });
        }
    }
}

export default withNavigation(withAuthentication(RechercherChambreLibre));

