import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Navigate, useLocation, useParams } from "react-router-dom";
import ScrollToBottom from "react-scroll-to-bottom";
import Rooms from "./Components/Rooms";

function Chat({ socket, username }) {
  let params = useParams();
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [currentRoom, setCurrentRoom] = useState(params.chatId);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      console.log(username)
      const messageData = {
        room: params.chatId,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  useEffect(() => {
    console.log("chat ID ===>", params.chatId)
    if (params.chatId) {
      socket.emit("join_room", params.chatId);
    }
  }, [params.chatId])
  return (
    <>
    {username ? <div className="chat-container">
      <Rooms username={username} />
    <div className="chat-window">
      <div className="chat-header">
        <p>{params.chatId ? `Room: ${params.chatId}`: 'Please select a room to chat'}</p>
      </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {messageList.map((messageContent) => {
            return (
              <>
              {messageContent.room === params.chatId && <div
                className="message"
                id={username === messageContent.author ? "you" : "other"}
              >
                <div>
                  <div className="message-content">
                    <p>{messageContent.message}</p>
                  </div>
                  <div className="message-meta">
                    <p id="time">{messageContent.time}</p>
                    <p id="author">{messageContent.author}</p>
                  </div>
                </div>
              </div>}
              </>
            );
          })}
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={currentMessage}
          placeholder="Hey..."
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyPress={(event) => {
            event.key === "Enter" && sendMessage();
          }}
        />
        <Button variant="text" onClick={sendMessage}>send</Button>
      </div>
    </div>
    </div> : <Navigate to='/login' />}
    </>
  );
}

export default Chat;
