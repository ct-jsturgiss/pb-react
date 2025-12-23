import { Paper, Typography } from "@mui/material";
import type { PropsWithChildren } from "react";
import AppMainMenu from "./core/main-menu/main-menu";
import { Link, Outlet } from "react-router";

export default function RootLayout(props:PropsWithChildren) {

    return (
        <main className="pb d-flex flex-column">
            <header className="pb app-bar d-flex flex-row">
                <div className="pb app-bar-img">
                    <img src="assets/png/caretaker-tree-white.png" alt="caretaker-logo-no-words"/>
                </div>
                <div className="pb app-bar-title">
                    <Typography><Link className="color-white" to="/">PRODUCTION BUILDER</Link></Typography>
                </div>
            </header>
            <section className="pb d-flex flex-row flex-fill">
                <nav className="pb app-menu">
                    <Paper>
                        <AppMainMenu/>
                    </Paper>
                </nav>
                <section className="pb flex-fill">
                    <Outlet/>
                </section>
            </section>
        </main>
    );

}