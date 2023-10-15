import React from "react";

import Layout from "../../Layout/index.tsx";
import Page404 from "./Component/index.tsx";

export default function Error404() {

    const renderMyComponent = () => <Page404 />;

    return (
        <Layout renderComponent={renderMyComponent}/>
    );
}