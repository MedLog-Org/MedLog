import '../../styles/User/Record_Card.css'
function Record_Card(){
    return(
        <div className="Record">
            <img src="/doc.png" alt="" />
            <p>Date: 01/01/2002</p>
            <p>Name: Dr. Vansh Gupta</p>
            <button>More Details</button>
        </div>
    )
}
export default Record_Card;