import { Component } from "react";
import axios from "axios";
import withAuthentication from "../login/withAuthentication";

class Chambre extends Component {
    constructor(props) {
        super(props);
        this.state = {
          chambre: {
            numero_chambre :  "",
            type_chambre :  ""
            
          },
          numero: ""
        };
        this.getChambre = this.getChambre.bind(this);
        this.setResponseData = this.setResponseData.bind(this);
    }

    render() {
        
        return (
         <>
            <button onClick={this.getChambre}>Rechercher</button>
            <label htmlFor="numero">Numéro chambre : </label>
            <input type="text" id="numero" value={this.state.numero} onChange={ e => this.onChangeInputNumero(e.target.value) } />
            <p> Numéro de la chambre: {this.state.chambre.numero_chambre} <br></br> 
                Type de chambre: {this.state.chambre.type_chambre}
            </p>
         </>
        );
    }
/* 
    {
        "idChambre": "f114e204-d07a-4852-8b69-001108f92955",
        "numero_chambre": 280,
        "disponible_reservation": true,
        "autre_informations": null,
        "type_chambre": {
            "nom_type": "queen",
            "prix_plafond": 279.0,
            "prix_plancher": 159.0,
            "description_chambre": "Chambre avec un seul lit queen"
        }
    } */

    getChambre() {
        
        axios({
            method: "get",
            url: `http://127.0.0.1:8000/chambre?CHA_roomNumber=${this.state.numero}`,
        })
        .then(
            this.setResponseData
          )
        .catch(
            console.log
          );    
    }

    onChangeInputNumero(data) {
        this.setState({
          numero : data
        });
      }

    setResponseData(response) {
        this.setState({
            chambre: response.data,
        });
    }
}

export default withAuthentication(Chambre);