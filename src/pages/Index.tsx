
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, TrendingUp, BookOpen, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CategoryCard from "@/components/CategoryCard";
import ArticleCard from "@/components/ArticleCard";
import TypingEffect from "@/components/TypingEffect";
import { categories } from "@/data/categories";
import { getFeaturedArticles } from "@/data/articles";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const featuredArticles = getFeaturedArticles();

  const typingPhrases = [
    "Your Microsoft 365 Admin Companion...",
    "Expert Guidance at Your Fingertips...",
    "Simplifying M365 Administration...",
    "Your Trusted Knowledge Base..."
  ];

  const popularSearches = [
    "Exchange Online permissions",
    "Teams policies", 
    "Intune compliance",
    "Azure AD MFA",
    "SharePoint sharing",
    "Security alerts"
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handlePopularSearch = (search: string) => {
    navigate(`/search?q=${encodeURIComponent(search)}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section with recommended animations */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-20 relative overflow-hidden">
        {/* Subtle background motion */}
        <div className="absolute inset-0 bg-gradient-to-r from-ms-blue/20 to-transparent opacity-60 animate-pulse"></div>
        <div className="absolute top-10 left-10 w-20 h-20 bg-ms-blue/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-purple-500/10 rounded-full blur-xl animate-pulse"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          {/* Fade-in on load - Title */}
          <h1 className="text-4xl md:text-6xl font-bold mb-6 opacity-0 animate-fade-in">
            Microsoft 365 Knowledge Base
          </h1>
          
          {/* Typing effect for tagline */}
          <div className="text-xl md:text-2xl mb-8 text-slate-200 max-w-3xl mx-auto h-16 flex items-center justify-center opacity-0 animate-fade-in-delayed">
            <TypingEffect phrases={typingPhrases} />
          </div>
          
          {/* Slide-in search bar */}
          <div className="max-w-2xl mx-auto mb-8 opacity-0 animate-slide-in-bottom">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search for articles, guides, and solutions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-4 text-lg bg-white text-gray-900 border-0 rounded-lg shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-[1.02] focus:scale-[1.02]"
              />
              <Button 
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-ms-blue hover:bg-ms-blue-dark transition-all duration-200 hover:scale-105"
              >
                Search
              </Button>
            </form>
          </div>

          {/* Popular searches */}
          <div className="flex flex-wrap justify-center gap-2 opacity-0 animate-fade-in-delayed-2">
            <span className="text-slate-300 mr-2">Popular searches:</span>
            {popularSearches.map((search, index) => (
              <button
                key={index}
                className="text-slate-300 hover:text-white underline text-sm transition-colors duration-200"
                onClick={() => handlePopularSearch(search)}
              >
                {search}
                {index < popularSearches.length - 1 && <span className="ml-2">•</span>}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center opacity-0 animate-fade-in-delayed">
              <div className="flex items-center justify-center w-16 h-16 bg-ms-blue-light rounded-full mx-auto mb-4 transition-transform duration-200 hover:scale-110">
                <BookOpen className="w-8 h-8 text-ms-blue" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">60+</h3>
              <p className="text-gray-600">Expert Articles</p>
            </div>
            <div className="text-center opacity-0 animate-fade-in-delayed-2">
              <div className="flex items-center justify-center w-16 h-16 bg-ms-blue-light rounded-full mx-auto mb-4 transition-transform duration-200 hover:scale-110">
                <Users className="w-8 h-8 text-ms-blue" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">1000+</h3>
              <p className="text-gray-600">Community Members</p>
            </div>
            <div className="text-center opacity-0 animate-fade-in-delayed-3">
              <div className="flex items-center justify-center w-16 h-16 bg-ms-blue-light rounded-full mx-auto mb-4 transition-transform duration-200 hover:scale-110">
                <TrendingUp className="w-8 h-8 text-ms-blue" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">98%</h3>
              <p className="text-gray-600">Solution Success Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Browse by Category
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Find articles organized by Microsoft 365 services and administrative areas
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <div key={category.id}>
                <CategoryCard category={category} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Articles Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Articles
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Hand-picked articles covering the most important topics for M365 administrators
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredArticles.map((article, index) => (
              <div key={article.id}>
                <ArticleCard article={article} showCategory={true} />
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button asChild size="lg" className="bg-ms-blue hover:bg-ms-blue-dark transition-all duration-200 hover:scale-105">
              <a href="/articles">View All Articles</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-ms-blue-light">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto transition-transform duration-200 hover:scale-[1.02]">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-gray-900">
                Stay Updated
              </CardTitle>
              <CardDescription className="text-lg">
                Get the latest Microsoft 365 tips, guides, and best practices delivered to your inbox
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="flex flex-col sm:flex-row gap-4">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 transition-all duration-200 hover:shadow-md focus:shadow-lg"
                />
                <Button type="submit" className="bg-ms-blue hover:bg-ms-blue-dark transition-all duration-200 hover:scale-105">
                  Subscribe
                </Button>
              </form>
              <p className="text-sm text-gray-500 mt-2 text-center">
                No spam, unsubscribe at any time. We respect your privacy.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
