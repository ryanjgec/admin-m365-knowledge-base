
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { AdminAuthProvider } from "@/hooks/useAdminAuth";
import Index from "./pages/Index";
import AuthPage from "./pages/AuthPage";
import CategoryPage from "./pages/CategoryPage";
import ArticlePage from "./pages/ArticlePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import SearchPage from "./pages/SearchPage";
import AllArticlesPage from "./pages/AllArticlesPage";
import NewsPage from "./pages/NewsPage";
import AdminDashboard from "./pages/AdminDashboard";
import AdminSetupPage from "./pages/AdminSetupPage";
import AdminRoute from "./components/AdminRoute";
import NotFound from "./pages/NotFound";
import PrivacyPage from "./pages/PrivacyPage";
import TermsPage from "./pages/TermsPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <AdminAuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/category/:categoryId" element={<CategoryPage />} />
              <Route path="/article/:articleId" element={<ArticlePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/articles" element={<AllArticlesPage />} />
              <Route path="/news" element={<NewsPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/admin-setup" element={<AdminSetupPage />} />
              <Route path="/admin" element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              } />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AdminAuthProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
