import React from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { useEffect } from "react";


const ProtectedRoute = () => {
    const navigate = useNavigate();
    const hasAccess = true;

    useEffect(() => {
        if (!hasAccess) {
            navigate("/login");
        }
    }, [hasAccess, navigate]);

    return hasAccess ? (
        <div>
            <Outlet />
        </div>
    ) : null;
}





export default ProtectedRoute;
