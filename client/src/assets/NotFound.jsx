import { Link } from 'react-router-dom';
import "../styles/NotFound.css"
function NotFound(){
    return(
        <div className="error">
            <h1>Page Not Found 404</h1>
            <Link to="/">Back to Home</Link>
        </div>
    )
}
export default NotFound;