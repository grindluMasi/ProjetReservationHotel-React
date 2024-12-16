import RechercheReservation from "./components/reservation/RechercheReservation";
import CreerReservation from "./components/reservation/CreerReservation.js";
import Client from "./components/client/Client";
import Admin from "./components/admin/Admin";
import CreerTypeChambre from "./components/admin/CreerTypeChambre.js";
import CreerChambre from "./components/admin/CreerChambre.js";
import Menu from "./components/menu/Menu";
import Chambre from "./components/chambre/Chambre";
import RechercherChambreLibre from "./components/chambre/RechercherChambreLibre.js";
import Login from "./components/login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Menu />} >
          <Route path="/login" index element={<Login />} />
          <Route path="/rechercherReservation" element={<RechercheReservation />} />
          <Route path="/creerReservation" element={<CreerReservation />} />
          <Route path="/chambre" element={<Chambre />} />
          <Route path="/RechercherChambreLibre" element={<RechercherChambreLibre/>} />
          <Route path="/CreerTypeChambre" element={<CreerTypeChambre />} />
          <Route path="/CreerChambre" element={<CreerChambre />} />
          <Route path="/client" element={<Client />} />
          <Route path="/admin" element={<Admin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;