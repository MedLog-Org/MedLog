import '../../styles/User/Profile.css'
function Profile(){
    return (
        <div className="profile">
            <input type="text" placeholder='Name'/>
            <input type="email" placeholder='Email'/>
            <input type="phone" placeholder='phone'/>
            <input type="text" placeholder='Speciality'/>
            <button>Save</button>
        </div>
    )
}
export default Profile;