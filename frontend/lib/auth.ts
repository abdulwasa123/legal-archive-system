export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  department: string
  isActive: boolean
  lastLogin?: string
  createdAt: string
}

export type UserRole = "chief_magistrate" | "magistrate" | "court_clerk" | "registry_staff" | "it_admin"

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
}

// Mock users for demonstration
export const mockUsers: User[] = [
  {
    id: "1",
    email: "chief.magistrate@sagamucourt.gov.ng",
    name: "Hon. Adebayo Ogundimu",
    role: "chief_magistrate",
    department: "Judicial",
    isActive: true,
    lastLogin: "2024-01-15T10:30:00Z",
    createdAt: "2023-01-01T00:00:00Z",
  },
  {
    id: "2",
    email: "magistrate1@sagamucourt.gov.ng",
    name: "Hon. Folake Adeyemi",
    role: "magistrate",
    department: "Judicial",
    isActive: true,
    lastLogin: "2024-01-15T09:15:00Z",
    createdAt: "2023-02-01T00:00:00Z",
  },
  {
    id: "3",
    email: "clerk@sagamucourt.gov.ng",
    name: "Mr. Tunde Olatunji",
    role: "court_clerk",
    department: "Registry",
    isActive: true,
    lastLogin: "2024-01-15T08:45:00Z",
    createdAt: "2023-03-01T00:00:00Z",
  },
  {
    id: "4",
    email: "registry@sagamucourt.gov.ng",
    name: "Mrs. Kemi Adesola",
    role: "registry_staff",
    department: "Registry",
    isActive: true,
    lastLogin: "2024-01-14T16:20:00Z",
    createdAt: "2023-04-01T00:00:00Z",
  },
  {
    id: "5",
    email: "admin@sagamucourt.gov.ng",
    name: "Mr. Segun Okonkwo",
    role: "it_admin",
    department: "IT",
    isActive: true,
    lastLogin: "2024-01-15T07:30:00Z",
    createdAt: "2023-01-15T00:00:00Z",
  },
]

export const rolePermissions = {
  chief_magistrate: {
    canViewAllCases: true,
    canEditAllCases: true,
    canDeleteCases: true,
    canManageUsers: true,
    canViewReports: true,
    canManageSystem: true,
    canUploadDocuments: true,
    canViewDocuments: true,
    canEditDocuments: true,
    canDeleteDocuments: true,
  },
  magistrate: {
    canViewAllCases: true,
    canEditAllCases: true,
    canDeleteCases: false,
    canManageUsers: false,
    canViewReports: true,
    canManageSystem: false,
    canUploadDocuments: true,
    canViewDocuments: true,
    canEditDocuments: true,
    canDeleteDocuments: false,
  },
  court_clerk: {
    canViewAllCases: true,
    canEditAllCases: true,
    canDeleteCases: false,
    canManageUsers: false,
    canViewReports: false,
    canManageSystem: false,
    canUploadDocuments: true,
    canViewDocuments: true,
    canEditDocuments: true,
    canDeleteDocuments: false,
  },
  registry_staff: {
    canViewAllCases: false,
    canEditAllCases: false,
    canDeleteCases: false,
    canManageUsers: false,
    canViewReports: false,
    canManageSystem: false,
    canUploadDocuments: true,
    canViewDocuments: true,
    canEditDocuments: false,
    canDeleteDocuments: false,
  },
  it_admin: {
    canViewAllCases: false,
    canEditAllCases: false,
    canDeleteCases: false,
    canManageUsers: true,
    canViewReports: true,
    canManageSystem: true,
    canUploadDocuments: false,
    canViewDocuments: false,
    canEditDocuments: false,
    canDeleteDocuments: false,
  },
}

export function getRoleDisplayName(role: UserRole): string {
  const roleNames = {
    chief_magistrate: "Chief Magistrate",
    magistrate: "Magistrate",
    court_clerk: "Court Clerk",
    registry_staff: "Registry Staff",
    it_admin: "IT Administrator",
  }
  return roleNames[role]
}

export function hasPermission(userRole: UserRole, permission: keyof typeof rolePermissions.chief_magistrate): boolean {
  return rolePermissions[userRole][permission] || false
}

export function authenticateUser(email: string, password: string): User | null {
  // In a real application, this would validate against a secure backend
  const user = mockUsers.find((u) => u.email === email && u.isActive)
  if (user && password === "password123") {
    // Mock password validation
    return user
  }
  return null
}
