import { useState, useCallback } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import {
  Upload,
  FileSpreadsheet,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Download
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImportResults {
  created: number;
  updated: number;
  skipped: number;
  errors: { row: number; error: string; companyName?: string }[];
}

interface CSVImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImportComplete: () => void;
}

// CSV column headers expected
const expectedHeaders = [
  'store_name',
  'phone',
  'owner_manager',
  'notes',
  'status',
  'email_primary',
  'email_secondary',
  'street',
  'city',
  'province',
  'postal_code',
  'website',
  'facebook',
  'instagram',
  'category'
];

export default function CSVImportModal({
  isOpen,
  onClose,
  onImportComplete
}: CSVImportModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [parsedData, setParsedData] = useState<Record<string, string>[]>([]);
  const [importMode, setImportMode] = useState<'skip' | 'update'>('skip');
  const [isImporting, setIsImporting] = useState(false);
  const [importProgress, setImportProgress] = useState(0);
  const [results, setResults] = useState<ImportResults | null>(null);
  const [error, setError] = useState<string | null>(null);

  const parseCSV = useCallback((text: string): Record<string, string>[] => {
    const lines = text.split('\n').filter((line) => line.trim());
    if (lines.length < 2) return [];

    // Parse headers
    const headers = lines[0].split(',').map((h) => h.trim().toLowerCase().replace(/"/g, ''));

    // Parse data rows
    const data: Record<string, string>[] = [];
    for (let i = 1; i < lines.length; i++) {
      const values = parseCSVLine(lines[i]);
      const row: Record<string, string> = {};
      headers.forEach((header, idx) => {
        row[header] = values[idx]?.trim().replace(/^"|"$/g, '') || '';
      });
      if (row.store_name) {
        data.push(row);
      }
    }
    return data;
  }, []);

  // Handle CSV values with quotes and commas
  const parseCSVLine = (line: string): string[] => {
    const result: string[] = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        result.push(current);
        current = '';
      } else {
        current += char;
      }
    }
    result.push(current);
    return result;
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    setError(null);
    setResults(null);

    if (!selectedFile) {
      setFile(null);
      setParsedData([]);
      return;
    }

    if (!selectedFile.name.endsWith('.csv')) {
      setError('Please select a CSV file');
      return;
    }

    setFile(selectedFile);

    try {
      const text = await selectedFile.text();
      const data = parseCSV(text);

      if (data.length === 0) {
        setError('No valid data found in CSV. Make sure the first column header is "store_name".');
        setParsedData([]);
        return;
      }

      setParsedData(data);
    } catch {
      setError('Failed to parse CSV file');
      setParsedData([]);
    }
  };

  const handleImport = async () => {
    if (parsedData.length === 0) return;

    setIsImporting(true);
    setImportProgress(0);
    setError(null);

    try {
      const response = await fetch('/api/admin/ops/leads/import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          leads: parsedData,
          mode: importMode
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Import failed');
      }

      const { results: importResults } = await response.json();
      setResults(importResults);
      setImportProgress(100);
      onImportComplete();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Import failed');
    } finally {
      setIsImporting(false);
    }
  };

  const handleClose = () => {
    setFile(null);
    setParsedData([]);
    setResults(null);
    setError(null);
    setImportProgress(0);
    onClose();
  };

  const downloadTemplate = () => {
    const headers = expectedHeaders.join(',');
    const sampleRow = 'Sample Pet Store,555-123-4567,John Doe,Great lead,new,john@petstore.com,,123 Main St,Toronto,ON,M5V 1A1,petstore.com,fb.com/petstore,@petstore,Pet Store';
    const csv = `${headers}\n${sampleRow}`;
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'leads_template.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="sm:max-w-lg bg-white bg-gray-900 border-gray-200 border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-900 text-gray-50">
            Import Leads from CSV
          </DialogTitle>
          <DialogDescription className="text-gray-600 text-gray-400">
            Upload a CSV file with lead data. The file should have a header row with column names.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Template Download */}
          <div className="flex items-center justify-between p-3 bg-gray-50 bg-gray-800 rounded-lg border border-gray-200 border-gray-700">
            <div className="text-sm text-gray-600 text-gray-400">
              Need a template?
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={downloadTemplate}
              className="border-gray-200 border-gray-700 text-gray-700 text-gray-300"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Template
            </Button>
          </div>

          {/* File Upload */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700 text-gray-300">
              CSV File
            </Label>
            <div
              className={cn(
                'border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors',
                file
                  ? 'border-teal-500 border-teal-400 bg-teal-50 bg-teal-900/20'
                  : 'border-gray-300 border-gray-600 hover:border-gray-400 hover:border-gray-500'
              )}
            >
              <input
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                className="hidden"
                id="csv-upload"
              />
              <label htmlFor="csv-upload" className="cursor-pointer">
                {file ? (
                  <div className="flex flex-col items-center">
                    <FileSpreadsheet className="w-10 h-10 text-teal-500 text-teal-400 mb-2" />
                    <p className="font-medium text-gray-900 text-gray-100">{file.name}</p>
                    <p className="text-sm text-gray-500 text-gray-400">
                      {parsedData.length} leads found
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <Upload className="w-10 h-10 text-gray-400 text-gray-500 mb-2" />
                    <p className="text-gray-600 text-gray-400">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-sm text-gray-400 text-gray-500">CSV files only</p>
                  </div>
                )}
              </label>
            </div>
          </div>

          {/* Import Mode */}
          {parsedData.length > 0 && !results && (
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700 text-gray-300">
                Duplicate Handling
              </Label>
              <Select value={importMode} onValueChange={(v) => setImportMode(v as 'skip' | 'update')}>
                <SelectTrigger className="bg-white bg-gray-800 border-gray-200 border-gray-700 text-gray-900 text-gray-100">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white bg-gray-800 border-gray-200 border-gray-700">
                  <SelectItem value="skip" className="text-gray-900 text-gray-100">
                    Skip duplicates (recommended)
                  </SelectItem>
                  <SelectItem value="update" className="text-gray-900 text-gray-100">
                    Update existing leads
                  </SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-gray-500 text-gray-400">
                Duplicates are detected by matching company name and city.
              </p>
            </div>
          )}

          {/* Progress */}
          {isImporting && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm text-gray-600 text-gray-400">
                <span>Importing leads...</span>
                <span>{importProgress}%</span>
              </div>
              <Progress value={importProgress} className="h-2" />
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="flex items-start p-3 bg-red-50 bg-red-900/20 border border-red-200 border-red-800 rounded-lg">
              <AlertCircle className="w-5 h-5 text-red-500 text-red-400 mr-2 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-700 text-red-300">{error}</p>
            </div>
          )}

          {/* Results */}
          {results && (
            <div className="space-y-3 p-4 bg-gray-50 bg-gray-800 rounded-lg border border-gray-200 border-gray-700">
              <h4 className="font-medium text-gray-900 text-gray-100">Import Complete</h4>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-2 bg-green-50 bg-green-900/20 rounded-lg">
                  <CheckCircle2 className="w-5 h-5 text-green-500 text-green-400 mx-auto mb-1" />
                  <div className="text-lg font-semibold text-green-700 text-green-300">
                    {results.created}
                  </div>
                  <div className="text-xs text-green-600 text-green-400">Created</div>
                </div>
                <div className="p-2 bg-blue-50 bg-blue-900/20 rounded-lg">
                  <CheckCircle2 className="w-5 h-5 text-blue-500 text-blue-400 mx-auto mb-1" />
                  <div className="text-lg font-semibold text-blue-700 text-blue-300">
                    {results.updated}
                  </div>
                  <div className="text-xs text-blue-600 text-blue-400">Updated</div>
                </div>
                <div className="p-2 bg-gray-100 bg-gray-700 rounded-lg">
                  <XCircle className="w-5 h-5 text-gray-500 text-gray-400 mx-auto mb-1" />
                  <div className="text-lg font-semibold text-gray-700 text-gray-300">
                    {results.skipped}
                  </div>
                  <div className="text-xs text-gray-600 text-gray-400">Skipped</div>
                </div>
              </div>
              {results.errors.length > 0 && (
                <div className="mt-3 p-3 bg-red-50 bg-red-900/20 rounded-lg">
                  <p className="text-sm font-medium text-red-700 text-red-300 mb-2">
                    {results.errors.length} errors occurred:
                  </p>
                  <div className="max-h-32 overflow-y-auto space-y-1">
                    {results.errors.slice(0, 10).map((err, idx) => (
                      <p key={idx} className="text-xs text-red-600 text-red-400">
                        Row {err.row}: {err.error}
                        {err.companyName && ` (${err.companyName})`}
                      </p>
                    ))}
                    {results.errors.length > 10 && (
                      <p className="text-xs text-red-600 text-red-400">
                        ...and {results.errors.length - 10} more errors
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <DialogFooter>
          {results ? (
            <Button
              onClick={handleClose}
              className="w-full bg-teal-500 bg-teal-600 text-white text-gray-100 hover:bg-teal-600 hover:bg-teal-700"
            >
              Done
            </Button>
          ) : (
            <div className="flex w-full space-x-3">
              <Button
                variant="outline"
                onClick={handleClose}
                className="flex-1 border-gray-200 border-gray-700 text-gray-700 text-gray-300"
              >
                Cancel
              </Button>
              <Button
                onClick={handleImport}
                disabled={parsedData.length === 0 || isImporting}
                className="flex-1 bg-teal-500 bg-teal-600 text-white text-gray-100 hover:bg-teal-600 hover:bg-teal-700"
              >
                {isImporting ? 'Importing...' : `Import ${parsedData.length} Leads`}
              </Button>
            </div>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
