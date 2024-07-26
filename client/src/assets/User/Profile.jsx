import { useState } from 'react';
import '../../styles/User/Profile.css';

function Profile({ onSave }) {
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [sex, setSex] = useState('');
  const [dob, setDob] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');

  
  const handleSave = () => {
    const updatedProfile = {
      name,
      email,
      sex,
      dob,
      bloodGroup
    };
    onSave(updatedProfile);
  };

  return (
    <div className="profile">
      <input 
        type="text" 
        placeholder="Name" 
        value={name} 
        onChange={(event) => setName(event.target.value)} 
      />
      <input 
        type="email" 
        placeholder="Email" 
        value={email} 
        onChange={(event) => setEmail(event.target.value)} 
      />
      <select 
        value={sex} 
        onChange={(e) => setSex(e.target.value)}
      >
        <option value="" disabled>Select Sex</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Others">Others</option>
      </select>
      <input 
        type="date" 
        placeholder="Date of Birth" 
        value={dob} 
        onChange={(event) => setDob(event.target.value)} 
      />
      <input 
        type="text" 
        placeholder="Blood Group" 
        value={bloodGroup} 
        onChange={(event) => setBloodGroup(event.target.value)} 
      />
      <button onClick={handleSave}>Save</button>
    </div>
  );
}

export default Profile;
