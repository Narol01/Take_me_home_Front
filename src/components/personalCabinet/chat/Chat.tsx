import React from 'react'
import { Link } from "react-router-dom";
import s from "./chat.module.css";


export default function Chat() {
    const chatUsers = [
        { id: 1, username: "Alice" },
        { id: 2, username: "Harry" },
        { id: 3, username: "Una" },
      ];
  return (
    <div className={s.chat}>
      <h2>Chats</h2>
      <ul className={s.chat_list}>
        {chatUsers.map((user) => (
          <li key={user.id} className={s.chat_item}>
            <span>{user.username}</span>
            <Link to={`/chat/${user.id}`} className={s.chat_button}>
            Send a message
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
