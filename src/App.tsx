import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { DemosPage } from './pages/DemosPage';
import { GuidesPage } from './pages/GuidesPage';
import { APIPage } from './pages/APIPage';
import { AboutPage } from './pages/AboutPage';
import { CommunityPage } from './pages/CommunityPage';
import { DiscussionsPage } from './pages/DiscussionsPage';
import { DocsPage } from './pages/DocsPage';
import { PricingPage } from './pages/PricingPage';
import { BlogPage } from './pages/BlogPage';
import { BlogPostPage } from './pages/BlogPostPage';
import { CRMPage } from './pages/CRMPage';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/demos" element={<DemosPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/guides" element={<GuidesPage />} />
              <Route path="/api" element={<APIPage />} />
              <Route path="/docs" element={<DocsPage />} />
              <Route path="/community" element={<CommunityPage />} />
              <Route path="/discussions" element={<DiscussionsPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:id" element={<BlogPostPage />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/crm" element={<CRMPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;