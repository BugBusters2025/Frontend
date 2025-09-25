import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, TrendingUp, Clock, MapPin } from "lucide-react";

const resolutionTimeData = [
  { category: "Roads", avgTime: 5.2 },
  { category: "Lighting", avgTime: 2.8 },
  { category: "Water", avgTime: 8.1 },
  { category: "Waste", avgTime: 3.5 },
  { category: "Parks", avgTime: 6.7 },
];

const categoryDistribution = [
  { name: "Roads", value: 345, color: "hsl(var(--primary))" },
  { name: "Lighting", value: 234, color: "hsl(var(--secondary))" },
  { name: "Water", value: 189, color: "hsl(var(--success))" },
  { name: "Waste", value: 156, color: "hsl(var(--warning))" },
  { name: "Parks", value: 123, color: "hsl(var(--info))" },
];

const weeklyTrends = [
  { week: "Week 1", reported: 45, resolved: 38 },
  { week: "Week 2", reported: 52, resolved: 41 },
  { week: "Week 3", reported: 61, resolved: 55 },
  { week: "Week 4", reported: 48, resolved: 52 },
];

export default function Analytics() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
          <p className="text-muted-foreground">
            Detailed insights and performance metrics
          </p>
        </div>
        <Button>
          <Download className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Resolution Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">4.8 days</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-success font-medium">-12%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolution Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">87.3%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-success font-medium">+5%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Most Active Area</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">Downtown</div>
            <p className="text-xs text-muted-foreground">
              245 issues this month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Resolution Time by Category */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Average Resolution Time by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {resolutionTimeData.map((data) => (
                <div key={data.category} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{data.category}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full" 
                        style={{ width: `${(data.avgTime / 10) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-muted-foreground">{data.avgTime} days</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Category Distribution */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Issue Distribution by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {categoryDistribution.map((data) => (
                <div key={data.name} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{data.name}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full" 
                        style={{ width: `${(data.value / 345) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-muted-foreground">{data.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Weekly Trends */}
        <Card className="shadow-md lg:col-span-2">
          <CardHeader>
            <CardTitle>Weekly Issue Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {weeklyTrends.map((data) => (
                <div key={data.week} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{data.week}</span>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-primary rounded-full"></div>
                      <span className="text-sm text-muted-foreground">Reported: {data.reported}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-success rounded-full"></div>
                      <span className="text-sm text-muted-foreground">Resolved: {data.resolved}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}