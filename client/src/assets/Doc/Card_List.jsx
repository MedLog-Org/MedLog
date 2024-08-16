import "../../styles/User/List_Card.css"
import { useEffect,useState } from "react";
import { server_URL } from '../../var'

function List({speciality,docId}){
    const [slotId,setSlotId] = useState([]);
    useEffect(() => {
        const fetchSLot = async () => {
            try {
            const response = await fetch(`${server_URL}slots/doc`, {
              method: 'POST',
              credentials: 'include',
              headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({speciality}),
            });
            const result = await response.json();
  
            setSlotId(s=>[...s,result.slotIds]);
  
            } catch (err) {
                console.error(err);
            }
        };
        fetchSLot();
        }, []);

    const handleClick = async (slotId) => {
        const response = await fetch(`${server_URL}slots/doc/bookslot`, {
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
            {slotId.length==2 ? null : <p>No Available Slots</p>}
            {slotId?.includes("1") ? null : <button onClick={() => handleClick('1')}>08 - 14</button>}
            {slotId?.includes("2") ? null : <button onClick={() => handleClick('2')}>14 - 20</button>}
        </div>
    )
}
export default List;