import Card from './Card';

export default function Board({ cards, flipped, matched, onFlip }) {
  return (
    <div className="grid">
      {cards.map((c, i) => {
        const isOpen = flipped.includes(i) || matched.has(c.type);
        return <Card key={i} open={isOpen} img={c.img} onClick={() => onFlip(i)} />;
      })}
    </div>
  );
}
