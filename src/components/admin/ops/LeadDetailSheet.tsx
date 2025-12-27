import { useState, useEffect } from 'react';
import { Lead, LeadStatus } from '@prisma/client';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LeadStatusBadge, { statusConfig } from './LeadStatusBadge';
import {
  Building2,
  User,
  Phone,
  Mail,
  Globe,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Clock,
  FileText,
  Save,
  X
} from 'lucide-react';

interface LeadDetailSheetProps {
  lead: Lead | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (lead: Partial<Lead>) => Promise<void>;
  mode: 'view' | 'edit' | 'create';
}

const emptyLead: Partial<Lead> = {
  companyName: '',
  contactName: '',
  phone: '',
  email: '',
  emailSecondary: '',
  street: '',
  city: '',
  province: '',
  postalCode: '',
  neighborhood: '',
  website: '',
  facebook: '',
  instagram: '',
  tiktok: '',
  youtube: '',
  twitter: '',
  openingHours: '',
  category: '',
  notes: '',
  status: 'NEW'
};

export default function LeadDetailSheet({
  lead,
  isOpen,
  onClose,
  onSave,
  mode
}: LeadDetailSheetProps) {
  const [formData, setFormData] = useState<Partial<Lead>>(emptyLead);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('basic');

  useEffect(() => {
    if (lead && mode !== 'create') {
      setFormData(lead);
    } else {
      setFormData(emptyLead);
    }
    setActiveTab('basic');
  }, [lead, mode, isOpen]);

  const handleChange = (field: keyof Lead, value: string | boolean | null) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setIsSaving(true);
    try {
      await onSave(formData);
      onClose();
    } finally {
      setIsSaving(false);
    }
  };

  const isViewMode = mode === 'view';
  const title =
    mode === 'create'
      ? 'Add New Lead'
      : mode === 'edit'
        ? 'Edit Lead'
        : lead?.companyName || 'Lead Details';

  const InputField = ({
    label,
    field,
    icon: Icon,
    type = 'text',
    placeholder
  }: {
    label: string;
    field: keyof Lead;
    icon?: React.ElementType;
    type?: string;
    placeholder?: string;
  }) => (
    <div className="space-y-2">
      <Label
        htmlFor={field}
        className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center"
      >
        {Icon && <Icon className="w-4 h-4 mr-2 text-gray-400 dark:text-gray-500" />}
        {label}
      </Label>
      {isViewMode ? (
        <div className="text-gray-900 dark:text-gray-100 py-2">
          {(formData[field] as string) || (
            <span className="text-gray-400 dark:text-gray-500">Not provided</span>
          )}
        </div>
      ) : (
        <Input
          id={field}
          type={type}
          value={(formData[field] as string) || ''}
          onChange={(e) => handleChange(field, e.target.value)}
          placeholder={placeholder}
          className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100"
        />
      )}
    </div>
  );

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-lg bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 overflow-y-auto"
      >
        <SheetHeader className="pb-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-xl font-semibold text-gray-900 dark:text-gray-50">
              {title}
            </SheetTitle>
            {!isViewMode && lead && (
              <LeadStatusBadge status={lead.status} />
            )}
          </div>
          {lead && mode === 'view' && (
            <SheetDescription className="text-gray-600 dark:text-gray-400">
              Created {new Date(lead.createdAt).toLocaleDateString()}
              {lead.lastContact && ` · Last contact ${new Date(lead.lastContact).toLocaleDateString()}`}
            </SheetDescription>
          )}
        </SheetHeader>

        <div className="py-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full grid grid-cols-3 bg-gray-100 dark:bg-gray-800">
              <TabsTrigger
                value="basic"
                className="text-gray-700 dark:text-gray-300"
              >
                Basic Info
              </TabsTrigger>
              <TabsTrigger
                value="location"
                className="text-gray-700 dark:text-gray-300"
              >
                Location
              </TabsTrigger>
              <TabsTrigger
                value="social"
                className="text-gray-700 dark:text-gray-300"
              >
                Social
              </TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4 mt-4">
              <InputField label="Company Name" field="companyName" icon={Building2} placeholder="Enter company name" />
              <InputField label="Contact Name" field="contactName" icon={User} placeholder="Owner/Manager name" />
              <InputField label="Phone" field="phone" icon={Phone} type="tel" placeholder="+1 (555) 123-4567" />
              <InputField label="Primary Email" field="email" icon={Mail} type="email" placeholder="contact@company.com" />
              <InputField label="Secondary Email" field="emailSecondary" icon={Mail} type="email" placeholder="backup@company.com" />
              <InputField label="Category" field="category" icon={FileText} placeholder="Pet Store, Veterinary, etc." />
              
              {/* Status Select */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Status
                </Label>
                {isViewMode ? (
                  <div className="py-2">
                    <LeadStatusBadge status={formData.status as LeadStatus} />
                  </div>
                ) : (
                  <Select
                    value={formData.status}
                    onValueChange={(v) => handleChange('status', v)}
                  >
                    <SelectTrigger className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                      {Object.entries(statusConfig).map(([status, config]) => (
                        <SelectItem key={status} value={status} className="text-gray-900 dark:text-gray-100">
                          {config.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>

              {/* Notes */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
                  <FileText className="w-4 h-4 mr-2 text-gray-400 dark:text-gray-500" />
                  Notes
                </Label>
                {isViewMode ? (
                  <div className="text-gray-900 dark:text-gray-100 py-2 whitespace-pre-wrap">
                    {formData.notes || (
                      <span className="text-gray-400 dark:text-gray-500">No notes</span>
                    )}
                  </div>
                ) : (
                  <Textarea
                    value={formData.notes || ''}
                    onChange={(e) => handleChange('notes', e.target.value)}
                    placeholder="Add any notes about this lead..."
                    rows={4}
                    className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100"
                  />
                )}
              </div>
            </TabsContent>

            <TabsContent value="location" className="space-y-4 mt-4">
              <InputField label="Street Address" field="street" icon={MapPin} placeholder="123 Main St" />
              <div className="grid grid-cols-2 gap-4">
                <InputField label="City" field="city" placeholder="Toronto" />
                <InputField label="Province" field="province" placeholder="ON" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <InputField label="Postal Code" field="postalCode" placeholder="A1B 2C3" />
                <InputField label="Neighborhood" field="neighborhood" placeholder="Downtown" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
                  <Clock className="w-4 h-4 mr-2 text-gray-400 dark:text-gray-500" />
                  Opening Hours
                </Label>
                {isViewMode ? (
                  <div className="text-gray-900 dark:text-gray-100 py-2 whitespace-pre-wrap">
                    {formData.openingHours || (
                      <span className="text-gray-400 dark:text-gray-500">Not provided</span>
                    )}
                  </div>
                ) : (
                  <Textarea
                    value={formData.openingHours || ''}
                    onChange={(e) => handleChange('openingHours', e.target.value)}
                    placeholder="Mon-Fri: 9am-5pm&#10;Sat: 10am-4pm&#10;Sun: Closed"
                    rows={3}
                    className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100"
                  />
                )}
              </div>
            </TabsContent>

            <TabsContent value="social" className="space-y-4 mt-4">
              <InputField label="Website" field="website" icon={Globe} placeholder="https://example.com" />
              <InputField label="Facebook" field="facebook" icon={Facebook} placeholder="facebook.com/company" />
              <InputField label="Instagram" field="instagram" icon={Instagram} placeholder="@company" />
              <InputField label="Twitter" field="twitter" icon={Twitter} placeholder="@company" />
              <InputField label="YouTube" field="youtube" icon={Youtube} placeholder="youtube.com/company" />
              <InputField label="TikTok" field="tiktok" placeholder="@company" />
            </TabsContent>
          </Tabs>
        </div>

        <SheetFooter className="pt-4 border-t border-gray-200 dark:border-gray-700">
          {isViewMode ? (
            <Button
              onClick={onClose}
              className="w-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              Close
            </Button>
          ) : (
            <div className="flex w-full space-x-3">
              <Button
                variant="outline"
                onClick={onClose}
                className="flex-1 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300"
              >
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={isSaving || !formData.companyName}
                className="flex-1 bg-teal-500 dark:bg-teal-600 text-white dark:text-gray-100 hover:bg-teal-600 dark:hover:bg-teal-700"
              >
                <Save className="w-4 h-4 mr-2" />
                {isSaving ? 'Saving...' : 'Save'}
              </Button>
            </div>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
