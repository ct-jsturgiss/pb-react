import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("iv-lookup", "routes/iv-lookup/iv-lookup.page.tsx")
] satisfies RouteConfig;
