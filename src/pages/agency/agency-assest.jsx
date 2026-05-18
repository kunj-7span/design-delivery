import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Upload, FileText, Clock, Trash2, Edit, X } from "lucide-react";

export default function Asset() {
  const [aavuList, setAavuList] = useState([
    {
      id: 1,
      name: "Social media kit",
      status: "Rejected",
      dueDate: "Jun 12, 2025",
      assignedTo: "you",
      versions: [
        {
          id: 1,
          label: "v1 — initial draft",
          status: "Rejected",
          uploadDate: "May 10",
          notes: "Colors don't match brand guide. Please revise the palette.",
        },
        {
          id: 2,
          label: "v2 — revised colors",
          status: "In review",
          uploadDate: "May 14",
          notes: "Awaiting client review...",
        },
      ],
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [newAavu, setNewAavu] = useState({
    name: "",
    assignedTo: "",
    dueDate: "",
  });

  const handleAddAavu = () => {
    if (newAavu.name.trim()) {
      setAavuList([
        ...aavuList,
        {
          id: aavuList.length + 1,
          name: newAavu.name,
          status: "Pending",
          dueDate: newAavu.dueDate || "Not set",
          assignedTo: newAavu.assignedTo || "Unassigned",
          versions: [],
        },
      ]);
      setNewAavu({ name: "", assignedTo: "", dueDate: "" });
      setShowForm(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Rejected":
        return "bg-red-100 text-red-800";
      case "In review":
        return "bg-yellow-100 text-yellow-800";
      case "Approved":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="w-full min-h-screen bg-white">
      {/* Header Section */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-6 border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
                Aavu Assets
              </h1>
              <p className="text-sm sm:text-base text-gray-600 mt-1">
                Manage your design assets and deliverables
              </p>
            </div>
            <Button
              onClick={() => setShowForm(!showForm)}
              className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto text-sm sm:text-base"
            >
              <Upload size={18} className="mr-2" />
              {showForm ? "Cancel" : "New Asset"}
            </Button>
          </div>
        </div>
      </div>

      {/* Add New Aavu Form */}
      {showForm && (
        <div className="w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-6 bg-gray-50 border-b border-gray-200">
          <div className="max-w-7xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Create New Asset</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Asset Name
                    </label>
                    <Input
                      placeholder="e.g., Social media kit"
                      value={newAavu.name}
                      onChange={(e) =>
                        setNewAavu({ ...newAavu, name: e.target.value })
                      }
                      className="text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Assigned To
                    </label>
                    <Input
                      placeholder="e.g., John Doe"
                      value={newAavu.assignedTo}
                      onChange={(e) =>
                        setNewAavu({ ...newAavu, assignedTo: e.target.value })
                      }
                      className="text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Due Date
                    </label>
                    <Input
                      type="date"
                      value={newAavu.dueDate}
                      onChange={(e) =>
                        setNewAavu({ ...newAavu, dueDate: e.target.value })
                      }
                      className="text-sm"
                    />
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                  <Button
                    onClick={handleAddAavu}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-sm"
                  >
                    Create Asset
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowForm(false)}
                    className="text-sm"
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Assets List */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="max-w-7xl mx-auto">
          {aavuList.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12 sm:py-16">
                <FileText size={48} className="text-gray-300 mb-4" />
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                  No assets yet
                </h3>
                <p className="text-sm sm:text-base text-gray-600 text-center">
                  Create your first asset to get started
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
              {aavuList.map((aavu) => (
                <Card
                  key={aavu.id}
                  className="hover:shadow-lg transition-shadow duration-300 border border-gray-200"
                >
                  {/* Asset Header */}
                  <CardHeader className="pb-3 sm:pb-4">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-3 mb-2">
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-base sm:text-lg text-gray-900 truncate">
                          {aavu.name}
                        </CardTitle>
                      </div>
                      <Badge
                        className={`${getStatusColor(
                          aavu.status,
                        )} whitespace-nowrap text-xs sm:text-sm`}
                      >
                        {aavu.status}
                      </Badge>
                    </div>

                    {/* Meta Info */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">
                      <span className="flex items-center gap-1">
                        <Clock size={14} />
                        Due {aavu.dueDate}
                      </span>
                      <span className="hidden sm:block">•</span>
                      <span>Assigned to {aavu.assignedTo}</span>
                    </div>

                    {/* Upload Section */}
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 sm:p-6 text-center bg-gray-50">
                      <Upload
                        size={28}
                        className="mx-auto text-gray-400 mb-2"
                      />
                      <p className="text-xs sm:text-sm text-gray-600 mb-1">
                        Drag & drop image or PDF
                      </p>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, PDF • Max 20 MB
                      </p>
                    </div>

                    {/* Version Label Input */}
                    <div className="mt-3 sm:mt-4">
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                        Version label (e.g. v2 — revised)
                      </label>
                      <Input
                        placeholder="e.g. v2 — revised colors"
                        className="text-xs sm:text-sm"
                      />
                    </div>

                    {/* Notes */}
                    <div className="mt-3 sm:mt-4">
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                        Notes for client (optional)
                      </label>
                      <Textarea
                        placeholder="Add any notes or feedback..."
                        className="text-xs sm:text-sm min-h-20 resize-none"
                      />
                    </div>

                    {/* Action Button */}
                    <Button className="w-full mt-3 sm:mt-4 bg-gray-800 hover:bg-gray-900 text-white text-sm">
                      Upload & generate link
                    </Button>
                  </CardHeader>

                  {/* Version History */}
                  {aavu.versions.length > 0 && (
                    <div className="border-t border-gray-200 pt-4 sm:pt-6">
                      <h4 className="font-semibold text-gray-900 text-sm sm:text-base px-4 sm:px-6 mb-3 sm:mb-4 flex items-center gap-2">
                        <Clock size={16} />
                        Version history
                      </h4>
                      <div className="px-4 sm:px-6 space-y-3 sm:space-y-4">
                        {aavu.versions.map((version) => (
                          <div
                            key={version.id}
                            className="pb-3 sm:pb-4 border-b border-gray-200 last:border-0"
                          >
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                              <div className="flex items-center gap-2 min-w-0">
                                <FileText
                                  size={16}
                                  className="text-gray-400 shrink-0"
                                />
                                <span className="text-xs sm:text-sm font-medium text-gray-900 truncate">
                                  {version.label}
                                </span>
                              </div>
                              <Badge
                                className={`${getStatusColor(
                                  version.status,
                                )} whitespace-nowrap text-xs`}
                              >
                                {version.status}
                              </Badge>
                            </div>
                            <p className="text-xs text-gray-500 mb-2">
                              Uploaded {version.uploadDate}
                            </p>
                            <p className="text-xs sm:text-sm text-gray-700 bg-gray-50 p-2 sm:p-3 rounded border border-gray-200">
                              {version.notes}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Card Footer Actions */}
                  <div className="border-t border-gray-200 px-4 sm:px-6 py-3 sm:py-4 flex flex-col sm:flex-row gap-2 sm:gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 text-xs sm:text-sm"
                    >
                      <Edit size={14} className="mr-1 sm:mr-2" />
                      <span className="hidden sm:inline">Edit</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 text-xs sm:text-sm text-red-600 hover:text-red-700"
                    >
                      <Trash2 size={14} className="mr-1 sm:mr-2" />
                      <span className="hidden sm:inline">Delete</span>
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
