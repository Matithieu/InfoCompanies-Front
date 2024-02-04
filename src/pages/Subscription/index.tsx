import { Button, Card, CardActions, CardContent, Typography } from "@mui/joy";
import React from "react";
import { useNavigate } from "react-router-dom";
import { ItemData } from "../../data/Stripe/itemData";
import { Products } from "../../data/subscription";

function SubscriptionOption(item: ItemData) {
  const navigate = useNavigate();

  return (
    <Card>
      <CardContent>
        <Typography level="h3">{item.name}</Typography>
        <Typography level="h4">{item.price} €</Typography>
        <ul>
          <li>
            <Typography level="body-lg">{item.description}</Typography>
          </li>
        </ul>
      </CardContent>
      <CardActions>
        <Button
          variant="soft"
          color="primary"
          onClick={() => {
            navigate("/stripe", {
              state: { item, endpoint: "/subscriptions/trial" },
            });
          }}
        >
          Subscribe
        </Button>
      </CardActions>
    </Card>
  );
}

const Subscription: React.FC = () => {
  const subscriptions = Products.sort((a, b) => a.price - b.price);
  // Ajoutez d'autres options ici
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        padding: "20px",
      }}
    >
      {subscriptions.map((option, index) => (
        <SubscriptionOption key={index} {...option} />
      ))}
    </div>
  );
};

export default Subscription;
