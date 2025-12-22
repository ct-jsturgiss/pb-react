import { Paper, Typography } from "@mui/material";
import type { PropsWithChildren } from "react";
import AppMenu from "./core/main-menu/main-menu";

export default function RootLayout(props:PropsWithChildren) {

    return (
        <main className="pb d-flex flex-column">
            <header className="pb app-bar d-flex flex-row">
                <div className="pb app-bar-img">
                    <img src="assets/png/caretaker-tree-white.png" alt="caretaker-logo-no-words"/>
                </div>
                <div className="pb app-bar-title color-white">
                    <Typography>PRODUCTION BUILDER</Typography>
                </div>
            </header>
            <section className="pb d-flex flex-row flex-fill">
                <nav className="pb app-menu">
                    <Paper>
                        <AppMenu/>
                    </Paper>
                </nav>
                <section className="pb flex-fill">

                </section>
            </section>
        </main>
    );

}