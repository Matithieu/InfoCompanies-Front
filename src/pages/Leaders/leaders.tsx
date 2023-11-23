import React from "react";

import Layout from "../Layout/index.tsx";
import LeaderDetails from "./Component/index.tsx";

export default function Leader() {

    const renderMyComponent = () => <LeaderDetails />;

    return (
        <Layout renderComponent={renderMyComponent}/>
    );
}