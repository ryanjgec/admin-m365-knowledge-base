
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, Users, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CategoryCard from "@/components/CategoryCard";
import ArticleCard from "@/components/ArticleCard";
import TypingEffect from "@/components/TypingEffect";
import HideLovableBadge from "@/components/HideLovableBadge";
import { categories } from "@/data/categories";
import { getFeaturedArticles } from "@/data/articles";

const Index = () => {
  const navigate = useNavigate();
  const featuredArticles = getFeaturedArticles();

  const typingPhrases = [
    "Your Microsoft 365 Admin Companion...",
    "Expert Guidance at Your Fingertips...",
    "Simplifying M365 Administration...",
    "Your Trusted Knowledge Base..."
  ];

  // Get total article count from all categories
  const totalArticles = categories.reduce((sum, category) => sum + category.articleCount, 0);

  // Add structured data for articles
  const articleStructuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": featuredArticles.map((article, index) => ({
      "@type": "Article",
      "position": index + 1,
      "name": article.title,
      "description": article.content.substring(0, 150),
      "url": `https://microsoftadmin.lovable.app/article/${article.id}`,
      "author": {
        "@type": "Organization",
        "name": "Microsoft Admin Knowledge Base"
      },
      "datePublished": article.publishedDate,
      "keywords": article.tags.join(", ")
    }))
  };

  return (
    <>
      {/* SEO JSON-LD for articles */}
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleStructuredData) }}
      />
      
      <div className="min-h-screen bg-gray-50">
        <HideLovableBadge />
        <Header />
        
        {/* Hero Section with recommended animations */}
        <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-20 relative overflow-hidden">
          {/* Subtle background motion */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#1B2A41]/20 to-transparent opacity-60 animate-pulse"></div>
          <div className="absolute top-10 left-10 w-20 h-20 bg-[#1B2A41]/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-32 h-32 bg-purple-500/10 rounded-full blur-xl animate-pulse"></div>
          
          <div className="container mx-auto px-4 text-center relative z-10">
            {/* Fade-in on load - Title with SEO-optimized heading */}
            <h1 className="text-4xl md:text-6xl font-bold mb-6 opacity-0 animate-fade-in">
              Microsoft 365 Admin Knowledge Base
            </h1>
            
            {/* SEO-optimized subtitle */}
            <h2 className="text-xl md:text-2xl mb-8 text-slate-200 max-w-3xl mx-auto h-16 flex items-center justify-center opacity-0 animate-fade-in-delayed">
              <TypingEffect phrases={typingPhrases} />
            </h2>

            {/* Stats Section in hero with semantic markup */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto opacity-0 animate-fade-in-delayed-2">
              <div className="text-center" itemScope itemType="https://schema.org/Statistic">
                <div className="flex items-center justify-center w-16 h-16 bg-[#1B2A41]/20 rounded-full mx-auto mb-4 transition-transform duration-200 hover:scale-110">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-2" itemProp="value">{totalArticles}+</h3>
                <p className="text-slate-300" itemProp="name">Expert Articles</p>
              </div>
              <div className="text-center" itemScope itemType="https://schema.org/Statistic">
                <div className="flex items-center justify-center w-16 h-16 bg-[#1B2A41]/20 rounded-full mx-auto mb-4 transition-transform duration-200 hover:scale-110">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-2" itemProp="value">800+</h3>
                <p className="text-slate-300" itemProp="name">Community Members</p>
              </div>
              <div className="text-center" itemScope itemType="https://schema.org/Statistic">
                <div className="flex items-center justify-center w-16 h-16 bg-[#1B2A41]/20 rounded-full mx-auto mb-4 transition-transform duration-200 hover:scale-110">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-2" itemProp="value">50+</h3>
                <p className="text-slate-300" itemProp="name">Solutions Delivered</p>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section with semantic markup */}
        <section className="py-16 bg-gray-50" itemScope itemType="https://schema.org/WebPageElement">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Browse Microsoft 365 Topics by Category
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Find comprehensive articles organized by Microsoft 365 services and administrative areas including Exchange Online, Teams, Azure AD, and more
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" itemScope itemType="https://schema.org/ItemList">
              {categories.map((category, index) => (
                <div key={category.id} itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                  <meta itemProp="position" content={String(index + 1)} />
                  <CategoryCard category={category} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Articles Section with better SEO */}
        <section className="py-16 bg-white" itemScope itemType="https://schema.org/WebPageElement">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Featured Microsoft 365 Administration Articles
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Hand-picked articles covering the most important topics for Microsoft 365 administrators, including setup guides, troubleshooting tips, and best practices
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" itemScope itemType="https://schema.org/ItemList">
              {featuredArticles.map((article, index) => (
                <div key={article.id} itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                  <meta itemProp="position" content={String(index + 1)} />
                  <ArticleCard article={article} showCategory={true} />
                </div>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Button asChild size="lg" className="bg-[#1B2A41] hover:bg-[#152030] transition-all duration-200 hover:scale-105">
                <a href="/articles" aria-label="View all Microsoft 365 administration articles">View All Articles</a>
              </Button>
            </div>
          </div>
        </section>

        {/* Newsletter Section with better accessibility */}
        <section className="py-16 bg-[#F2F4F7]" itemScope itemType="https://schema.org/WebPageElement">
          <div className="container mx-auto px-4">
            <Card className="max-w-2xl mx-auto transition-transform duration-200 hover:scale-[1.02]">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-gray-900">
                  Stay Updated with Microsoft 365 Tips
                </CardTitle>
                <CardDescription className="text-lg">
                  Get the latest Microsoft 365 administration tips, guides, and best practices delivered directly to your inbox
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="flex flex-col sm:flex-row gap-4" role="form" aria-label="Newsletter subscription">
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    className="flex-1 transition-all duration-200 hover:shadow-md focus:shadow-lg"
                    aria-label="Email address for newsletter subscription"
                    required
                  />
                  <Button type="submit" className="bg-[#1B2A41] hover:bg-[#152030] transition-all duration-200 hover:scale-105">
                    Subscribe to Newsletter
                  </Button>
                </form>
                <p className="text-sm text-gray-500 mt-2 text-center">
                  No spam, unsubscribe at any time. We respect your privacy and focus on Microsoft 365 content only.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default Index;
