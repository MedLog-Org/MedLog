import List_Card from "./List_Card";
import { useEffect, useState } from "react";
import { server_URL } from '../../var'
function List(){
    const [appointments,setAppointments]= useState([]);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`${server_URL}`, {
                    method: 'GET',
                    credentials: 'include',
                });
                const result = await response.json();
                const user = result.user;
                setAppointments(user.appointments);
            } 
            catch (err) {
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