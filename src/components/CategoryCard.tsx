
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Category } from "@/data/categories";

interface CategoryCardProps {
  category: Category;
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  return (
    <Link to={`/category/${category.id}`} className="block group">
      <Card className="h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-2 hover:border-ms-blue">
        <CardHeader className="text-center">
          <div className="text-4xl mb-2">{category.icon}</div>
          <CardTitle className="group-hover:text-ms-blue transition-colors">
            {category.name}
          </CardTitle>
          <CardDescription className="text-gray-600">
            {category.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <Badge variant="secondary" className="bg-ms-blue-light text-ms-blue">
            {category.articleCount} articles
          </Badge>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CategoryCard;
