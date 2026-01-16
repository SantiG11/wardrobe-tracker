import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import { WardrobeProvider } from "./providers/WardrobeProvider.tsx";
import { WishlistProvider } from "./providers/WishlistProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <WardrobeProvider>
        <WishlistProvider>
          <App />
        </WishlistProvider>
      </WardrobeProvider>
    </BrowserRouter>
  </StrictMode>,
);
