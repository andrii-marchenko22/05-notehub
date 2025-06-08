import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "modern-normalize/modern-normalize.css";
import App from "./components/App/App";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <StrictMode>
      <App />
    </StrictMode>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);
