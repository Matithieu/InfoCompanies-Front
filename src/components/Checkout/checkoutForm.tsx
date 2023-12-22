import { AddressElement, PaymentElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import useAuthStore from "../../store/authStore";
import "./style.css";

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const { authUser } = useAuthStore();

  const [message, setMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!stripe || !elements || !authUser) {
      console.log("Stripe.js and the user has not yet loaded.");
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsProcessing(true);
    console.log("Processing payment");

    // TODO: Add more fields to the payment_method_data object
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${window.location.origin}/completion`,
        payment_method_data: {
          billing_details: {
            address: {
              line1: authUser?.getAddress(),
              city: authUser?.getCity(),
              state: "France",
              //state: authUser?.getState(),
              //postal_code: authUser?.get(),
            },
            name: authUser?.getName(),
            email: authUser?.getEmail(),
            phone: authUser?.getPhone(),
          },
        },
      },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message || "");
    } else {
      setMessage("An unexpected error occured.");
    }

    setIsProcessing(false);
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <h3>Shipping</h3>
      <AddressElement options={{ mode: 'shipping', allowedCountries: ['FR'] }} />
      <PaymentElement id="payment-element" />

      <button disabled={isProcessing || !stripe || !elements} id="submit">
        <span id="button-text">
          {isProcessing ? "Processing ... " : "Pay now"}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}

export default CheckoutForm;