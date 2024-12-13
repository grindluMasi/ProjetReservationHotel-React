import { Component } from "react";
import axios from "axios";
import withAuthentication from "../login/withAuthentication";
import withNavigation from "../menu/withNavigation";

class Chambre extends Component {
    constructor(props) {
        super(props);
        this.state = {
          chambre: {
            numero_chambre :  "",
            type_chambre :  "" 
          },
          numero: "",
          errorMessage: ""
        };
        this.getChambre = this.getChambre.bind(this);
        this.setResponseData = this.setResponseData.bind(this);
    }

    render() {
        
        return (
         <>
            <h2>Types de Chambre</h2>
            <label htmlFor="numero">Numéro chambre : </label>
            <input type="text" id="numero" value={this.state.numero} onChange={ e => this.onChangeInputNumero(e.target.value) } />
            <button onClick={this.getChambre}>Rechercher</button>
            <p> Numéro de la chambre: {this.state.chambre.numero_chambre} <br></br> 
                Type de chambre: {this.state.chambre.type_chambre}
            </p>
            {this.state.errorMessage && <p style={{ color: "#FFEB3B" }}>{this.state.errorMessage}</p>}
         </>
        );
    }

    getChambre() 
    {
        axios({
            method: "GET",
            url: `http://127.0.0.1:8000/chambre?CHA_roomNumber=${this.state.numero}`,
        })
        .then(
            this.setResponseData
          )
        .catch((error) => {
            console.error(error);
            if (error.status === 422) {
                this.setState({
                    errorMessage: "Veuillez entrer un nombre valide.",
                });
            }

            if (error.status === 401) {
                localStorage.removeItem("AUTH_TOKEN");
                console.log("Déconnecté.");
                this.props.navigate("/login");
            }
        })  
    }

    onChangeInputNumero(data) {
        this.setState({
          numero : data
        });
      }

    setResponseData(response) {
        if (response.data.Erreur) {
            this.setState({
                errorMessage: response.data.Erreur,
            }); 
        } else {
                this.setState({
                    chambre: response.data,
                    errorMessage: "",
                })
            };
    }
}

export default withNavigation(withAuthentication(Chambre));