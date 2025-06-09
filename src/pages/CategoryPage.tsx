
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Search, Grid, List } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArticleCard from "@/components/ArticleCard";
import { categories } from "@/data/categories";
import { getArticlesByCategory, searchArticles } from "@/data/articles";

const CategoryPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  
  const category = categories.find(cat => cat.id === categoryId);
  const allArticles = categoryId ? getArticlesByCategory(categoryId) : [];
  const filteredArticles = searchQuery 
    ? searchArticles(searchQuery, categoryId)
    : allArticles;

  if (!category) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Category Not Found</h1>
          <p className="text-gray-600">The category you're looking for doesn't exist.</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Category Header */}
      <section className="bg-white border-b">
        <div className="container mx-auto px-4 py-12">
          <div className="flex items-center mb-6">
            <div className="text-5xl mr-4">{category.icon}</div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                {category.name}
              </h1>
              <p className="text-xl text-gray-600 mb-4">
                {category.description}
              </p>
              <Badge variant="secondary" className="bg-ms-blue-light text-ms-blue">
                {allArticles.length} articles
              </Badge>
            </div>
          </div>
          
          {/* Search and View Controls */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder={`Search in ${category.name}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className={viewMode === "grid" ? "bg-ms-blue hover:bg-ms-blue-dark" : ""}
              >
                <Grid className="w-4 h-4 mr-2" />
                Grid
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
                className={viewMode === "list" ? "bg-ms-blue hover:bg-ms-blue-dark" : ""}
              >
                <List className="w-4 h-4 mr-2" />
                List
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Articles Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {filteredArticles.length > 0 ? (
            <>
              {searchQuery && (
                <div className="mb-8">
                  <p className="text-gray-600">
                    Found {filteredArticles.length} articles matching "{searchQuery}"
                  </p>
                </div>
              )}
              
              <div className={`grid gap-8 ${
                viewMode === "grid" 
                  ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" 
                  : "grid-cols-1"
              }`}>
                {filteredArticles.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                {searchQuery ? "No articles found" : "No articles yet"}
              </h3>
              <p className="text-gray-600 mb-8">
                {searchQuery 
                  ? `No articles match your search "${searchQuery}" in this category.`
                  : "Articles for this category are coming soon. Check back later!"
                }
              </p>
              {searchQuery && (
                <Button 
                  onClick={() => setSearchQuery("")}
                  variant="outline"
                >
                  Clear search
                </Button>
              )}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CategoryPage;
