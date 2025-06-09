
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Article } from "@/data/articles";
import { CalendarDays, Clock, Eye, Heart } from "lucide-react";

interface ArticleCardProps {
  article: Article;
  showCategory?: boolean;
}

const ArticleCard = ({ article, showCategory = false }: ArticleCardProps) => {
  return (
    <Link to={`/article/${article.id}`} className="block group">
      <Card className="h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
        <CardHeader>
          <div className="flex items-start justify-between">
            <CardTitle className="group-hover:text-ms-blue transition-colors text-lg leading-tight">
              {article.title}
            </CardTitle>
            {article.featured && (
              <Badge variant="default" className="bg-orange-500 hover:bg-orange-600 text-white shrink-0 ml-2">
                Featured
              </Badge>
            )}
          </div>
          <CardDescription className="text-gray-600 line-clamp-2">
            {article.content.substring(0, 150)}...
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <CalendarDays className="w-4 h-4 mr-1" />
                {new Date(article.publishedDate).toLocaleDateString()}
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {article.readTime} min read
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex items-center">
                <Eye className="w-4 h-4 mr-1" />
                {article.viewCount.toLocaleString()}
              </div>
              <div className="flex items-center">
                <Heart className="w-4 h-4 mr-1" />
                {article.likes}
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-1">
            {article.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
            {article.tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{article.tags.length - 3} more
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ArticleCard;
