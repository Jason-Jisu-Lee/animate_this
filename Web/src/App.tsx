import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { HomePage } from "./pages/HomePage";
import { IntentSelectionPage } from "./pages/IntentSelectionPage";
import { PatternGalleryPage } from "./pages/PatternGalleryPage";
import { PatternDetailPage } from "./pages/PatternDetailPage";
import { LibraryPage } from "./pages/LibraryPage";
import { FavoritesPage } from "./pages/FavoritesPage";
import { AboutPage } from "./pages/AboutPage";
import { ContactPage } from "./pages/ContactPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { TermsPage } from "./pages/TermsPage";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/flow/intent" element={<IntentSelectionPage />} />
          <Route
            path="/flow/patterns/:intentId"
            element={<PatternGalleryPage />}
          />
          <Route path="/pattern/:patternId" element={<PatternDetailPage />} />
          <Route path="/library" element={<LibraryPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Footer />
        <Toaster theme="dark" position="bottom-right" />
      </div>
    </BrowserRouter>
  );
}

export default App;
