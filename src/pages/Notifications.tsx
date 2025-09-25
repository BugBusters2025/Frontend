import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Bell, Send, Settings, Check, Clock } from "lucide-react";

const notifications = [
  {
    id: 1,
    title: "Issue ISS-001 has been resolved",
    message: "Pothole on Main Street has been successfully repaired by the maintenance team.",
    type: "success",
    timestamp: "2 minutes ago",
    read: false,
  },
  {
    id: 2,
    title: "New high priority issue reported",
    message: "Water leak reported near Elementary School - requires immediate attention.",
    type: "urgent",
    timestamp: "15 minutes ago",
    read: false,
  },
  {
    id: 3,
    title: "Weekly analytics report ready",
    message: "Your weekly civic issues analytics report is now available for download.",
    type: "info",
    timestamp: "1 hour ago",
    read: true,
  },
  {
    id: 4,
    title: "System maintenance scheduled",
    message: "Scheduled maintenance will occur tonight from 2 AM to 4 AM EST.",
    type: "warning",
    timestamp: "3 hours ago",
    read: true,
  },
];

const getNotificationColor = (type: string) => {
  switch (type) {
    case "success":
      return "bg-success text-success-foreground";
    case "urgent":
      return "bg-destructive text-destructive-foreground";
    case "warning":
      return "bg-warning text-warning-foreground";
    case "info":
      return "bg-info text-info-foreground";
    default:
      return "bg-muted text-muted-foreground";
  }
};

export default function Notifications() {
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Notifications</h1>
          <p className="text-muted-foreground">
            Manage system notifications and alerts
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Configure
          </Button>
          <Button>
            <Send className="h-4 w-4 mr-2" />
            Send Alert
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Notification Settings */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Settings className="h-5 w-5 mr-2" />
              Notification Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Push Notifications</div>
                <div className="text-sm text-muted-foreground">Browser notifications</div>
              </div>
              <Switch
                checked={pushNotifications}
                onCheckedChange={setPushNotifications}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Email Notifications</div>
                <div className="text-sm text-muted-foreground">Email alerts for important events</div>
              </div>
              <Switch
                checked={emailNotifications}
                onCheckedChange={setEmailNotifications}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">SMS Notifications</div>
                <div className="text-sm text-muted-foreground">Text message alerts</div>
              </div>
              <Switch
                checked={smsNotifications}
                onCheckedChange={setSmsNotifications}
              />
            </div>
          </CardContent>
        </Card>

        {/* Recent Notifications */}
        <Card className="shadow-md lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center">
                <Bell className="h-5 w-5 mr-2" />
                Recent Notifications
              </span>
              <Button variant="ghost" size="sm">
                Mark all as read
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 rounded-lg border ${
                    notification.read ? "bg-muted/30" : "bg-card"
                  } hover:bg-muted/50 transition-colors`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <Badge className={getNotificationColor(notification.type)}>
                          {notification.type}
                        </Badge>
                        {!notification.read && (
                          <div className="h-2 w-2 bg-primary rounded-full" />
                        )}
                      </div>
                      <h4 className="font-medium text-foreground mb-1">
                        {notification.title}
                      </h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        {notification.message}
                      </p>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Clock className="h-3 w-3 mr-1" />
                        {notification.timestamp}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {notification.read ? (
                        <Check className="h-4 w-4 text-success" />
                      ) : (
                        <Button variant="ghost" size="sm">
                          <Check className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Notification Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sent Today</CardTitle>
            <Send className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">1,247</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-success font-medium">+15%</span> from yesterday
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Delivery Rate</CardTitle>
            <Check className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">98.7%</div>
            <p className="text-xs text-muted-foreground">
              Successful deliveries
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Subscribers</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">2,350</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-success font-medium">+7</span> new subscribers
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}