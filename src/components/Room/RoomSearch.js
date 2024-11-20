import React, { useState } from "react";
import RoomList from "./RoomList";  // Ensure RoomList is correctly imported
import roomMockData from "../../data/roomMockData";  // Mock data import

const RoomSearch = () => {
  const [rooms, setRooms] = useState([]);

  const fetchRooms = () => {
    setRooms(roomMockData);
    console.log("Rooms fetched:", roomMockData); // Debug
  };

  const clearRooms = () => {
    setRooms([]);
    console.log("Rooms cleared"); // Debug
  };

  console.log("RoomSearch component rendered"); // Debug

  return (
    <div className="room-search">
      <button onClick={fetchRooms}>Rechercher chambre</button>
      <button onClick={clearRooms}>Effacer</button>
      <RoomList rooms={rooms} />
    </div>
  );
};

export default RoomSearch;
