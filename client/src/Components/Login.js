import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = ({username, setUsername}) => {
    const navigate = useNavigate();

    const logIn = () => {
        navigate('/chat', { state: { username: username }})
    }
  return (
    <div className="joinChatContainer">
      <h3>Log in to chat</h3>
      <input
        value={username}
        type="text"
        placeholder="Username..."
        onChange={(event) => {
          setUsername(event.target.value);
        }}
      />
      <button onClick={logIn}>Log in</button>
    </div>
  );
};
