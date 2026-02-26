import { AnimatePresence } from 'framer-motion';
import { Suspense, lazy, useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Routes, useLocation } from 'react-router-dom';
import { Concierge } from './components/Concierge';
import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';
import { Loader } from './components/ui/Loader';

// Lazy-loaded pages to create separate JS chunks
const Home = lazy(() => import('./pages/Home').then(m => ({ default: m.Home })));
const Admin = lazy(() => import('./pages/Admin').then(m => ({ default: m.Admin })));
const About = lazy(() => import('./pages/About').then(m => ({ default: m.About })));
const CollectionPage = lazy(() => import('./pages/CollectionPage').then(m => ({ default: m.CollectionPage })));
const ProductPage = lazy(() => import('./pages/ProductPage').then(m => ({ default: m.ProductPage })));
const CraftsmanshipPage = lazy(() => import('./pages/CraftsmanshipPage').then(m => ({ default: m.CraftsmanshipPage })));
const Experience = lazy(() => import('./pages/Experience').then(m => ({ default: m.Experience })));
const Contact = lazy(() => import('./pages/Contact').then(m => ({ default: m.Contact })));

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <Router>
      <ScrollToTop />
      <AnimatePresence mode="wait">
            {loading ? (
          <Loader key="loader" onComplete={() => setLoading(false)} />
        ) : (
          <div key="content">
            <Routes>
              {/* Admin Route - No Navbar/Footer/Concierge */}
              <Route path="/admin" element={
                <Suspense fallback={<div className="min-h-screen grid place-items-center">Loading admin...</div>}>
                  <Admin />
                </Suspense>
              } />

              {/* Public Routes */}
              <Route path="*" element={
                <>
                  <Navbar />
                  <main>
                    <Suspense fallback={<div className="min-h-screen grid place-items-center">Loading...</div>}>
                      <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/collection" element={<CollectionPage />} />
                        <Route path="/attar/:id" element={<ProductPage />} />
                        <Route path="/craftsmanship" element={<CraftsmanshipPage />} />
                        <Route path="/experience" element={<Experience />} />
                        <Route path="/contact" element={<Contact />} />
                      </Routes>
                    </Suspense>
                  </main>
                  <Footer />
                  <Concierge />
                </>
              } />
            </Routes>
          </div>
        )}
      </AnimatePresence>
    </Router>
  );
}

export default App;
