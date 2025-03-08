import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "./ui/alert"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"

export function BlockedAccountMessage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-secondary p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-destructive flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            Account Blocked
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert variant="destructive">
            <AlertTitle>Access Denied</AlertTitle>
            <AlertDescription>
              Your account has been blocked. Please contact the administrator for assistance.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  )
}