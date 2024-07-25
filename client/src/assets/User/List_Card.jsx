import '../../styles/User/List_Card.css'
function List_Card(){
    return (
        <div className="user-appointment">
            <img src="/doc.png" alt="" />
            <div className="doc-data">
                <p>Name: Dr. Vansh Gupta</p>
                <p>Email: v.vansh@iitg.ac.in</p>
                <p>Phone: 1234567890</p>
                <p>Data: 01/01/2000</p>
                <p>Slot Time: 4:00 - 4:15 PM</p>
                <p>Room Number: G-101</p>
            </div>
        </div>
    )
}
export default List_Card;