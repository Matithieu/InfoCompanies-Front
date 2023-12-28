
import { useEffect } from "react";

function ViewInvoices() {

    useEffect(() => {
        window.location.replace("https://billing.stripe.com/p/login/test_5kAdTiaaNdUNfgQeUU");
    }, []);

    return null;
}

export default ViewInvoices