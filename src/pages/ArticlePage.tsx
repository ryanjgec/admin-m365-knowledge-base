import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { CalendarDays, Clock, Eye, ThumbsUp, ThumbsDown, ArrowLeft, Share2, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArticleCard from "@/components/ArticleCard";
import { getArticleById, articles } from "@/data/articles";
import { categories } from "@/data/categories";
import { useArticleViews } from "@/hooks/useArticleViews";
import { useArticleLikes } from "@/hooks/useArticleLikes";

const ArticlePage = () => {
  const { articleId } = useParams<{ articleId: string }>();
  const [dislikes, setDislikes] = useState(0);
  const [userVote, setUserVote] = useState<'like' | 'dislike' | null>(null);
  
  const article = articleId ? getArticleById(articleId) : null;
  const category = article ? categories.find(cat => cat.id === article.category) : null;
  
  // Use the new hooks for tracking views and likes
  useArticleViews(articleId || '');
  const { userHasLiked, toggleLike, isLoading: likesLoading } = useArticleLikes(articleId || '');
  
  // Get related articles (same category, excluding current article)
  const relatedArticles = article 
    ? articles.filter(a => a.category === article.category && a.id !== article.id).slice(0, 3)
    : [];

  useEffect(() => {
    if (article) {
      setDislikes(article.dislikes);
    }
  }, [article]);

  const handleDislike = () => {
    if (userVote === 'dislike') {
      setDislikes(prev => prev - 1);
      setUserVote(null);
    } else {
      if (userVote === 'like') {
        // User is switching from like to dislike
        setUserVote('dislike');
      }
      setDislikes(prev => prev + 1);
      setUserVote('dislike');
    }
  };

  if (!article) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Article Not Found</h1>
          <p className="text-gray-600 mb-8">The article you're looking for doesn't exist.</p>
          <Button asChild>
            <Link to="/">Back to Home</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <article className="py-6 md:py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Breadcrumb */}
          <nav className="mb-6 md:mb-8">
            <div className="flex flex-wrap items-center space-x-2 text-sm text-gray-600">
              <Link to="/" className="hover:text-ms-blue">Home</Link>
              <span>/</span>
              {category && (
                <>
                  <Link to={`/category/${category.id}`} className="hover:text-ms-blue">
                    {category.name}
                  </Link>
                  <span>/</span>
                </>
              )}
              <span className="text-gray-900 break-words">{article.title}</span>
            </div>
          </nav>

          {/* Back Button */}
          <Button variant="ghost" asChild className="mb-4 md:mb-6 w-full md:w-auto">
            <Link to={category ? `/category/${category.id}` : "/"}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to {category ? category.name : "Home"}
            </Link>
          </Button>

          {/* Article Header */}
          <header className="mb-6 md:mb-8">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              {category && (
                <Badge variant="secondary" className="bg-ms-blue-light text-ms-blue">
                  {category.name}
                </Badge>
              )}
              {article.featured && (
                <Badge variant="default" className="bg-orange-500 hover:bg-orange-600 text-white">
                  Featured
                </Badge>
              )}
            </div>
            
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight">
              {article.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 md:gap-6 text-sm text-gray-600 mb-4 md:mb-6">
              <div className="flex items-center">
                <CalendarDays className="w-4 h-4 mr-2" />
                <span className="hidden md:inline">Published </span>
                {new Date(article.publishedDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                {article.readTime} min read
              </div>
              <div className="flex items-center">
                <Eye className="w-4 h-4 mr-2" />
                {article.viewCount.toLocaleString()} views
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6 md:mb-8">
              {article.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </header>

          {/* Article Content */}
          <div className="bg-white rounded-lg shadow-sm border p-4 md:p-8 mb-6 md:mb-8">
            <div className="prose prose-sm md:prose-lg max-w-none">
              <div 
                dangerouslySetInnerHTML={{ 
                  __html: article.content.replace(/\n/g, '<br>').replace(/`([^`]+)`/g, '<code>$1</code>') 
                }}
              />
            </div>
          </div>

          {/* Article Actions */}
          <div className="bg-white rounded-lg shadow-sm border p-4 md:p-6 mb-6 md:mb-8">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
              <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                <span className="text-gray-600 font-medium">Was this helpful?</span>
                <div className="flex items-center space-x-2">
                  <Button
                    variant={userHasLiked ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleLike()}
                    disabled={likesLoading}
                    className={userHasLiked ? "bg-green-500 hover:bg-green-600" : ""}
                  >
                    <ThumbsUp className="w-4 h-4 mr-2" />
                    {article.likes + (userHasLiked ? 1 : 0)}
                  </Button>
                  <Button
                    variant={userVote === 'dislike' ? "default" : "outline"}
                    size="sm"
                    onClick={handleDislike}
                    className={userVote === 'dislike' ? "bg-red-500 hover:bg-red-600" : ""}
                  >
                    <ThumbsDown className="w-4 h-4 mr-2" />
                    {dislikes}
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 w-full lg:w-auto">
                <Button variant="outline" size="sm" className="flex-1 lg:flex-none">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
                <Button variant="outline" size="sm" className="flex-1 lg:flex-none">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Comment
                </Button>
              </div>
            </div>
          </div>

          {/* Comments Section */}
          <Card className="mb-6 md:mb-8">
            <CardHeader>
              <CardTitle>Comments</CardTitle>
              <CardDescription>
                Sign in to leave a comment and engage with the community
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-6 md:py-8 text-gray-500">
                <MessageCircle className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p className="mb-4">No comments yet. Be the first to share your thoughts!</p>
                <Button className="bg-ms-blue hover:bg-ms-blue-dark w-full md:w-auto">
                  Sign In to Comment
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <section>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6">Related Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {relatedArticles.map((relatedArticle) => (
                  <ArticleCard key={relatedArticle.id} article={relatedArticle} />
                ))}
              </div>
            </section>
          )}
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default ArticlePage;
