import { ItemData } from "./Stripe/itemData";

export const Products: ItemData[] = [
    {
        description: "Simple subscription at 30€/month. Limited retrieval of data.",
        image: "https://source.unsplash.com/NUoPWImmjCU",
        name: "Abonnement de base à 30€/mois",
        price: 30,
        id: "basic"
    },
    {
        description: "Augmented subscription at 50€/month. Filters added but limited retrieval of data.",
        image: "https://source.unsplash.com/NUoPWImmjCU",
        name: "Premium subscription",
        price: 50,
        id: "premium"
    },
    {
        description: "Full subscription at 100€/month. Full retrieval of data. No limitations.",
        image: "https://source.unsplash.com/NUoPWImmjCU",
        name: "Enterprise subscription",
        price: 100,
        id: "enterprise"
    },
]