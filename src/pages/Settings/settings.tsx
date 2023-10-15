import React from "react";

import Layout from "../Layout/index.tsx";
import Settings from './Component/index.tsx';

export default function FavoritesPage() {

    const renderMyComponent = () => <Settings />;

    return (
        <Layout renderComponent={renderMyComponent}/>
    );
}