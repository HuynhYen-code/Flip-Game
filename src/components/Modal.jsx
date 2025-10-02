import "../App.css"
export default function Modal({onRestart, move, ref}){
    return(
        <>
            <dialog className="modal" ref={ref}>
                <h2>Chúc mừng bạn đã thắng!</h2>
                <p>
                    Số lượt đi: <strong>{move}</strong>
                </p>
                <form method="dialog">
                    <button onClick={onRestart} className="btn">Chơi lại</button>
                </form>
            </dialog>
        </>
    )
}