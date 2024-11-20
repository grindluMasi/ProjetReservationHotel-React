import RechercheReservation from "./components/Reservation/RechercheReservation";
import RoomSearch from "./components/Room/RoomSearch";  

function App() {
  return (
    <>
      <div className="App">
        <h1>Room Reservation System</h1>
        <RoomSearch />
      </div>

      <div className="Recherche">
        <RechercheReservation />
      </div>
    </>
  );
}

export default App;
