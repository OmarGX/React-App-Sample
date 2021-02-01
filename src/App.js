import React, { lazy, Suspense } from "react";
import { ThemeProvider } from "@material-ui/styles"
import theme from "./Themes/Theme";
import HeaderBar from "./Components/HeaderBar";

const FilterSpace = lazy(() => import('./Components/FilterSpace'));

function App() {
  return (
      <ThemeProvider theme={theme}>
          <HeaderBar></HeaderBar>
          <Suspense fallback={<div>loading...</div>}>
          <link rel="preconnect" href="https://gorest.co.in/public-api/products/"/>
          <div className="App">
              <FilterSpace></FilterSpace>
          </div>
          </Suspense>
      </ThemeProvider>
  );
}

export default App;
