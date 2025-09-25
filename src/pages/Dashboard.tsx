import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StatsCards from "@/components/dashboard/StatsCards";
import IssueTable from "@/components/issues/IssueTable";

const monthlyData = [
  { month: "Jan", issues: 65, resolved: 45 },
  { month: "Feb", issues: 78, resolved: 52 },
  { month: "Mar", issues: 90, resolved: 68 },
  { month: "Apr", issues: 81, resolved: 71 },
  { month: "May", issues: 95, resolved: 83 },
  { month: "Jun", issues: 112, resolved: 97 },
];

const categoryData = [
  { category: "Roads", count: 345 },
  { category: "Lighting", count: 234 },
  { category: "Water", count: 189 },
  { category: "Waste", count: 156 },
  { category: "Parks", count: 123 },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">
          Monitor civic issues and system performance
        </p>
      </div>

      {/* Stats Cards */}
      <StatsCards />

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Trends */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Monthly Issue Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {monthlyData.map((data) => (
                <div key={data.month} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{data.month}</span>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-primary rounded-full"></div>
                      <span className="text-sm text-muted-foreground">Issues: {data.issues}</span>
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

        {/* Category Breakdown */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Issues by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {categoryData.map((data) => (
                <div key={data.category} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{data.category}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full" 
                        style={{ width: `${(data.count / 345) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-muted-foreground">{data.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Issues Table */}
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-4">Recent Issues</h2>
        <IssueTable />
      </div>
    </div>
  );
}