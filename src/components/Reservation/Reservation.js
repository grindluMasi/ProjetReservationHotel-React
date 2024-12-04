import { Component, createRef } from "react";

class Reservation extends Component {
    constructor(props) {
        super(props);
        this.refClient = createRef();
        this.refChambre = createRef();
        this.toggleInformationVisibility = this.toggleInformationVisibility.bind(this);
    }

    /*  {
    "idReservation": "d75a8bad-894d-4b25-bf2d-cf1bae30be81",
    "dateDebut": "2012-06-18T10:34:09",
    "dateFin": "2012-06-18T10:34:09",
    "prixParJour": 135,
    "infoReservation": "info réservation",
    "chambre": {
        "idChambre": "f114e204-d07a-4852-8b69-001108f92955",
        "numero_chambre": 280,
        "disponible_reservation": true,
        "autre_informations": null,
        "type_chambre": {
            "nom_type": "queen",
            "prix_plafond": 279,
            "prix_plancher": 159,
            "description_chambre": "Chambre avec un seul lit queen"
        }
    }
} */

    render() {
       return <>
                <h4>{this.props.reservation.RES_startDate} au {this.props.reservation.RES_endDate}</h4>
                <p>Id réservation : {this.props.reservation.idReservation}</p>
                <p>{this.props.reservation.RES_pricePerDay}$ par jour</p>
                <div>
                        {/* <button class="button-info" 
                                onClick={() => this.toggleInformationVisibility(this.refClient)}>
                            {this.props.reservation.client.prenom} {this.props.reservation.client.nom}
                        </button>
                        <p ref={this.refClient} hidden={true}>
                            {this.props.reservation.client.adresse}
                            <br></br>
                            {this.props.reservation.client.mobile}
                        </p>
                        <br></br> */}
                        <button className="button-info" 
                                onClick={() => this.toggleInformationVisibility(this.refChambre)}>
                            Chambre {this.props.reservation.roomNumber}
                        </button>
                        <p ref={this.refChambre} hidden={true}>
                            <img src={this.props.reservation.logo} alt=""/>
                        </p>
                </div>
              </>
    }

    toggleInformationVisibility(ref) {
        ref.current.hidden ? ref.current.hidden = false : ref.current.hidden = true;
    }
}

export default Reservation;