import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router";
import { PersistGate } from "redux-persist/integration/react";
import { ThemeProvider } from "./common/components/ThemeProvider";
import router from "./common/routes/routers";
import { SearchProvider } from "./context/useSearch";
import "./index.css";
import { persistor, store } from "./store";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <SearchProvider>
          <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <RouterProvider router={router} />
          </ThemeProvider>
        </SearchProvider>
      </PersistGate>
    </Provider>
  </StrictMode>,
);
