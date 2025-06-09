
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, Grid, List } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArticleCard from "@/components/ArticleCard";
import { searchArticles } from "@/data/articles";

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  
  const searchResults = searchQuery ? searchArticles(searchQuery) : [];

  useEffect(() => {
    const query = searchParams.get("q");
    if (query) {
      setSearchQuery(query);
    }
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchParams({ q: searchQuery });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Search Header */}
      <section className="bg-white border-b">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="text-center mb-6">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Search Results
            </h1>
            {searchQuery && (
              <p className="text-lg text-gray-600 mb-6">
                Results for "{searchQuery}"
              </p>
            )}
          </div>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-6">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Search for articles, guides, and solutions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-full"
              />
              <Button 
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-ms-blue hover:bg-ms-blue-dark"
              >
                Search
              </Button>
            </form>
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

      {/* Results Section */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          {searchResults.length > 0 ? (
            <>
              <div className="mb-8">
                <p className="text-gray-600 text-center md:text-left">
                  Found {searchResults.length} articles matching "{searchQuery}"
                </p>
              </div>
              
              <div className={`grid gap-6 md:gap-8 ${
                viewMode === "grid" 
                  ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" 
                  : "grid-cols-1"
              }`}>
                {searchResults.map((article) => (
                  <ArticleCard key={article.id} article={article} showCategory={true} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-12 md:py-16">
              <div className="text-4xl md:text-6xl mb-4">🔍</div>
              <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-2">
                {searchQuery ? "No articles found" : "Start searching"}
              </h3>
              <p className="text-gray-600 mb-6 md:mb-8 max-w-md mx-auto">
                {searchQuery 
                  ? `No articles match your search "${searchQuery}". Try different keywords.`
                  : "Enter a search term to find articles and guides."
                }
              </p>
              {searchQuery && (
                <Button 
                  onClick={() => {
                    setSearchQuery("");
                    setSearchParams({});
                  }}
                  variant="outline"
                  className="w-full max-w-xs"
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

export default SearchPage;
