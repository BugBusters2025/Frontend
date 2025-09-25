import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Settings as SettingsIcon, Save, Trash2, Plus, Globe } from "lucide-react";

const categories = [
  { id: 1, name: "Roads", color: "primary", active: true },
  { id: 2, name: "Lighting", color: "secondary", active: true },
  { id: 3, name: "Water", color: "success", active: true },
  { id: 4, name: "Waste Management", color: "warning", active: true },
  { id: 5, name: "Parks", color: "info", active: true },
  { id: 6, name: "Vandalism", color: "destructive", active: false },
];

const priorityLevels = [
  { id: 1, name: "Low", color: "muted", escalationDays: 14 },
  { id: 2, name: "Medium", color: "warning", escalationDays: 7 },
  { id: 3, name: "High", color: "destructive", escalationDays: 3 },
];

export default function Settings() {
  const [systemName, setSystemName] = useState("CivicAdmin Dashboard");
  const [defaultLanguage, setDefaultLanguage] = useState("en");
  const [autoAssignment, setAutoAssignment] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground">
            Configure system settings and preferences
          </p>
        </div>
        <Button>
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* System Configuration */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center">
              <SettingsIcon className="h-5 w-5 mr-2" />
              System Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="system-name">System Name</Label>
              <Input
                id="system-name"
                value={systemName}
                onChange={(e) => setSystemName(e.target.value)}
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="default-language">Default Language</Label>
              <Select value={defaultLanguage} onValueChange={setDefaultLanguage}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="hi">Hindi</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Auto Assignment</div>
                <div className="text-sm text-muted-foreground">
                  Automatically assign issues to available resolvers
                </div>
              </div>
              <Switch
                checked={autoAssignment}
                onCheckedChange={setAutoAssignment}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Email Notifications</div>
                <div className="text-sm text-muted-foreground">
                  Send email notifications for system events
                </div>
              </div>
              <Switch
                checked={emailNotifications}
                onCheckedChange={setEmailNotifications}
              />
            </div>
          </CardContent>
        </Card>

        {/* Issue Categories */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Issue Categories</span>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Category
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <Badge
                      className={`bg-${category.color} text-${category.color}-foreground`}
                    >
                      {category.name}
                    </Badge>
                    {!category.active && (
                      <span className="text-sm text-muted-foreground">(Inactive)</span>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Priority Levels */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Priority Levels</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {priorityLevels.map((priority) => (
                <div
                  key={priority.id}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <Badge
                      className={`bg-${priority.color} text-${priority.color}-foreground`}
                    >
                      {priority.name}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      Escalates in {priority.escalationDays} days
                    </span>
                  </div>
                  <Button variant="ghost" size="sm">
                    Edit
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Localization */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Globe className="h-5 w-5 mr-2" />
              Localization
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Supported Languages</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                <Badge variant="outline">English</Badge>
                <Badge variant="outline">Hindi</Badge>
                <Badge variant="outline">Spanish</Badge>
                <Button variant="ghost" size="sm" className="text-xs">
                  <Plus className="h-3 w-3 mr-1" />
                  Add Language
                </Button>
              </div>
            </div>
            
            <div>
              <Label htmlFor="timezone">Timezone</Label>
              <Select defaultValue="utc">
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="utc">UTC</SelectItem>
                  <SelectItem value="est">Eastern Time</SelectItem>
                  <SelectItem value="pst">Pacific Time</SelectItem>
                  <SelectItem value="ist">India Standard Time</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="date-format">Date Format</Label>
              <Select defaultValue="mm-dd-yyyy">
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mm-dd-yyyy">MM/DD/YYYY</SelectItem>
                  <SelectItem value="dd-mm-yyyy">DD/MM/YYYY</SelectItem>
                  <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}