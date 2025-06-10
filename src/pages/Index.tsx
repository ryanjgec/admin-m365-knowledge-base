
import { useState, lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, Users, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HideLovableBadge from "@/components/HideLovableBadge";
import { CategoryCardSkeleton, ArticleCardSkeleton, HeroSkeleton } from "@/components/LoadingSkeleton";

// Lazy load components for better performance
const CategoryCard = lazy(() => import("@/components/CategoryCard"));
const ArticleCard = lazy(() => import("@/components/ArticleCard"));
const TypingEffect = lazy(() => import("@/components/TypingEffect"));

// Lazy load data to reduce initial bundle size
const loadCategories = () => import("@/data/categories").then(module => module.categories);
const loadFeaturedArticles = () => import("@/data/articles").then(module => module.getFeaturedArticles());

const Index = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<any[]>([]);
  const [featuredArticles, setFeaturedArticles] = useState<any[]>([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  // Load data on component mount
  useState(() => {
    Promise.all([loadCategories(), loadFeaturedArticles()]).then(([cats, articles]) => {
      setCategories(cats);
      setFeaturedArticles(articles);
      setDataLoaded(true);
    });
  });

  const typingPhrases = [
    "Your Microsoft 365 Admin Companion...",
    "Expert Guidance at Your Fingertips...",
    "Simplifying M365 Administration...",
    "Your Trusted Knowledge Base..."
  ];

  // Get total article count from all categories
  const totalArticles = categories.reduce((sum, category) => sum + category.articleCount, 0);

  // Add structured data for articles (only when loaded)
  const articleStructuredData = dataLoaded ? {
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
  } : null;

  return (
    <>
      {/* SEO JSON-LD for articles */}
      {articleStructuredData && (
        <script 
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleStructuredData) }}
        />
      )}
      
      <div className="min-h-screen bg-gray-50">
        <HideLovableBadge />
        <Header />
        
        {/* Hero Section with optimized animations */}
        <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-20 relative overflow-hidden">
          {/* Reduced background animations for performance */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#1B2A41]/20 to-transparent opacity-60"></div>
          
          <div className="container mx-auto px-4 text-center relative z-10">
            {/* Optimized title with reduced animation */}
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-in fade-in duration-1000">
              Microsoft 365 Admin Knowledge Base
            </h1>
            
            {/* Lazy loaded typing effect */}
            <h2 className="text-xl md:text-2xl mb-8 text-slate-200 max-w-3xl mx-auto h-16 flex items-center justify-center">
              <Suspense fallback={<span>Your Microsoft 365 Admin Companion...</span>}>
                <TypingEffect phrases={typingPhrases} />
              </Suspense>
            </h2>

            {/* Stats Section with conditional rendering */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center" itemScope itemType="https://schema.org/Statistic">
                <div className="flex items-center justify-center w-16 h-16 bg-[#1B2A41]/20 rounded-full mx-auto mb-4">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-2" itemProp="value">{totalArticles || 60}+</h3>
                <p className="text-slate-300" itemProp="name">Expert Articles</p>
              </div>
              <div className="text-center" itemScope itemType="https://schema.org/Statistic">
                <div className="flex items-center justify-center w-16 h-16 bg-[#1B2A41]/20 rounded-full mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-2" itemProp="value">800+</h3>
                <p className="text-slate-300" itemProp="name">Community Members</p>
              </div>
              <div className="text-center" itemScope itemType="https://schema.org/Statistic">
                <div className="flex items-center justify-center w-16 h-16 bg-[#1B2A41]/20 rounded-full mx-auto mb-4">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-2" itemProp="value">50+</h3>
                <p className="text-slate-300" itemProp="name">Solutions Delivered</p>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section with lazy loading */}
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
              {dataLoaded ? (
                categories.map((category, index) => (
                  <div key={category.id} itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                    <meta itemProp="position" content={String(index + 1)} />
                    <Suspense fallback={<CategoryCardSkeleton />}>
                      <CategoryCard category={category} />
                    </Suspense>
                  </div>
                ))
              ) : (
                // Show loading skeletons while data loads
                Array.from({ length: 9 }).map((_, index) => (
                  <CategoryCardSkeleton key={index} />
                ))
              )}
            </div>
          </div>
        </section>

        {/* Featured Articles Section with lazy loading */}
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
              {dataLoaded ? (
                featuredArticles.map((article, index) => (
                  <div key={article.id} itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                    <meta itemProp="position" content={String(index + 1)} />
                    <Suspense fallback={<ArticleCardSkeleton />}>
                      <ArticleCard article={article} showCategory={true} />
                    </Suspense>
                  </div>
                ))
              ) : (
                // Show loading skeletons while data loads
                Array.from({ length: 6 }).map((_, index) => (
                  <ArticleCardSkeleton key={index} />
                ))
              )}
            </div>
            
            <div className="text-center mt-12">
              <Button asChild size="lg" className="bg-[#1B2A41] hover:bg-[#152030]">
                <a href="/articles" aria-label="View all Microsoft 365 administration articles">View All Articles</a>
              </Button>
            </div>
          </div>
        </section>

        {/* Newsletter Section - simplified for performance */}
        <section className="py-16 bg-[#F2F4F7]" itemScope itemType="https://schema.org/WebPageElement">
          <div className="container mx-auto px-4">
            <Card className="max-w-2xl mx-auto">
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
                    className="flex-1"
                    aria-label="Email address for newsletter subscription"
                    required
                  />
                  <Button type="submit" className="bg-[#1B2A41] hover:bg-[#152030]">
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
