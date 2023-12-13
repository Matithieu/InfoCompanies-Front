import { useEffect, useState } from "react";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../../../components/Checkout/checkoutForm";

function Payment() {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const publishableKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY;
  const JSON = { clientSecret: "" };
  JSON.clientSecret = import.meta.env.VITE_STRIPE_CLIENT_SECRET;

  useEffect(() => {
    /*fetch("/config").then(async (r) => {
      const { publishableKey } = await r.json();
      setStripePromise(loadStripe(publishableKey));
    });
    */
    setStripePromise(loadStripe(publishableKey));
    console.log(stripePromise);
  }, []);

  useEffect(() => {
    /*fetch("/create-payment-intent", {
      method: "POST",
      body: JSON.stringify({}),
    }).then(async (result) => {
      var { clientSecret } = await result.json();
      setClientSecret(clientSecret);
    });
    */

    const clientSecret = JSON.clientSecret;
    setClientSecret(clientSecret);
  }, []);

  return (
    <>
      <h1>React Stripe and the Payment Element</h1>
      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      )}
    </>
  );
}

export default Payment;