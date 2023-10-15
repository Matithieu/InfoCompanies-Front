import React from "react";

import { useNavigate } from "react-router-dom";

export default function Page404() {
  const navigate = useNavigate();

    return (
        <div>
            <h1>404</h1>
            <h2>Page not found</h2>
            <p>Sorry, but the page you are looking for does not exist, have been removed, name changed or is temporarily unavailable</p>
            <button onClick={() => {
                navigate("/");
            }
            }>Back to homepage</button>
        </div>
    );
}