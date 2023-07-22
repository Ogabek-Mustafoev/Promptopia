import { Nav, Provider } from "@components";
import "@styles/globals.css";
import Head from "next/head";

export const metadata = {
  title: "Promptopia",
  description: "discover & Share AI Prompts",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" type="image/svg+xml" href="./assets/images/logo.svg" />
      </Head>
      <body>
        <Provider>
          <div className="main">
            <div className="gradient" />
          </div>
          <main className="app">
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
}
