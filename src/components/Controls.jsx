import {useRef, useState} from 'react'
import React from 'react';
import "./controls.css"
export default function Controls({moves, level, setLevel, onRestart, showLevel = true}) {
  const playerName = useRef()
  const [enteredPlayerName, setEnteredPlayerName] = useState(null);
  return (
    <header role="banner" aria-label="Điều khiển trò chơi">
      <h1 className='game-title'>Lật thẻ GHIBLI</h1>
      <h2 className="player-greet">Xin chào <strong>{enteredPlayerName ? enteredPlayerName : "No name"}!</strong></h2>
      <label>
        <input placeholder='Nhập vào tên...' type="text" ref={playerName}/>
        <button className='btn' onClick={() => setEnteredPlayerName(playerName.current.value)}>Nhập tên</button>
      </label>
  
      <div className='control' role="region" aria-label="Bảng điều khiển">
        <h3>Lượt: {moves}</h3>

      <div className='right-control'>
          {showLevel && (
            <label >
              <span >Level</span>
              <select
                value={level}
                onChange={(e) => setLevel(Number(e.target.value))}
                aria-label="Chọn level chơi"
              >
                <option value={6}>Dễ (6 cặp)</option>
                <option value={8}>Trung bình (8 cặp)</option>
                <option value={10}>Khó (10 cặp)</option>
                <option value={12}>Siêu khó (12 cặp)</option>
              </select>
            </label>
          )}
  
            <button className="btn" onClick={onRestart} aria-label="Chơi lại">
            Chơi lại
            </button>
        </div>
      </div>
    </header>
  );
}