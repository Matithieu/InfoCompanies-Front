import { useNavigate } from "react-router-dom";

export default function Landing() {
    const navigate = useNavigate();
    return (
        <div>
            <h1>Landing</h1>
            <div style={{margin: "10px"}}>
                <button style={{marginRight: "10px"}} onClick={() => navigate("/login")}>Go to Login</button>
                <button onClick={() => navigate("/dashboard")}>Go to Dashboard</button>
            </div>
        </div >
    );
}
