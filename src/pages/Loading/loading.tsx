import React from "react";

import Layout from "../Layout/index.tsx";
import Loading from "./Component/index.tsx";

export default function LoadingPage() {

    const renderMyComponent = () => <Loading />;

    return (
        <Layout renderComponent={renderMyComponent}/>
    );
}