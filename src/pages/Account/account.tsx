import React from "react";

import Layout from "../Layout/index.tsx";
import Account from './Component/index.tsx';

export default function FavoritesPage() {

    const renderMyComponent = () => <Account />;

    return (
        <Layout renderComponent={renderMyComponent}/>
    );
}