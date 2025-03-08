import { useEffect, useState } from "react";
import { getUsers, updateUserBlock, updateUserRole } from "@/api/users";
import { User } from "@/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/useToast";
import { Shield, ShieldAlert, UserCheck, UserX, Search, BadgeAlert } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();
  const { user: currentUser, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const filtered = users.filter(user => 
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchTerm, users]);

  const fetchUsers = async () => {
    try {
      const response = await getUsers();
      setUsers(response.users);
      setFilteredUsers(response.users);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch users",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId: string, newRole: string) => {
    try {
      setUpdating(userId);
      await updateUserRole(userId, newRole);
      setUsers(users.map(user =>
        user._id === userId ? { ...user, role: newRole as 'user' | 'author' | 'admin' } : user
      ));
      toast({
        title: "Success",
        description: "User role updated successfully",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update user role",
      });
    } finally {
      setUpdating(null);
    }
  };

  const handleBlockToggle = async (userId: string, blocked: boolean) => {
    try {
      setUpdating(userId);
      await updateUserBlock(userId, blocked);
      setUsers(users.map(user =>
        user._id === userId ? { ...user, blocked } : user
      ));
      toast({
        title: "Success",
        description: `User ${blocked ? 'blocked' : 'unblocked'} successfully`,
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || `Failed to ${blocked ? 'block' : 'unblock'} user`,
      });
    } finally {
      setUpdating(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-12rem)]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <BadgeAlert className="h-8 w-8 text-primary" />
          User Management
        </h1>
        <div className="flex items-center gap-2 text-muted-foreground bg-secondary/50 p-2 rounded-lg backdrop-blur-sm">
          <Shield className="h-5 w-5" />
          <span>Admin: {currentUser?.email}</span>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search users by email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-9 bg-background/60 backdrop-blur-sm"
        />
      </div>

      <div className="rounded-lg border bg-card shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user._id} className="transition-colors hover:bg-muted/50">
                <TableCell className="font-medium">{user.email}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {user.role === 'admin' ? (
                      <ShieldAlert className="h-4 w-4 text-destructive" />
                    ) : user.role === 'author' ? (
                      <UserCheck className="h-4 w-4 text-blue-500" />
                    ) : (
                      <UserX className="h-4 w-4 text-muted-foreground" />
                    )}
                    <Select
                      defaultValue={user.role}
                      onValueChange={(value) => handleRoleChange(user._id, value)}
                      disabled={user._id === currentUser?._id || updating === user._id}
                    >
                      <SelectTrigger className="w-32 bg-background/60 backdrop-blur-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="user">User</SelectItem>
                        <SelectItem value="author">Author</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </TableCell>
                <TableCell>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                    user.blocked 
                      ? 'bg-destructive/10 text-destructive' 
                      : 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400'
                  }`}>
                    {user.blocked ? 'Blocked' : 'Active'}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant={user.blocked ? "outline" : "destructive"}
                    onClick={() => handleBlockToggle(user._id, !user.blocked)}
                    disabled={user.role === 'admin' || user._id === currentUser?._id || updating === user._id}
                    size="sm"
                    className="transition-all hover:scale-105"
                  >
                    {updating === user._id ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
                    ) : (
                      user.blocked ? 'Unblock' : 'Block'
                    )}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}