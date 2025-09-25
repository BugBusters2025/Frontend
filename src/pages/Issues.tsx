import IssueTable from "@/components/issues/IssueTable";
import AddIssueModal from "@/components/modals/AddIssueModal";
import { Button } from "@/components/ui/button";
import { Download, Map } from "lucide-react";
import { useState } from "react";

export default function Issues() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleIssueAdded = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Issues</h1>
          <p className="text-muted-foreground">
            Manage and track all civic issue reports
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline">
            <Map className="h-4 w-4 mr-2" />
            Map View
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <AddIssueModal onIssueAdded={handleIssueAdded} />
        </div>
      </div>

      {/* Issue Table */}
      <IssueTable refreshTrigger={refreshTrigger} />
    </div>
  );
}