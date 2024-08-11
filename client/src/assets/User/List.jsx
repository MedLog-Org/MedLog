import List_Card from "./List_Card";
import { useEffect, useState } from "react";
function List(){
    const [appointments,setAppointments]= useState([]);
    const URL = "http://localhost:8000/";
    useEffect(() => {
        const fetchUser = async () => {
            try {
            const response = await fetch(`${URL}`, {
                method: 'GET',
                credentials: 'include',
            });
            const result = await response.json();
            const user = result.user;
            console.log(user.appointments);
            setAppointments(user.appointments);
            console.log(appointments);

            } catch (err) {
            console.error(err);
            }
        };
        fetchUser();
    }, []);
    return (
        <div className="List">
          {appointments.map((appointment, index) => (
            <List_Card key={index} appointment={appointment} />
          ))}
        </div>
    );
      
}
export default List;