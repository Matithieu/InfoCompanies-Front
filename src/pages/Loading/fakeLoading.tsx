import { useNavigate } from "react-router-dom";
import Loading from ".";
import useAuthStore from "../../store/authStore";
import Cookies from 'js-cookie';

function FakeLoading() {
    const { setAuthUser } = useAuthStore();
    const navigate = useNavigate();

    const fetchAccountData = async () => {
        console.log("COOKIES", Cookies.get("session_id"));
        try {
          const response = await fetch("http://127.0.0.1:8080/user", {
            method: "GET",
            headers: {
              "Content-Type": "application/json"
            },
            body : Cookies.get("session_id")
          });
    
          const data = await response.json();

          if(response.status === 200) {
            console.log("data ", data);
            setAuthUser(data);
            navigate("/dashboard");
          }
        } catch (error) {
          console.log("Error while fetching the account ", error);
        }
      }


    return (
        fetchAccountData(),
        <Loading />
    );
}
export default FakeLoading;