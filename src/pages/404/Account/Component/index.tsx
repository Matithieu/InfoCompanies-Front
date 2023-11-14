import React from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../../utils/axios";

export default function Page404() {
    const navigate = useNavigate();

    const fetchCompanies = async () => {
        try {
            const response = await axiosInstance.get("/Company/423055995");
            console.log(response.data);
        } catch (error) {
            console.error("Error fetching companies", error);
            if (error.response && error.response.status === 401) {
                navigate("/login");
            }
        }
    }

    return (
        <div>
            <h1>404</h1>
            <h2>Page not found</h2>
            <p>Sorry, but the page you are looking for does not exist, have been removed, name changed or is temporarily unavailable</p>
            <button onClick={() => navigate("/login")}>Back to homepage</button>
            <button onClick={fetchCompanies}>Fetch companies</button>
        </div>
    );
}
