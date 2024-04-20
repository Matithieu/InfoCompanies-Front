import { useEffect } from "react";

function ViewInvoices() {
  // Alert the user that they are being redirected to the Stripe billing page
  useEffect(() => {
    alert("Redirecting to Stripe billing page...");
    window.location.replace(
      "https://billing.stripe.com/p/login/test_5kAdTiaaNdUNfgQeUU"
    );
  }, []);

  return null;
}

export default ViewInvoices;
