import React from "react";

import Layout from "../Layout/index.tsx";
import Search from "./Component/index.tsx";

export default function SearchPage() {

    const renderMyComponent = () => <Search />;

    return (
        <Layout renderComponent={renderMyComponent}/>
    );
}