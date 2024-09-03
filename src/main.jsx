import { createRoot } from "react-dom/client";

import App from "./App.jsx";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";

const colors = {
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
  },
};

const theme = extendTheme({ colors });

import store from "./redux/store";

createRoot(document.getElementById("root")).render(
  <ChakraProvider theme={theme}>
    <Box
      width="100vw"
      minHeight="100vh"
      overflow="auto"
      margin="0px"
      display="flex"
      flexDirection="column"
      justifyContent="flex-start"
      bgGradient="linear(to-r, #009565, #005e7A)"
    >
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </Box>
  </ChakraProvider>
);
