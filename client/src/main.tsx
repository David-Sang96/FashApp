import { NuqsAdapter } from "nuqs/adapters/react-router/v7";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router";
import { ThemeProvider } from "./common/components/ThemeProvider";
import router from "./common/routes/routers";
import { SearchProvider } from "./context/useSearch";
import "./index.css";
import { store } from "./store";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <SearchProvider>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <NuqsAdapter>
            <RouterProvider router={router} />
          </NuqsAdapter>
        </ThemeProvider>
      </SearchProvider>
    </Provider>
  </StrictMode>,
);
