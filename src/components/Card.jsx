export default function Card({open, img, onClick}){
    return(
        <button className={`card ${open ? 'open' : ''}`} onClick={onClick} aria-label="card">
            <div className="card-inner">
                <div className="card-front">❓</div>
                <div className="card-back">
                    <img src={img} alt="anime character" loading="lazy"/>
                </div>
            </div>
        </button>
    )
}