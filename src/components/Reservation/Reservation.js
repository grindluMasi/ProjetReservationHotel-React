import { Component, createRef } from "react";
import withAuthentication from "../login/withAuthentication";

class Reservation extends Component {
    constructor(props) {
        super(props);
        this.refClient = createRef();
        this.refChambre = createRef();
        this.toggleInformationVisibility = this.toggleInformationVisibility.bind(this);
    }

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

export default withAuthentication(Reservation);