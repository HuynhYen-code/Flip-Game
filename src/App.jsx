import {useState, useEffect, useRef } from 'react'
import { animeCharacters } from './data/anime';
import { shuffle } from './utils/shuffle';
import useSound from './hooks/useSound';
import Boards from "./components/Boards"
import Controls from "./components/Controls"
import Modal from './components/Modal';
import './App.css'

function App() {
  const { _, playMatch, playWrong, playWin } = useSound({ volume: 1 });
  const dialog = useRef();
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState(new Set());
  const [moves, setMoves] = useState(0);
  const [lock, setLock] = useState(false);
  const [level, setLevel] = useState(3);

  useEffect(() => { initGame(); }, [level]);

  const initGame = () => {
    const shuffledList = shuffle(animeCharacters)
    const base = shuffledList.slice(0, level).map((c, i) => ({ id: i, ...c }));
    const doubled = [
      ...base,
      ...base.map((c, i) => ({ id: i + base.length, type: c.type, img: c.img }))
    ];
    setCards(shuffle(doubled))
    setFlipped([]);
    // setFlipped(doubled.map((_, i) => i));
    setMatched(new Set());
    setMoves(0);
  }

  const onFlip = (idx) => {
    if (lock) return;
    const card = cards[idx];
    if (flipped.includes(idx) || matched.has(card.type)) return;
    // playClick();
    const next = [...flipped, idx];
    setFlipped(next);

    if (next.length === 2) {
      setLock(true);
      setMoves(m => m + 1);
      const [a, b] = next.map(i => cards[i]);
      if (a.type === b.type) {
        playMatch();
        setMatched(prev => new Set(prev).add(a.type));
        setTimeout(() => { setFlipped([]); setLock(false); }, 300);
      } else {
        playWrong();
        setTimeout(() => { setFlipped([]); setLock(false); }, 900);
      }
    }
  };



  const isWin = matched.size === level;
  function checkWin(){
    if(isWin){
       dialog.current.showModal();
       playWin()
    }
    
  }
  return (
    <div className="app">
      <Modal ref={dialog} move={moves} onRestart={initGame}>
      </Modal>
      <Controls 
        moves={moves}
        level={level}
        setLevel={setLevel}
        onRestart={initGame}
      ></Controls>

      <Boards cards={cards} flipped={flipped} matched={matched} onFlip={onFlip}></Boards>
      {checkWin()}
      

    </div>
  )
}

export default App
