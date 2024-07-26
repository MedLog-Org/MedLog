import '../../styles/User/List_Card.css'
function Card(){
    return (
        <div className="user-appointment">
            <img src="/BlueSkull.png" alt="" />
            <div className="doc-data">
                <p>Name: Sumit Kumar</p>
                <p>Email: sumit.bio21@iitg.ac.in</p>
                <p>Sex: Male</p>
                <p>Slot Time: 4:00 - 4:15 PM</p>
                <p>Isuue: Tooth Ache</p>
            </div>
        </div>
    )
}
export default Card;