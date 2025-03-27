// import { RefreshCw, ArrowUpRight } from "lucide-react"

// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"

// export function RecentUpdates() {
//   return (
//     <Card>
//       <CardHeader className="flex flex-row items-center">
//         <div className="grid gap-1">
//           <CardTitle>Recent Updates</CardTitle>
//           <CardDescription>Latest package updates</CardDescription>
//         </div>
//         <Button variant="ghost" size="icon" className="ml-auto">
//           <RefreshCw className="h-4 w-4" />
//           <span className="sr-only">Refresh</span>
//         </Button>
//       </CardHeader>
//       <CardContent>
//         <div className="space-y-4">
//           {recentUpdates.map((update) => (
//             <div key={update.package} className="flex items-center gap-4">
//               <div className="grid flex-1 gap-1">
//                 <div className="font-medium">{update.package}</div>
//                 <div className="text-xs text-muted-foreground">
//                   {update.oldVersion} → {update.newVersion}
//                 </div>
//               </div>
//               <div
//                 className={`text-xs ${update.type === "major" ? "text-destructive" : update.type === "minor" ? "text-amber-500" : "text-green-500"}`}
//               >
//                 {update.type}
//               </div>
//               <Button variant="ghost" size="icon" className="ml-auto">
//                 <ArrowUpRight className="h-4 w-4" />
//                 <span className="sr-only">View</span>
//               </Button>
//             </div>
//           ))}
//         </div>
//       </CardContent>
//     </Card>
//   )
// }

// const recentUpdates = [
//   {
//     package: "react",
//     oldVersion: "18.2.0",
//     newVersion: "19.0.0",
//     type: "major",
//   },
//   {
//     package: "next",
//     oldVersion: "14.0.1",
//     newVersion: "14.1.0",
//     type: "minor",
//   },
//   {
//     package: "tailwindcss",
//     oldVersion: "3.3.5",
//     newVersion: "3.3.6",
//     type: "patch",
//   },
//   {
//     package: "typescript",
//     oldVersion: "5.2.2",
//     newVersion: "5.3.0",
//     type: "minor",
//   },
// ]

