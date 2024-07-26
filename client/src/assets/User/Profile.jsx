import '../../styles/User/Profile.css'
function Profile(){
    return (
        <div className="profile">
            <input type="text" placeholder='Name'/>
            <input type="email" placeholder='Email'/>
            <input type="text" placeholder='Sex'/>
            <input type="date" placeholder='Date of Birth'/>
            <input type="text" placeholder='Blood Group'/>
            <button>Save</button>
        </div>
    );
}
export default Profile;