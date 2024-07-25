import '../../styles/User/Record.css'
import Record_Card from "./Record_Card";
function Records(){
    return(
        <div className="Records">
            <div className="row">
                <Record_Card></Record_Card>
                <Record_Card></Record_Card>
            </div>
            <div className="row">
                <Record_Card></Record_Card>
                <Record_Card></Record_Card>
            </div>
            <div className="row">
                <Record_Card></Record_Card>
                <Record_Card></Record_Card>
            </div>
        </div>
    )
}
export default Records;