import { useNavigate } from "react-router-dom";
import Loading from ".";
import useAuthStore from "../../store/authStore";

function FakeLoading() {
    const { authUser ,setAuthUser } = useAuthStore();
    const navigate = useNavigate();

    const fetchAccountData = async () => {
        try {
          const response = await fetch("http://127.0.0.1:8080/api/v1/user/" + authUser?.getEmail() , {
            method: "GET",
            headers: {
              "Content-Type": "application/json"
            },
            credentials: 'include',
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