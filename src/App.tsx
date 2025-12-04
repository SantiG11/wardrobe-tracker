import { Navigate, Route, Routes } from "react-router-dom";
import { AppLayout } from "./layout/AppLayout";
import OverviewPage from "./routes/OverviewPage";
import WardrobePage from "./routes/WardrobePage";
import WishlistPage from "./routes/WishListPage";

function App() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<OverviewPage />} />
        <Route path="/wardrobe" element={<WardrobePage />} />
        <Route path="/wishlist" element={<WishlistPage />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppLayout>
  );
}

export default App;
