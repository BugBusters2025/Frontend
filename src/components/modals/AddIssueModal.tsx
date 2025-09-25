import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { issueService } from '@/services/issueService';
import { Plus } from 'lucide-react';
import { useState } from 'react';

interface AddIssueModalProps {
  onIssueAdded?: () => void;
}

export default function AddIssueModal({ onIssueAdded }: AddIssueModalProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    priority: 'medium',
    reporterName: '',
    reporterEmail: '',
    reporterPhone: '',
    address: ''
  });

  const categories = [
    'Roads', 'Lighting', 'Water', 'Waste Management', 
    'Vandalism', 'Public Safety', 'Parks', 'Transportation'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || !formData.category || 
        !formData.reporterName || !formData.reporterEmail || !formData.address) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      await issueService.createIssue({
        title: formData.title,
        description: formData.description,
        category: formData.category,
        status: 'pending',
        priority: formData.priority as 'low' | 'medium' | 'high',
        reporter: {
          name: formData.reporterName,
          email: formData.reporterEmail,
          phone: formData.reporterPhone
        },
        location: {
          address: formData.address
        }
      });

      toast({
        title: "Success",
        description: "Issue has been created successfully"
      });

      // Reset form
      setFormData({
        title: '',
        description: '',
        category: '',
        priority: 'medium',
        reporterName: '',
        reporterEmail: '',
        reporterPhone: '',
        address: ''
      });
      
      setOpen(false);
      onIssueAdded?.();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create issue. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Issue
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Report New Issue</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Issue Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="Brief description of the issue"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Detailed description of the issue"
              rows={3}
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select value={formData.priority} onValueChange={(value) => handleInputChange('priority', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="address">Location *</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                placeholder="Street address or landmark"
                required
              />
            </div>
          </div>
          
          <div className="border-t pt-4">
            <h4 className="font-medium mb-3">Reporter Information</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="reporterName">Name *</Label>
                <Input
                  id="reporterName"
                  value={formData.reporterName}
                  onChange={(e) => handleInputChange('reporterName', e.target.value)}
                  placeholder="Reporter's full name"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="reporterEmail">Email *</Label>
                <Input
                  id="reporterEmail"
                  type="email"
                  value={formData.reporterEmail}
                  onChange={(e) => handleInputChange('reporterEmail', e.target.value)}
                  placeholder="reporter@example.com"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2 mt-4">
              <Label htmlFor="reporterPhone">Phone (Optional)</Label>
              <Input
                id="reporterPhone"
                value={formData.reporterPhone}
                onChange={(e) => handleInputChange('reporterPhone', e.target.value)}
                placeholder="+91 9xxxxxxxx"
              />
            </div>
          </div>
          
          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Creating...' : 'Create Issue'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}