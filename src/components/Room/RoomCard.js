import React from "react";

const RoomCard = ({ room }) => {
  return (
    <div className="room-card">
      <h3>Room {room.number}</h3>
      <p>Type: {room.type}</p>
      <p>{room.info}</p>
      <p>
        Availability: {room.available ? "Available" : "Not Available"}
      </p>
    </div>
  );
};

export default RoomCard;
