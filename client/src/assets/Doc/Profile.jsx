import '../../styles/User/Profile.css'
import { useState,useEffect} from 'react';
import { server_URL } from '../../var'

function Profile(){
    const [name,setName]=useState("");
    const [email, setEmail] = useState('');
    const [phone,setPhone]=useState('');
    const [speciality,setSpeciality]=useState('');
    const [id, setid] =useState('');
  
    useEffect(() => {
        const fetchDoctor = async () => {
            try {
              const response = await fetch(`${server_URL}`, {
                  method: 'GET',
                  credentials: 'include',
              });
              const result = await response.json();
              const doctor = result.user;
              setid(doctor._id);
            } 
            catch (err) {
              console.error(err);
            }
        };
        fetchDoctor();
        }, []);


        const handleSave = async (event) => {
            event.preventDefault();
            const DoctorData = {id,name,email,phone,speciality};
        
            const response = await fetch(`${server_URL}profile/doc`, {
              method: 'POST',
              credentials: 'include',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(DoctorData),
            });
            const data = await response.json();
        
            if (data.success) {
              console.log(data.message);
              setName('')
              setEmail('');
              setPhone('')
              setSpeciality('')
              
            }
            else{
              console.error('Error', data.error);
              setMessage('try again!');
            }
          };
          
    return (
        <div className="profile">
            <input type="text" placeholder='Name' value={name} onChange={(event)=>{setName(event.target.value)}}/>
            <input type="email" placeholder='Email' value={email} onChange={(event)=>{setEmail(event.target.value)}}/>
            <input type="phone" placeholder='phone' value={phone} onChange= {(event)=>setPhone(event.target.value)}/>
            <input type="text" placeholder='Speciality' value={speciality} onChange={(event)=>setSpeciality(event.target.value)}/>
            <button onClick={handleSave}>Save</button>
        </div>
    )
}
export default Profile;