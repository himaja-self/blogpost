import { Routes, Route } from "react-router-dom"
import { Login } from "@/pages/Login"
import { Register } from "@/pages/Register"
import { Layout } from "@/components/Layout"
import { ProtectedRoute } from "@/components/ProtectedRoute"
import { Dashboard } from "@/pages/Dashboard"
import { CreateArticle } from "@/pages/CreateArticle"
import { UserManagement } from "@/pages/UserManagement"
import { BlockedAccountMessage } from "@/components/BlockedAccountMessage"

export default function MainRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/blocked" element={<BlockedAccountMessage />} />
      <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/create-article" element={<CreateArticle />} />
        <Route path="/admin/users" element={<UserManagement />} />
      </Route>
    </Routes>
  )
}