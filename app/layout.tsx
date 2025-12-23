import type { PropsWithChildren } from "react";
import AppMainMenu from "./core/main-menu/main-menu";
import { Link, Outlet } from "react-router";
import { Paper, Text } from "@mantine/core";

export default function RootLayout(props:PropsWithChildren) {

    return (
        <main className="pb d-flex flex-column">
            <header className="pb app-bar d-flex flex-row">
                <div className="pb app-bar-img">
                    <img src="assets/png/caretaker-tree-white.png" alt="caretaker-logo-no-words"/>
                </div>
                <div className="pb app-bar-title">
                    <Text fz={"1.75rem"} fw={500}><Link className="color-white" to="/">PRODUCTION BUILDER</Link></Text>
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