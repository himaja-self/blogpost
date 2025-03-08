import { useEffect, useState } from "react";
import { getArticles } from "@/api/articles";
import { Article } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatDistanceToNow } from "date-fns";
import { useAuth } from "@/contexts/AuthContext";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function Dashboard() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await getArticles();
        setArticles(response.articles);
      } catch (error) {
        console.error("Failed to fetch articles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (user?.role === 'admin') {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Admin Dashboard</AlertTitle>
          <AlertDescription>
            As an admin, you have access to user management features. Use the sidebar to navigate to the User Management page.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Latest Articles</h1>
      <ScrollArea className="h-[calc(100vh-12rem)]">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <Card key={article._id} className="transform transition-all duration-200 hover:scale-105">
              <CardHeader>
                <CardTitle className="line-clamp-2">{article.title}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  By {article.author.email} •{" "}
                  {formatDistanceToNow(new Date(article.createdAt), { addSuffix: true })}
                </p>
              </CardHeader>
              <CardContent>
                <p className="line-clamp-3 text-muted-foreground">{article.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}