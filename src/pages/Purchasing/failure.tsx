import {useNavigate} from "react-router-dom";

function Failure() {
    const queryParams = new URLSearchParams(window.location.search)
    const navigate = useNavigate()
    const onButtonClick = () => {
        navigate("/")
    }

    return (
        <div>
            <h1>Payment failed</h1>
            <p>{queryParams.toString().split("&").join("\n")}</p>
            <button onClick={onButtonClick}>Go back to home page</button>
        </div>
    );
}

export default Failure