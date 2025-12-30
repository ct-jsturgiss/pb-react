// Mantine UI
import "@mantine/core/styles.css";

// Mantine Datatable
import "mantine-datatable/styles.css"

// App Styles
import "./app.css";

import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import RootLayout from "./layout";
import { ColorSchemeScript, createTheme, MantineProvider, mantineHtmlProps } from "@mantine/core";
import { themeOptions } from './app-theme';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


// App Theme
const theme = createTheme(themeOptions);

// Api/Query Provider
const queryService = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
});

export function meta() {
  return [
    { title: "Production Builder" },
    { name: "description", content: "Caretaker - Production Builder"}
  ];
}

export const links: Route.LinksFunction = () => [
  { rel: "shortcut icon", href: "/favicon256.ico"},
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <ColorSchemeScript />
        <Meta />
        <Links />
      </head>
      <body>
        <QueryClientProvider client={queryService}>
          {children}
        </QueryClientProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {

  return (
    <MantineProvider theme={theme}>
        <RootLayout>
          <Outlet />
      </RootLayout>
    </MantineProvider>
  )
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
