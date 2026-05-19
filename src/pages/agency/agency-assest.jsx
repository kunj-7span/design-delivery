import { use, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Upload, FileText, Clock } from "lucide-react";
import { toast } from "sonner";
import { Controller } from "react-hook-form";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { useForm } from "react-hook-form";

export default function Asset() {
  const [versions, setVersions] = useState([
    {
      id: 1,
      label: "v1 — initial draft",
      status: "Rejected",
      uploadDate: "May 10",
      fileType: "PDF",
      notes: "Colors don't match brand guide. Please revise the palette.",
    },
    {
      id: 2,
      label: "v2 — revised colors",
      status: "In review",
      uploadDate: "May 14",
      fileType: "PNG",
      notes: "Awaiting client review...",
    },
  ]);

  const [versionLabel, setVersionLabel] = useState("");
  const [notes, setNotes] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    defaultValues: {
      versionLabel: "",
      notes: "",
      title: "",
      description: "",
    },
  });

  const asset = {
    id: 1,
    name: "Social media kit",
    status: "Rejected",
    dueDate: "Jun 12, 2025",
    assignedTo: "you",
    clients: ["TechCorp Rebrand", "TechCorp Inc."],
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Rejected":
        return "bg-red-600 text-white";
      case "In review":
        return "bg-yellow-600 text-white";
      case "Approved":
        return "bg-green-600 text-white";
      default:
        return "bg-gray-600 text-white";
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      const validTypes = ["image/png", "image/jpeg", "application/pdf"];
      const maxSize = 20 * 1024 * 1024; // 20 MB

      if (!validTypes.includes(file.type)) {
        toast.error("Invalid file type. Only PNG, JPG, and PDF are allowed.");
        return;
      }

      if (file.size > maxSize) {
        toast.error("File size exceeds 20 MB limit.");
        return;
      }

      setUploadedFile(file);
      toast.success(`File "${file.name}" selected!`);
    }
  };

  const handleFileInput = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      const file = files[0];
      const validTypes = ["image/png", "image/jpeg", "application/pdf"];
      const maxSize = 20 * 1024 * 1024;

      if (!validTypes.includes(file.type)) {
        toast.error("Invalid file type. Only PNG, JPG, and PDF are allowed.");
        return;
      }

      if (file.size > maxSize) {
        toast.error("File size exceeds 20 MB limit.");
        return;
      }

      setUploadedFile(file);
      toast.success(`File "${file.name}" selected!`);
    }
  };

  const handleUpload = async () => {
    if (!uploadedFile) {
      toast.error("Please select a file to upload.");
      return;
    }

    if (!versionLabel.trim()) {
      toast.error("Please enter a version label.");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const fileType = uploadedFile.type === "application/pdf" ? "PDF" : "PNG";
      const today = new Date();
      const dateStr = today.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });

      const newVersion = {
        id: versions.length + 1,
        label: versionLabel,
        status: "Pending Review",
        uploadDate: dateStr,
        fileType: fileType,
        notes: notes || "No notes added.",
      };

      setVersions([newVersion, ...versions]);
      setVersionLabel("");
      setNotes("");
      setUploadedFile(null);
      setIsLoading(false);

      // Generate a mock link
      const shareLink = `https://design-delivery.com/assets/${asset.id}/v${versions.length + 1}`;
      toast.success(`Version uploaded! Share link: ${shareLink}`);
    }, 1500);
  };

  return (
    <div className="w-full min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 px-4 sm:px-6 md:px-8 py-4 sm:py-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start justify-between gap-4 sm:gap-6">
          <div className="flex items-start gap-3 sm:gap-4 w-full sm:w-auto">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded border border-gray-300 flex items-center justify-center shrink-0">
              <FileText size={20} className="sm:w-6 sm:h-6 text-gray-600" />
            </div>
            <div className="flex-1 sm:flex-none">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-900 wrap-break-word">
                {asset.name}
              </h1>
              <div className="flex flex-wrap items-center gap-1 sm:gap-2 mt-2 text-gray-600 text-xs sm:text-sm">
                {asset.clients.map((client, idx) => (
                  <span key={idx} className="wrap-break-word">
                    {client}
                    {idx < asset.clients.length - 1 && (
                      <span className="mx-1">•</span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <Badge
            className={`${getStatusColor(asset.status)} shrink-0 text-xs sm:text-sm`}
          >
            {asset.status}
          </Badge>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 sm:px-6 md:px-8 py-6 sm:py-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Upload Section */}
          <div className="col-span-1 lg:col-span-2">
            <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-6 flex items-center gap-2">
              <Upload size={18} className="sm:w-5 sm:h-5 shrink-0" />
              <span className="wrap-break-word">Upload new version</span>
            </h2>

            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-lg p-4 sm:p-6 md:p-8 text-center bg-gray-50 mb-4 sm:mb-6 cursor-pointer transition ${
                isDragOver ? "border-blue-500 bg-blue-50" : "border-gray-300"
              }`}
            >
              <input
                type="file"
                id="file-input"
                accept=".png,.jpg,.jpeg,.pdf"
                onChange={handleFileInput}
                className="hidden"
              />
              <label htmlFor="file-input" className="cursor-pointer block">
                <div className="flex items-center justify-center mb-3 sm:mb-4">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 border border-gray-400 rounded flex items-center justify-center">
                    <Upload size={18} className="sm:w-5 sm:h-5 text-gray-600" />
                  </div>
                </div>
                <p className="text-gray-700 mb-1 sm:mb-2 text-sm sm:text-base wrap-break-word">
                  {uploadedFile
                    ? `Selected: ${uploadedFile.name}`
                    : "Drag & drop image or PDF"}
                </p>
                <p className="text-gray-500 text-xs sm:text-sm">
                  PNG, JPG, PDF • Max 20 MB
                </p>
              </label>
            </div>

            <div className="mb-3 sm:mb-4">
              <Field>
                <FieldLabel htmlFor="input-demo-api-versionLabel">
                  Version Label
                </FieldLabel>
                <Input id="input-demo-api-versionLabel" placeholder="e.g. v2" />
              </Field>
            </div>

            <div className="mb-4 sm:mb-6">
              <FieldGroup>
                <Controller
                  name="Notes for client (optional)"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="form-rhf-demo-description">
                        Notes for client (optional)
                      </FieldLabel>
                      <InputGroup>
                        <InputGroupTextarea
                          {...field}
                          id="form-rhf-demo-description"
                          placeholder="Add any notes for feedback"
                          rows={6}
                          className="min-h-24 resize-none"
                          aria-invalid={fieldState.invalid}
                        />
                        <InputGroupAddon align="block-end">
                          <InputGroupText className="tabular-nums">
                            {field.value?.length}/200 characters
                          </InputGroupText>
                        </InputGroupAddon>
                      </InputGroup>

                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </FieldGroup>
            </div>

            <Button
              onClick={handleUpload}
              disabled={isLoading}
              className="w-full text-white disabled:opacity-50 text-sm sm:text-base"
            >
              {isLoading ? "Uploading..." : "Upload & generate link"}
            </Button>
          </div>

          {/* Version History */}
          <div className="col-span-1">
            <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-6 flex items-center gap-2">
              <Clock size={18} className="sm:w-5 sm:h-5 shrink-0" />
              <span className="wrap-break-word">Version history</span>
            </h2>

            <div className="space-y-3 sm:space-y-4">
              {versions.map((version) => (
                <div
                  key={version.id}
                  className="border border-gray-200 rounded-lg p-3 sm:p-4 bg-white"
                >
                  <div className="flex flex-col sm:flex-row items-start justify-between gap-2 sm:gap-3 mb-3">
                    <div className="flex-1">
                      <p className="text-gray-900 font-medium text-sm sm:text-base wrap-break-word">
                        {version.label}
                      </p>
                      <p className="text-gray-600 text-xs sm:text-sm wrap-break-words">
                        Uploaded {version.uploadDate} • {version.fileType}
                      </p>
                    </div>
                    <Badge
                      className={`${getStatusColor(version.status)} shrink-0 text-xs`}
                    >
                      {version.status}
                    </Badge>
                  </div>
                  <p className="text-gray-700 text-xs sm:text-sm bg-gray-50 p-2 sm:p-3 rounded border border-gray-200 wrap-break-word">
                    "{version.notes}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
