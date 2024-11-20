import { Component } from "react";
import Reservation from "./Reservation";

class ListeReservation extends Component {

    render() {
        const listeReservation = this.props.reservations.map(
            (reservation) => <Reservation reservation={reservation} />
        );
       
        return (
         <>
            {listeReservation}
         </>
        );
    }
}

export default ListeReservation;