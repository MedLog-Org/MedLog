import "../../styles/User/List_Card.css"
import { useEffect } from "react";
function List({speciality,docId}){
    const URL = "http://localhost:8000/";

    // useEffect(() => {
    //     const fetchSLot = async () => {
    //         try {
    //         const response = await fetch(`${URL}slots`, {
    //             method: 'POST',
    //             credentials: 'include',
    //             body: JSON.stringify({speciality}),
    //         });
    //         const result = await response.json();
    //         console.log(result);

    //         } catch (err) {
    //             console.error(err);
    //         }
    //     };
    //     fetchSLot();
    //     }, []);

    const handleClick = async (slotId) => {
        const response = await fetch(`${URL}doc/bookslot`, {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({slotId,speciality,docId}),
        });
        const data = await response.json();
        console.log(data);
    
        if (data.success) {
          console.log(data.message);
        }
        else{
          console.error('Error', data.error);
        }
    };

    return(
        <div className="list">
            <p>Available Slots</p>
            <button onClick={() => handleClick('1')}>08 - 14</button>
            <button onClick={() => handleClick('2')}>14 - 20</button>
        </div>
    )
}
export default List;