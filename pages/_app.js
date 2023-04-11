import { AppContext } from "@/components/UseContext";
import "@/styles/bootstrap.scss";
import "@/styles/globals.scss";
import { ThemeProvider } from "next-themes";
import { useEffect, useState } from "react";
// import Font Awesome CSS
// import Font Awesome CSS
import "@fortawesome/fontawesome-svg-core/styles.css"; 

import { config } from "@fortawesome/fontawesome-svg-core";
// Tell Font Awesome to skip adding the CSS automatically 
// since it's already imported above
config.autoAddCss = false; 

const App = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

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
