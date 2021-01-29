import React from "react";
import HeaderBar from "./Components/HeaderBar";
import FilterSpace from "./Components/FilterSpace";
import { ThemeProvider } from "@material-ui/styles"
import theme from "./Themes/Theme";

function App() {
  return (
      <ThemeProvider theme={theme}>
          <div className="App">
              <HeaderBar></HeaderBar>
              <FilterSpace></FilterSpace>
          </div>
      </ThemeProvider>
  );
}

export default App;
