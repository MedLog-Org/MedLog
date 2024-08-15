import "../styles/PopCard.css";

function PopCard({ availableSlots }) {
  console.log("Original availableSlots array:", availableSlots);

  const slotArray = availableSlots.availableSlots;
  const len = Math.min(slotArray.length, 6);
  const firstList = slotArray.slice(0, len);
  const secondList = slotArray.slice(len);

  console.log("firstList:",firstList);
  console.log("secondList:",secondList);

  const URL = "http://localhost:8000/";
  
  const bookslot = async (docId,slotTime) => {
    const response = await fetch(`${URL}appointment/bookslot`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({docId,slotTime}),
    });
    const data = await response.json();
    console.log(data);
  }
  return (
    <div className="popcard">
        <h3>Available Slots</h3>
        
        <ul>
            {firstList.map((slot, index) => (<li key={index} onClick={()=> bookslot(slot.docId,slot.slotTime)}>{slot.slotTime}</li>))}
        </ul>

        {secondList.length > 0 && (<ul>
            {secondList.map((slot, index) => (<li key={index + len} onClick={()=> bookslot(slot.docId)}>{slot.slotTime}</li>))}
            </ul>
        )}
    </div>
  );
}

export default PopCard;
