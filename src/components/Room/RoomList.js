import React from "react";
import RoomCard from "./RoomCard";

const RoomList = ({ rooms }) => {
  return (
    <div className="room-list">
      {rooms.map((room, index) => (
        <RoomCard key={index} room={room} />
      ))}
    </div>
  );
};

export default RoomList;
