import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'sonner'
import { Header } from './components/Header'
import { HomePage } from './pages/HomePage'
import { PatternGalleryPage } from './pages/PatternGalleryPage'
import { PatternDetailPage } from './pages/PatternDetailPage'
import { LibraryPage } from './pages/LibraryPage'
import { FavoritesPage } from './pages/FavoritesPage'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/flow/patterns/:intentId" element={<PatternGalleryPage />} />
          <Route path="/pattern/:patternId" element={<PatternDetailPage />} />
          <Route path="/library" element={<LibraryPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
        </Routes>
        <Toaster theme="dark" position="bottom-right" />
      </div>
    </BrowserRouter>
  )
}

export default App