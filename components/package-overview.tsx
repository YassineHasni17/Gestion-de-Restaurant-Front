import { cn } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface PackageOverviewProps {
  className?: string
}

export function PackageOverview({ className }: PackageOverviewProps) {
  return (
    <Card className={cn("col-span-2", className)}>
      <CardHeader>
        <CardTitle>Package Overview</CardTitle>
        <CardDescription>Breakdown of your project dependencies by type</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="dependencies">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="dependencies">Dependencies</TabsTrigger>
            <TabsTrigger value="devDependencies">Dev Dependencies</TabsTrigger>
            <TabsTrigger value="peerDependencies">Peer Dependencies</TabsTrigger>
          </TabsList>
          <TabsContent value="dependencies" className="space-y-4 pt-4">
            <div className="h-[240px] rounded-lg bg-muted/50 p-6">
              <div className="flex h-full flex-col items-center justify-center gap-2">
                <div className="text-center text-sm text-muted-foreground">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-lg bg-primary/10 p-4 text-center">
                      <div className="text-xl font-bold">78</div>
                      <div className="text-xs text-muted-foreground">Production</div>
                    </div>
                    <div className="rounded-lg bg-primary/10 p-4 text-center">
                      <div className="text-xl font-bold">12</div>
                      <div className="text-xs text-muted-foreground">Outdated</div>
                    </div>
                    <div className="rounded-lg bg-primary/10 p-4 text-center">
                      <div className="text-xl font-bold">2.4 MB</div>
                      <div className="text-xs text-muted-foreground">Size</div>
                    </div>
                    <div className="rounded-lg bg-primary/10 p-4 text-center">
                      <div className="text-xl font-bold">2</div>
                      <div className="text-xs text-muted-foreground">Vulnerabilities</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="devDependencies" className="space-y-4 pt-4">
            <div className="h-[240px] rounded-lg bg-muted/50 p-6">
              <div className="flex h-full flex-col items-center justify-center gap-2">
                <div className="text-center text-sm text-muted-foreground">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-lg bg-primary/10 p-4 text-center">
                      <div className="text-xl font-bold">42</div>
                      <div className="text-xs text-muted-foreground">Development</div>
                    </div>
                    <div className="rounded-lg bg-primary/10 p-4 text-center">
                      <div className="text-xl font-bold">8</div>
                      <div className="text-xs text-muted-foreground">Outdated</div>
                    </div>
                    <div className="rounded-lg bg-primary/10 p-4 text-center">
                      <div className="text-xl font-bold">1.8 MB</div>
                      <div className="text-xs text-muted-foreground">Size</div>
                    </div>
                    <div className="rounded-lg bg-primary/10 p-4 text-center">
                      <div className="text-xl font-bold">1</div>
                      <div className="text-xs text-muted-foreground">Vulnerabilities</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="peerDependencies" className="space-y-4 pt-4">
            <div className="h-[240px] rounded-lg bg-muted/50 p-6">
              <div className="flex h-full flex-col items-center justify-center gap-2">
                <div className="text-center text-sm text-muted-foreground">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-lg bg-primary/10 p-4 text-center">
                      <div className="text-xl font-bold">7</div>
                      <div className="text-xs text-muted-foreground">Peer</div>
                    </div>
                    <div className="rounded-lg bg-primary/10 p-4 text-center">
                      <div className="text-xl font-bold">3</div>
                      <div className="text-xs text-muted-foreground">Outdated</div>
                    </div>
                    <div className="rounded-lg bg-primary/10 p-4 text-center">
                      <div className="text-xl font-bold">0.2 MB</div>
                      <div className="text-xs text-muted-foreground">Size</div>
                    </div>
                    <div className="rounded-lg bg-primary/10 p-4 text-center">
                      <div className="text-xl font-bold">0</div>
                      <div className="text-xs text-muted-foreground">Vulnerabilities</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

