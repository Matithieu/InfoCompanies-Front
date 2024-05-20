export type RoutesPath = {
    base: string;
    dashboard: string;
    favorites: string;
    settings: string;
    account: string;
    search: string;
    company: string;
    leader: string;
    subscription: string;
    payment: string;
    failure: string;
    completion: string;
    test: string;
    loading: string;
    errorNotFound: string;
};

export const routesPath: RoutesPath = {
    base: "/ui",
    dashboard: "/ui/dashboard",
    favorites: "/ui/favorites",
    settings: "/ui/settings",
    account: "/ui/account",
    search: "/ui/search",
    company: "/ui/company/",
    leader: "/ui/leader/",
    subscription: "/ui/subscription",
    payment: "/ui/stripe",
    failure: "/ui/failure",
    completion: "/ui/completion",
    test: "/ui/test",
    loading: "/ui/loading",
    errorNotFound: "/ui/error/not-found"
}