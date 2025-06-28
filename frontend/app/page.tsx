"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Upload, FileText, Scale, Users, Calendar, Download, Eye, MoreHorizontal, Plus } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LoginForm } from "@/components/auth/login-form"
import { UserManagement } from "@/components/auth/user-management"
import { type User, hasPermission, getRoleDisplayName } from "@/lib/auth"
import { LogOut, Settings, Shield, UserIcon } from "lucide-react"

// Mock data for the system
const mockDocuments = [
  {
    id: "DOC001",
    title: "Criminal Case - Theft Charge",
    type: "Criminal",
    category: "Charge Sheet",
    caseNumber: "CR/001/2024",
    date: "2024-01-15",
    status: "Active",
    plaintiff: "State vs John Doe",
    classification: "High Priority",
  },
  {
    id: "DOC002",
    title: "Civil Suit - Contract Dispute",
    type: "Civil",
    category: "Summons",
    caseNumber: "CV/045/2024",
    date: "2024-01-20",
    status: "Pending",
    plaintiff: "ABC Ltd vs XYZ Corp",
    classification: "Medium Priority",
  },
  {
    id: "DOC003",
    title: "Traffic Violation - Speeding",
    type: "Traffic",
    category: "Citation",
    caseNumber: "TR/123/2024",
    date: "2024-01-25",
    status: "Resolved",
    plaintiff: "State vs Jane Smith",
    classification: "Low Priority",
  },
  {
    id: "DOC004",
    title: "Family Court - Custody Case",
    type: "Family",
    category: "Petition",
    caseNumber: "FM/078/2024",
    date: "2024-02-01",
    status: "Active",
    plaintiff: "Mary Johnson vs Robert Johnson",
    classification: "High Priority",
  },
]

const mockStats = {
  totalDocuments: 1247,
  activeCases: 89,
  resolvedCases: 156,
  pendingReview: 23,
}

