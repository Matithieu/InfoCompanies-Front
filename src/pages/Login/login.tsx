import React from "react";

import Layout from "../Layout/index.tsx";
import LoginPageComponent from "./Component/index.tsx";

export default function LoginPage() {

    const renderMyComponent = () => <LoginPageComponent />;

    return (
        <Layout renderComponent={renderMyComponent}/>
    );
}