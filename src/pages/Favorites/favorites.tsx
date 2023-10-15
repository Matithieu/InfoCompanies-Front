import React from "react";

import Layout from "../Layout/index.tsx";
import Favorites from './Component/index.tsx';

export default function FavoritesPage() {

    const renderMyComponent = () => <Favorites />;

    return (
        <Layout renderComponent={renderMyComponent}/>
    );
}