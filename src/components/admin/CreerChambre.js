import React, { Component } from "react";
import axios from "axios";
import withAuthentication from "../login/withAuthentication";
import withNavigation from "../menu/withNavigation";


class CreerChambre extends Component {
    constructor(props) {
        super(props);
        this.state = {
            CHA_roomNumber: "",
            CHA_otherInfo: "",
            Type_chambre: "",
            successMessage: "",
            errorMessage: "",
            List_Type_chambre: [],
        };

        this.onChangeInput = this.onChangeInput.bind(this);
        this.creerChambre = this.creerChambre.bind(this);
        this.listTypCha = this.listTypCha.bind(this);
    }
    
    componentDidMount() {
        this.listTypCha();
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
                        required
                    ></textarea>
                    <br />
                    <label htmlFor="Type_chambre">Type de chambre :</label>
                    <select
                        id="Type_chambre"
                        value={this.state.Type_chambre}
                        onChange={(e) => this.onChangeInput("Type_chambre", e.target.value)}
                        required
                    >
                        <option value="">Sélectionnez un type</option>
                        {this.state.List_Type_chambre.map((type) => (
                            <option 
                                key={type.PKTYP_id} 
                                value={type.PKTYP_id}
                            >
                                {type.TYP_name} : {type.TYP_descriptions}
                            </option>
                        ))}
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

    onChangeInput(field, value) {
        this.setState({ [field]: value });
    }

    listTypCha() {
        axios({
            method: "get",
            url: "http://127.0.0.1:8000/listetypeschambres"
        })
            .then((response) => {
                this.setState({
                    List_Type_chambre : response.data
                })
            })
            .catch((error) => {
                console.error("Erreur :", error);
                if (error.status === 401) {
                    localStorage.removeItem("AUTH_TOKEN");
                    console.log("Déconnecté.");
                    this.props.navigate("/login");
                }
            });   
    }

    creerChambre(event) {
        event.preventDefault(); // Prevent page reload

        const { CHA_roomNumber, CHA_otherInfo, Type_chambre } = this.state;

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
            data: {
                CHA_roomNumber: parseInt(CHA_roomNumber, 10),
                CHA_otherInfo: CHA_otherInfo || null,
                Type_chambre: Type_chambre,
            },
        })
            .then((response) => {
                if (response.data.Erreur) {
                    this.setState({
                        errorMessage: response.data.Erreur,
                        successMessage: "",
                    });
                } else {
                    this.setState({
                        successMessage: "Chambre créée avec succès !",
                        errorMessage: "",
                        CHA_roomNumber: "",
                        CHA_otherInfo: "",
                        Type_chambre: "",
                    });
                }
            })
            .catch((error) => {
                console.error("Erreur :", error);
                if (error.status === 401) {
                    localStorage.removeItem("AUTH_TOKEN");
                    console.log("Déconnecté.");
                    this.props.navigate("/login");
                }
                
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

export default withNavigation(withAuthentication(CreerChambre));