"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { API_URL } from "@/lib/services/api-config"

export default function ApiTestPage() {
  const [endpoint, setEndpoint] = useState("/plats")
  const [method, setMethod] = useState("GET")
  const [requestBody, setRequestBody] = useState("")
  const [result, setResult] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleTest = async () => {
    setIsLoading(true)
    try {
      const options: RequestInit = {
        method,
        headers: {
          "Content-Type": "application/json",
        },
      }

      if (requestBody && (method === "POST" || method === "PUT" || method === "PATCH")) {
        try {
          options.body = JSON.stringify(JSON.parse(requestBody))
        } catch (e) {
          setResult({ success: false, error: "Invalid JSON in request body" })
          setIsLoading(false)
          return
        }
      }

      const url = `${API_URL}${endpoint}`
      console.log(`Testing API Endpoint: ${method} ${url}`)

      const response = await fetch(url, options)

      let responseData
      const contentType = response.headers.get("content-type")

      if (contentType && contentType.includes("application/json")) {
        try {
          responseData = await response.json()
        } catch (e) {
          responseData = await response.text()
        }
      } else {
        responseData = await response.text()
      }

      setResult({
        success: response.ok,
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries([...response.headers.entries()]),
        data: responseData,
      })
    } catch (error) {
      setResult({ success: false, error: String(error) })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">API Test Tool</h1>

      <Card>
        <CardHeader>
          <CardTitle>Test API Endpoint</CardTitle>
          <CardDescription>Test a specific API endpoint</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="apiUrl">API URL</Label>
            <Input id="apiUrl" value={API_URL} disabled />
          </div>

          <div className="space-y-2">
            <Label htmlFor="endpoint">Endpoint</Label>
            <Input id="endpoint" value={endpoint} onChange={(e) => setEndpoint(e.target.value)} placeholder="/plats" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="method">Method</Label>
            <Select value={method} onValueChange={setMethod}>
              <SelectTrigger>
                <SelectValue placeholder="Select method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="GET">GET</SelectItem>
                <SelectItem value="POST">POST</SelectItem>
                <SelectItem value="PUT">PUT</SelectItem>
                <SelectItem value="PATCH">PATCH</SelectItem>
                <SelectItem value="DELETE">DELETE</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {(method === "POST" || method === "PUT" || method === "PATCH") && (
            <div className="space-y-2">
              <Label htmlFor="requestBody">Request Body (JSON)</Label>
              <Textarea
                id="requestBody"
                value={requestBody}
                onChange={(e) => setRequestBody(e.target.value)}
                placeholder='{"key": "value"}'
                className="min-h-[150px] font-mono"
              />
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button onClick={handleTest} disabled={isLoading}>
            {isLoading ? "Testing..." : "Test Endpoint"}
          </Button>
        </CardFooter>
        {result && (
          <CardContent className="border-t pt-4">
            <div className="space-y-2">
              <Label>Result</Label>
              <div className={`p-4 rounded-md ${result.success ? "bg-green-50" : "bg-red-50"}`}>
                <pre className="whitespace-pre-wrap text-sm">{JSON.stringify(result, null, 2)}</pre>
              </div>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  )
}

