import React from "react";
import Dashboard from './Component/index.tsx';
import Home from "../Layout/index.tsx";

export default function DashboardPage() {

    const renderMyComponent = () => <Dashboard />;

    return (
        <Home renderComponent={renderMyComponent}/>
    );
}
