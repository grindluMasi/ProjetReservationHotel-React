import { Component } from "react";
import axios from "axios";
import withAuthentication from "../login/withAuthentication";

class CreerTypeChambre extends Component {
    constructor(props) {
        super(props);
        this.state = {
            TYP_maxPrice: "",
            TYP_minPrice: "",
            TYP_description: "",
            TYP_name: "",
            successMessage: "",
            errorMessage: "",
            token: null,
        };

        this.onChangeInput = this.onChangeInput.bind(this);
        this.creerTypeChambre = this.creerTypeChambre.bind(this);
        this.loginAndSetToken = this.loginAndSetToken.bind(this);
    }

    componentDidMount() {
        this.loginAndSetToken();
    }

    render() {
        return (
            <>
                <h2>Créer un Type de Chambre</h2>
                <label htmlFor="TYP_name">Nom :</label>
                <input
                    type="text"
                    id="TYP_name"
                    value={this.state.TYP_name}
                    onChange={(e) => this.onChangeInput("TYP_name", e.target.value)}
                />
                <br />
                <label htmlFor="TYP_minPrice">Prix Minimum :</label>
                <input
                    type="number"
                    id="TYP_minPrice"
                    value={this.state.TYP_minPrice}
                    onChange={(e) => this.onChangeInput("TYP_minPrice", e.target.value)}
                />
                <br />
                <label htmlFor="TYP_maxPrice">Prix Maximum :</label>
                <input
                    type="number"
                    id="TYP_maxPrice"
                    value={this.state.TYP_maxPrice}
                    onChange={(e) => this.onChangeInput("TYP_maxPrice", e.target.value)}
                />
                <br />
                <label htmlFor="TYP_description">Description :</label>
                <textarea
                    id="TYP_description"
                    value={this.state.TYP_description}
                    onChange={(e) => this.onChangeInput("TYP_description", e.target.value)}
                ></textarea>
                <br />
                <button onClick={this.creerTypeChambre}>Créer Type de Chambre</button>
                {this.state.errorMessage && (
                    <p style={{ color: "red" }}>{this.state.errorMessage}</p>
                )}
                {this.state.successMessage && (
                    <p style={{ color: "green" }}>{this.state.successMessage}</p>
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
            console.log("Token fetched and set successfully");
        } catch (error) {
            console.error("Failed to fetch token:", error);
        }
    }

    onChangeInput(field, value) {
        this.setState({ [field]: value });
    }

    creerTypeChambre() {
        const token = this.state.token || localStorage.getItem("AUTH_TOKEN");

        if (!token) {
            this.setState({
                errorMessage: "No token available. Please login first.",
            });
            return;
        }

        const { TYP_maxPrice, TYP_minPrice, TYP_description, TYP_name } = this.state;

        // Validation basique
        if (!TYP_maxPrice || !TYP_minPrice || !TYP_description || !TYP_name) {
            this.setState({ errorMessage: "Tous les champs sont requis." });
            return;
        }

        if (parseFloat(TYP_minPrice) > parseFloat(TYP_maxPrice)) {
            this.setState({
                errorMessage: "Le prix minimum ne peut pas dépasser le prix maximum.",
            });
            return;
        }

        axios({
            method: "post",
            url: "http://127.0.0.1:8000/creerTypeChambre",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            data: {
                TYP_maxPrice: parseFloat(TYP_maxPrice),
                TYP_minPrice: parseFloat(TYP_minPrice),
                TYP_description,
                TYP_name,
            },
        })
            .then((response) => {
                this.setState({
                    successMessage: "Type de chambre créé avec succès !",
                    errorMessage: "",
                    TYP_maxPrice: "",
                    TYP_minPrice: "",
                    TYP_description: "",
                    TYP_name: "",
                });
            })
            .catch((error) => {
                console.error("Erreur :", error);
                this.setState({
                    errorMessage:
                        error.response?.data?.detail || "Une erreur est survenue.",
                    successMessage: "",
                });
            });
    }
}

export default withAuthentication(CreerTypeChambre);

