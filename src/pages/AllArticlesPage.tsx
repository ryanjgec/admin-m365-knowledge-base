
import { useState } from "react";
import { Search, Grid, List, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArticleCard from "@/components/ArticleCard";
import { getAllArticles, searchArticles } from "@/data/articles";
import { categories } from "@/data/categories";

const AllArticlesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  
  const allArticles = getAllArticles();
  
  let filteredArticles = searchQuery 
    ? searchArticles(searchQuery)
    : allArticles;
    
  if (selectedCategory !== "all") {
    filteredArticles = filteredArticles.filter(article => article.category === selectedCategory);
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is handled by the state update
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Page Header */}
      <section className="bg-white border-b">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="text-center mb-8">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              All Articles
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Browse our complete collection of Microsoft 365 guides and tutorials
            </p>
          </div>
          
          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between mb-6">
            <div className="relative w-full lg:flex-1 lg:max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-full"
              />
            </div>
            
            <div className="flex gap-2 w-full lg:w-auto">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full lg:w-48">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* View Controls */}
          <div className="flex gap-2 justify-center">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className={`${viewMode === "grid" ? "bg-ms-blue hover:bg-ms-blue-dark" : ""}`}
            >
              <Grid className="w-4 h-4 mr-2" />
              Grid
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("list")}
              className={`${viewMode === "list" ? "bg-ms-blue hover:bg-ms-blue-dark" : ""}`}
            >
              <List className="w-4 h-4 mr-2" />
              List
            </Button>
          </div>
        </div>
      </section>

      {/* Articles Section */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          {filteredArticles.length > 0 ? (
            <>
              <div className="mb-8">
                <p className="text-gray-600 text-center md:text-left">
                  Showing {filteredArticles.length} of {allArticles.length} articles
                  {selectedCategory !== "all" && (
                    <span> in {categories.find(c => c.id === selectedCategory)?.name}</span>
                  )}
                  {searchQuery && <span> matching "{searchQuery}"</span>}
                </p>
              </div>
              
              <div className={`grid gap-6 md:gap-8 ${
                viewMode === "grid" 
                  ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" 
                  : "grid-cols-1"
              }`}>
                {filteredArticles.map((article) => (
                  <ArticleCard key={article.id} article={article} showCategory={true} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-12 md:py-16">
              <div className="text-4xl md:text-6xl mb-4">📄</div>
              <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-2">
                No articles found
              </h3>
              <p className="text-gray-600 mb-6 md:mb-8 max-w-md mx-auto">
                {searchQuery || selectedCategory !== "all"
                  ? "Try adjusting your search or filter criteria."
                  : "No articles are available at the moment."
                }
              </p>
              <div className="flex gap-4 justify-center">
                {searchQuery && (
                  <Button 
                    onClick={() => setSearchQuery("")}
                    variant="outline"
                  >
                    Clear search
                  </Button>
                )}
                {selectedCategory !== "all" && (
                  <Button 
                    onClick={() => setSelectedCategory("all")}
                    variant="outline"
                  >
                    Show all categories
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AllArticlesPage;
