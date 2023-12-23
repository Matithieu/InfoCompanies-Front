import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe, Stripe } from "@stripe/stripe-js"; // Import the Stripe type

import CheckoutForm from "../../components/Checkout/checkoutForm.tsx";
import { Grid, Paper, Typography } from "@mui/material";
import Loading from "../Loading/index.tsx";
import useAuthStore from "../../store/authStore.tsx";

const Payment = () => {
  const { authUser } = useAuthStore();

  const [stripePromise, setStripePromise] = useState<Promise<Stripe | null>>(Promise.resolve(null));
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(true); // New loading state

  /**
   * Check if the user is verified when the component is mounted 
   * and redirect to the previous page if the user is verified
   */
  useEffect(() => {
    if (authUser) {
      if (authUser.getVerified()) {
        window.history.back(); 
      } else {
        setLoading(false); // Set loading to false if user is not verified
      }
    }
  }, [authUser]);

  useEffect(() => {
    fetch("http://localhost:8080/config").then(async (r) => {
      const { publishableKey } = await r.json();
      console.log("fetch de publishableKey");
      setStripePromise(loadStripe(publishableKey));
    });
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: authUser?.getEmail(),      
      }),
    }).then(async (result) => {
      // eslint-disable-next-line no-var
      var { clientSecret } = await result.json();
      console.log("fetch de clientSecret");
      console.log(clientSecret);
      setClientSecret(clientSecret);
    });
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <Paper elevation={3} style={{ padding: 16 }}>
          <Typography variant="h5">Happy Customer's Feedback</Typography>
          <Typography>
            "I'm thrilled with the product! The checkout process was smooth, secure, and efficient. A great experience overall."
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper elevation={3} style={{ padding: 16 }}>
          <Typography variant="h5">Secure Checkout</Typography>
          {clientSecret && stripePromise ? (
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <CheckoutForm />
            </Elements>
          ) : (
            <Loading /> // Display the Loading component when clientSecret and stripePromise are not ready
          )}
        </Paper>
      </Grid>
    </Grid>
  );
}

export default Payment;