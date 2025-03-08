import { UserCircle, PenSquare, LayoutDashboard, Users } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { useAuth } from "@/contexts/AuthContext";

export function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/" },
    ...(user?.role === "author" ? [
      { icon: PenSquare, label: "Create Article", path: "/create-article" }
    ] : []),
    ...(user?.role === "admin" ? [
      { icon: Users, label: "User Management", path: "/admin/users" }
    ] : [])
  ];

  return (
    <div className="flex h-full w-[240px] flex-col border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <ScrollArea className="flex-1">
        <div className="flex flex-col gap-2 p-4">
          {menuItems.map((item) => (
            <Button
              key={item.path}
              variant={isActive(item.path) ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start gap-2",
                isActive(item.path) && "bg-secondary"
              )}
              onClick={() => navigate(item.path)}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}