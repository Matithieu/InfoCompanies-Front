import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import {
  Button,
  Divider,
  List,
  ListItem,
  ListItemContent,
  Sheet,
  Typography,
} from "@mui/joy";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/authStore";
import { LoadUserFromLocalStorage } from "../../utils/Load/loadUser";

const OrderConfirmation = () => {
  const queryParams = new URLSearchParams(window.location.search);
  const navigate = useNavigate();
  const { authUser, setAuthUser } = useAuthStore();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "20px",
        marginTop: "7rem",
      }}
    >
      <Sheet variant="soft" style={{ padding: "20px", maxWidth: "400px" }}>
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <CheckCircleOutlineIcon
            color="success"
            style={{ fontSize: "60px" }}
          />
          <Typography level="h4" gutterBottom>
            Thank you for your purchase!
          </Typography>
          <Typography level="body-md" gutterBottom>
            Your order has been successfully processed. Please check your email
            for order confirmation.
          </Typography>
        </div>

        <Divider style={{ marginBottom: "20px" }} />

        <Typography level="h4" gutterBottom>
          Order Details
        </Typography>

        <Typography color="neutral" level="h4">
          {queryParams.toString().split("&").join("\n")}
        </Typography>

        <List>
          <ListItem>
            <ListItemContent>
              <Typography level="h4" gutterBottom>
                Order ID: 123456
              </Typography>
            </ListItemContent>
          </ListItem>
          <ListItem>
            <ListItemContent>
              <Typography level="h4" gutterBottom>
                Total amount: $100
              </Typography>
            </ListItemContent>
          </ListItem>
          <ListItem>
            <ListItemContent>
              <Typography level="h4" gutterBottom>
                Payment method: Credit Card
              </Typography>
            </ListItemContent>
          </ListItem>
        </List>
        <Button
          variant="soft"
          color="primary"
          fullWidth
          style={{ marginTop: "20px" }}
          onClick={() => {
            const user = LoadUserFromLocalStorage("authUser");
            if (user) {
              user.setVerified(true);
              setAuthUser(user); // Clear the authenticated user
            }
            console.log("test " + authUser);
            setTimeout(() => {
              navigate("/dashboard");
            }, 500);
          }}
        >
          Let's go !
        </Button>
      </Sheet>
    </div>
  );
};

export default OrderConfirmation;
