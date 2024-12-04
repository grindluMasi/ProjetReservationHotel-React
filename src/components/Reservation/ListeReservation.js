import { Component } from "react";
import Reservation from "./Reservation";
import logoChambre from "../../logo/chambreDouble.jpeg";

class ListeReservation extends Component {

    render() {
        const reservationsLogo = this.props.reservations.map(
            (reservation) => {return {
                ...reservation,
                logo : logoChambre
            }    
        });

        const listeReservation = reservationsLogo.map(
            (objet, i) => 
                <Reservation key={i} reservation={objet}  />
        );
       
        return (
         <>
            {listeReservation}
         </>
        );
    }
}

export default ListeReservation;