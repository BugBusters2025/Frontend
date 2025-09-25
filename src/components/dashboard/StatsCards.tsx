import { AlertTriangle, Clock, CheckCircle, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const stats = [
  {
    name: "Total Issues",
    value: "1,247",
    icon: AlertTriangle,
    change: "+12%",
    changeType: "increase" as const,
    color: "text-primary",
  },
  {
    name: "In Progress",
    value: "89",
    icon: Clock,
    change: "+4%",
    changeType: "increase" as const,
    color: "text-warning",
  },
  {
    name: "Resolved",
    value: "1,043",
    icon: CheckCircle,
    change: "+8%",
    changeType: "increase" as const,
    color: "text-success",
  },
  {
    name: "Active Users",
    value: "2,350",
    icon: Users,
    change: "+15%",
    changeType: "increase" as const,
    color: "text-secondary",
  },
];

export default function StatsCards() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.name} className="relative overflow-hidden shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.name}
            </CardTitle>
            <stat.icon className={`h-5 w-5 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{stat.value}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-success font-medium">{stat.change}</span> from last month
            </p>
          </CardContent>
          <div className="absolute inset-x-0 bottom-0 h-1 bg-stats-gradient" />
        </Card>
      ))}
    </div>
  );
}