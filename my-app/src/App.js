import { Routes, Route } from "react-router-dom";
import Menu from "./components/Menu/Menu";
import RechercheReservation from "./components/Reservation/RechercheReservation";

function App() {
  return (
    <>
      {/* Menu global */}
      <Menu />

      {/* Définition des routes */}
      <Routes>
        <Route path="/" element={<RechercheReservation />} />
      </Routes>
    </>
  );
}

export default App;

