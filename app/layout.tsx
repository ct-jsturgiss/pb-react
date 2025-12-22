import { Grid, Paper, Stack, Typography, type CssBaselineProps } from "@mui/material";
import type { CSSProperties } from "@mui/material/styles";
import type { PropsWithChildren } from "react";

// CSS Styles
const appMenuStack:CSSProperties = {
    borderWidth: "0 0.1rem 0 0",
    borderColor: "#CCC",
    borderStyle: "solid",
    height: "100%",
    borderRadius: 0
}

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
                    <Paper sx={appMenuStack}>
                        
                    </Paper>
                </nav>
                <section className="pb flex-fill">

                </section>
            </section>
        </main>
    );

}