import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from 'react-hot-toast';
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import App from "./App";
import { persister, store } from "./app/store";
import './index.css';
import theme from "./theme";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persister}>
        <ChakraProvider theme={theme}>
          <App />
          <Toaster />
        </ChakraProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
