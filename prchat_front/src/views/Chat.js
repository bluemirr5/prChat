import React from "react";
import { useLocation } from "react-router-dom";

const Chat = () => {
  const location = useLocation()
  return (
    <>
      <div>
        My Id: {location.state.id}<br />
        ==== {location.state.room} =====
      </div>
      This page is Chat
    </>
  );
};
export default Chat;
