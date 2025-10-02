import { useRef, useEffect } from 'react';

export default function useSounds({ click = '/sounds/click.mp3', match = '/sounds/match.mp3', wrong = '/sounds/wrong.mp3', win = '/sounds/win.mp3', volume = 0.6 } = {}) {
  const clickRef = useRef(null);
  const matchRef = useRef(null);
  const wrongRef = useRef(null);
  const winRef = useRef(null);

  useEffect(() => {
    clickRef.current = new Audio(click);
    matchRef.current = new Audio(match);
    wrongRef.current = new Audio(wrong);
    winRef.current = new Audio(win);
    [clickRef, matchRef, wrongRef, winRef].forEach(r => {
      if (r.current) {
        r.current.preload = 'auto';
        r.current.volume = volume;
      }
    });

    return () => {
      [clickRef, matchRef, wrongRef, winRef].forEach(r => {
        if (r.current) {
          r.current.pause();
          r.current.src = '';
          r.current = null;
        }
      });
    };
  }, [click, match, wrong, win, volume]);

  const play = (ref) => {
    try {
      if (!ref?.current) return;
      ref.current.currentTime = 0;
      void ref.current.play();
    } catch (e) { /* ignore play failures (autoplay policy) */ }
  };

  return {
    playClick: () => play(clickRef),
    playMatch: () => play(matchRef),
    playWrong: () => play(wrongRef),
    playWin: () => play(winRef)
  };
}