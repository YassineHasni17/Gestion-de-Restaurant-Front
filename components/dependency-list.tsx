"use client"

import { useState } from "react"
import { Search, ArrowUpDown, MoreHorizontal, AlertCircle, Clock } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function DependencyList() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredDependencies = dependencies.filter((dep) => dep.name.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Dependencies</CardTitle>
            <CardDescription>Manage your project dependencies</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search dependencies..."
                className="w-64 pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px]">
                <Button variant="ghost" className="p-0 hover:bg-transparent">
                  <span>Package</span>
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>Current Version</TableHead>
              <TableHead>Latest Version</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDependencies.map((dependency) => (
              <TableRow key={dependency.name}>
                <TableCell className="font-medium">{dependency.name}</TableCell>
                <TableCell>{dependency.currentVersion}</TableCell>
                <TableCell>{dependency.latestVersion}</TableCell>
                <TableCell>{dependency.type}</TableCell>
                <TableCell>
                  {dependency.status === "up-to-date" ? (
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-700 hover:bg-green-50 hover:text-green-700"
                    >
                      Up to date
                    </Badge>
                  ) : dependency.status === "outdated" ? (
                    <Badge
                      variant="outline"
                      className="bg-amber-50 text-amber-700 hover:bg-amber-50 hover:text-amber-700"
                    >
                      <Clock className="mr-1 h-3 w-3" />
                      Outdated
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="bg-red-50 text-red-700 hover:bg-red-50 hover:text-red-700">
                      <AlertCircle className="mr-1 h-3 w-3" />
                      Vulnerable
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Update</DropdownMenuItem>
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>View on npm</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

const dependencies = [
  {
    name: "react",
    currentVersion: "18.2.0",
    latestVersion: "19.0.0",
    type: "dependency",
    status: "outdated",
  },
  {
    name: "react-dom",
    currentVersion: "18.2.0",
    latestVersion: "19.0.0",
    type: "dependency",
    status: "outdated",
  },
  {
    name: "next",
    currentVersion: "14.0.1",
    latestVersion: "14.1.0",
    type: "dependency",
    status: "outdated",
  },
  {
    name: "tailwindcss",
    currentVersion: "3.3.5",
    latestVersion: "3.3.6",
    type: "devDependency",
    status: "outdated",
  },
  {
    name: "typescript",
    currentVersion: "5.2.2",
    latestVersion: "5.3.0",
    type: "devDependency",
    status: "outdated",
  },
  {
    name: "eslint",
    currentVersion: "8.53.0",
    latestVersion: "8.53.0",
    type: "devDependency",
    status: "up-to-date",
  },
  {
    name: "postcss",
    currentVersion: "8.4.31",
    latestVersion: "8.4.31",
    type: "devDependency",
    status: "vulnerable",
  },
  {
    name: "autoprefixer",
    currentVersion: "10.4.16",
    latestVersion: "10.4.16",
    type: "devDependency",
    status: "up-to-date",
  },
  {
    name: "@types/react",
    currentVersion: "18.2.37",
    latestVersion: "18.2.37",
    type: "devDependency",
    status: "up-to-date",
  },
  {
    name: "@types/node",
    currentVersion: "20.9.0",
    latestVersion: "20.9.0",
    type: "devDependency",
    status: "up-to-date",
  },
]

