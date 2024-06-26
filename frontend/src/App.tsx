import React from "react";
import { BrowserRouter } from "react-router-dom";

import Routes from "./routes";
import AppProvider from "./hooks";

const App: React.FC = () => (
  <>
    <AppProvider>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </AppProvider>
  </>
);

export default App;