export default function LegalArchiveSystem() {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("http://localhost:5000/me", {
          credentials: "include",
        });
        const data = await res.json();
        if (res.ok) {
          setUser(data.user);
          setIsAuthenticated(true);
        }
      } catch (error) {
        setUser(null);
        setIsAuthenticated(false);
      }
    };
  
    checkAuth();
  }, []);

  const handleLogin = (loggedInUser: User) => {
    setUser(loggedInUser)
    setIsAuthenticated(true)
  }

  const handleLogout = async () => {
    try {
      const res = await fetch("http://localhost:5000/logout", {
        method: "POST",
        credentials: "include",
      });
  
      if (res.ok) {
        setUser(null);
        setIsAuthenticated(false);
        console.log("✅ Logged out successfully");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
  

  if (!isAuthenticated || !user) {
    return <LoginForm onLogin={handleLogin} />
  }

  const filteredDocuments = mockDocuments.filter((doc) => {
    const matchesSearch =
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.caseNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.plaintiff.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === "all" || doc.type.toLowerCase() === selectedType.toLowerCase()
    const matchesStatus = selectedStatus === "all" || doc.status.toLowerCase() === selectedStatus.toLowerCase()

    return matchesSearch && matchesType && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "resolved":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "high priority":
        return "bg-red-100 text-red-800"
      case "medium priority":
        return "bg-orange-100 text-orange-800"
      case "low priority":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Scale className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Legal Archive Management System</h1>
                <p className="text-sm text-gray-600">Magistrate Court Sagamu, Ogun State</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <UserIcon className="h-5 w-5 text-gray-500" />
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-500">{getRoleDisplayName(user.role)}</p>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <Settings className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <UserIcon className="h-4 w-4 mr-2" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Shield className="h-4 w-4 mr-2" />
                    Security
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              {hasPermission(user.role, "canViewAllCases") && (
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  New Case
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList
            className={`grid w-full ${hasPermission(user.role, "canManageUsers") ? "grid-cols-5" : "grid-cols-4"}`}
          >
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            {hasPermission(user.role, "canViewDocuments") && <TabsTrigger value="documents">Documents</TabsTrigger>}
            {hasPermission(user.role, "canViewAllCases") && <TabsTrigger value="cases">Cases</TabsTrigger>}
            {hasPermission(user.role, "canUploadDocuments") && <TabsTrigger value="upload">Upload</TabsTrigger>}
            {hasPermission(user.role, "canManageUsers") && <TabsTrigger value="users">Users</TabsTrigger>}
          </TabsList>

          {/* Dashboard Tab - Always visible */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Documents</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockStats.totalDocuments.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">+12% from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Cases</CardTitle>
                  <Scale className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockStats.activeCases}</div>
                  <p className="text-xs text-muted-foreground">+5 new this week</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Resolved Cases</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockStats.resolvedCases}</div>
                  <p className="text-xs text-muted-foreground">+8% resolution rate</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockStats.pendingReview}</div>
                  <p className="text-xs text-muted-foreground">Requires attention</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Documents</CardTitle>
                  <CardDescription>Latest uploaded legal documents</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockDocuments.slice(0, 3).map((doc) => (
                      <div key={doc.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <FileText className="h-5 w-5 text-blue-600" />
                          <div>
                            <p className="font-medium text-sm">{doc.title}</p>
                            <p className="text-xs text-gray-500">{doc.caseNumber}</p>
                          </div>
                        </div>
                        <Badge variant="outline" className={getStatusColor(doc.status)}>
                          {doc.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Your Permissions</CardTitle>
                  <CardDescription>Access level for {getRoleDisplayName(user.role)}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">View Documents</span>
                      <Badge variant={hasPermission(user.role, "canViewDocuments") ? "default" : "secondary"}>
                        {hasPermission(user.role, "canViewDocuments") ? "Allowed" : "Restricted"}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Edit Cases</span>
                      <Badge variant={hasPermission(user.role, "canEditAllCases") ? "default" : "secondary"}>
                        {hasPermission(user.role, "canEditAllCases") ? "Allowed" : "Restricted"}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Upload Documents</span>
                      <Badge variant={hasPermission(user.role, "canUploadDocuments") ? "default" : "secondary"}>
                        {hasPermission(user.role, "canUploadDocuments") ? "Allowed" : "Restricted"}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Manage Users</span>
                      <Badge variant={hasPermission(user.role, "canManageUsers") ? "default" : "secondary"}>
                        {hasPermission(user.role, "canManageUsers") ? "Allowed" : "Restricted"}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Documents Tab - Conditional rendering based on permissions */}
          {hasPermission(user.role, "canViewDocuments") && (
            <TabsContent value="documents" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Document Archive</CardTitle>
                  <CardDescription>Search and manage legal documents with automated classification</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <div className="flex-1">
                      <div className="relative">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          placeholder="Search documents, case numbers, or parties..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <Select value={selectedType} onValueChange={setSelectedType}>
                      <SelectTrigger className="w-full sm:w-[180px]">
                        <SelectValue placeholder="Document Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="criminal">Criminal</SelectItem>
                        <SelectItem value="civil">Civil</SelectItem>
                        <SelectItem value="traffic">Traffic</SelectItem>
                        <SelectItem value="family">Family</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                      <SelectTrigger className="w-full sm:w-[180px]">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="resolved">Resolved</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="border rounded-lg">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Document</TableHead>
                          <TableHead>Case Number</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Parties</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Priority</TableHead>
                          <TableHead className="w-[50px]"></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredDocuments.map((doc) => (
                          <TableRow key={doc.id}>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                <FileText className="h-4 w-4 text-blue-600" />
                                <div>
                                  <p className="font-medium">{doc.title}</p>
                                  <p className="text-sm text-gray-500">{doc.category}</p>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="font-mono text-sm">{doc.caseNumber}</TableCell>
                            <TableCell>
                              <Badge variant="outline">{doc.type}</Badge>
                            </TableCell>
                            <TableCell className="max-w-[200px] truncate">{doc.plaintiff}</TableCell>
                            <TableCell>{doc.date}</TableCell>
                            <TableCell>
                              <Badge className={getStatusColor(doc.status)}>{doc.status}</Badge>
                            </TableCell>
                            <TableCell>
                              <Badge className={getPriorityColor(doc.classification)}>
                                {doc.classification.split(" ")[0]}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>
                                    <Eye className="h-4 w-4 mr-2" />
                                    View
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Download className="h-4 w-4 mr-2" />
                                    Download
                                  </DropdownMenuItem>
                                  {hasPermission(user.role, "canEditDocuments") && (
                                    <DropdownMenuItem>
                                      <FileText className="h-4 w-4 mr-2" />
                                      Edit
                                    </DropdownMenuItem>
                                  )}
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}

          {/* Cases Tab - Conditional rendering */}
          {hasPermission(user.role, "canViewAllCases") && (
            <TabsContent value="cases" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Case Management</CardTitle>
                  <CardDescription>Manage and track legal cases</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {mockDocuments.map((doc) => (
                      <Card key={doc.id} className="hover:shadow-md transition-shadow">
                        <CardHeader className="pb-3">
                          <div className="flex justify-between items-start">
                            <CardTitle className="text-lg">{doc.caseNumber}</CardTitle>
                            <Badge className={getStatusColor(doc.status)}>{doc.status}</Badge>
                          </div>
                          <CardDescription>{doc.title}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-500">Type:</span>
                              <Badge variant="outline">{doc.type}</Badge>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-500">Date:</span>
                              <span>{doc.date}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-500">Priority:</span>
                              <Badge className={getPriorityColor(doc.classification)}>
                                {doc.classification.split(" ")[0]}
                              </Badge>
                            </div>
                            <div className="pt-2">
                              <p className="text-sm text-gray-600 truncate">{doc.plaintiff}</p>
                            </div>
                          </div>
                          <div className="flex gap-2 mt-4">
                            <Button size="sm" variant="outline" className="flex-1">
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </Button>
                            {hasPermission(user.role, "canEditAllCases") && (
                              <Button size="sm" variant="outline">
                                <FileText className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}

          {/* Upload Tab - Conditional rendering */}
          {hasPermission(user.role, "canUploadDocuments") && (
            <TabsContent value="upload" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Document Upload</CardTitle>
                  <CardDescription>Upload legal documents with automated classification</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
                    <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Upload Documents</h3>
                    <p className="text-gray-600 mb-4">Drag and drop files here, or click to select files</p>
                    <Button>
                      <Upload className="h-4 w-4 mr-2" />
                      Select Files
                    </Button>
                    <p className="text-sm text-gray-500 mt-4">
                      Supported formats: PDF, DOC, DOCX, TXT (Max 10MB per file)
                    </p>
                  </div>

                  <div className="mt-8">
                    <h4 className="text-lg font-medium mb-4">Automated Classification Features</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">Document Type Detection</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="text-sm space-y-1 text-gray-600">
                            <li>• Charge Sheets</li>
                            <li>• Summons</li>
                            <li>• Judgments</li>
                            <li>• Petitions</li>
                            <li>• Citations</li>
                          </ul>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">Case Category Classification</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="text-sm space-y-1 text-gray-600">
                            <li>• Criminal Cases</li>
                            <li>• Civil Disputes</li>
                            <li>• Traffic Violations</li>
                            <li>• Family Matters</li>
                            <li>• Commercial Cases</li>
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}

          {/* Users Tab - Only for users with management permissions */}
          {hasPermission(user.role, "canManageUsers") && (
            <TabsContent value="users" className="space-y-6">
              <UserManagement />
            </TabsContent>
          )}
        </Tabs>
      </div>
    </div>
  )
}
