import { BrowserRouter as Router } from "react-router-dom"
import { ThemeProvider } from "./components/ui/theme-provider"
import { Toaster } from "./components/ui/toaster"
import { AuthProvider } from "./contexts/AuthContext"
import MainRoutes from "./routes"

function App() {
  return (
    <Router>
      <AuthProvider>
        <ThemeProvider defaultTheme="light" storageKey="ui-theme">
          <MainRoutes />
          <Toaster />
        </ThemeProvider>
      </AuthProvider>
    </Router>
  )
}

export default App