import { useState } from "react";

export default function Player({ name, symobol, isActive, onChangeName }) {
  const [isEditing, setIsEditing] = useState(false);
  const [playerName, setPlayerName] = useState(name);
  function handelEditClick() {
    setIsEditing((editing) => !editing);
    if (isEditing) {
      onChangeName(symobol, playerName);
    }
  }
  function handelPlayerName(e) {
    setPlayerName(e.target.value);
  }
  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player ">
        {!isEditing && <span className="player-name">{playerName}</span>}
        {isEditing && (
          <input
            type="text"
            required
            className="player-name"
            value={playerName}
            onChange={handelPlayerName}
          />
        )}
        <span className="player-symbol">{symobol}</span>
      </span>
      <button onClick={handelEditClick}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
}
