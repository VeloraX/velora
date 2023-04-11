import { AppContext } from "@/components/UseContext";
import "@/styles/bootstrap.scss";
import "@/styles/globals.scss";
import { ThemeProvider } from "next-themes";
import { useEffect, useState } from "react";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
import "@fortawesome/fontawesome-free/css/all.css";


export default function VeloraApp({ Component, pageProps }) {
  const [searchOpen, setSearchOpen] = useState("");

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
  }, []);

  return (
    <AppContext.Provider
      value={{
        toggleSearch: [searchOpen, setSearchOpen],
      }}
    >
      <ThemeProvider defaultTheme="light" attribute="class">
        <Component {...pageProps} />
      </ThemeProvider>
    </AppContext.Provider>
  );
}
