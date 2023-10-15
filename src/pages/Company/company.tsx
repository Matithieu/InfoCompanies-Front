import React from "react";

import Layout from "../Layout/index.tsx";
import Company from "./Component/index.tsx";

export default function CompanyPage() {

    const renderMyComponent = () => <Company />;

    return (
        <Layout renderComponent={renderMyComponent}/>
    );
}
