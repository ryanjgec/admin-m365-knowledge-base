
export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  articleCount: number;
}

export const categories: Category[] = [
  {
    id: "outlook",
    name: "Outlook / Exchange Online",
    description: "Email administration, mailbox management, transport rules, and Exchange Online configuration",
    icon: "✉️",
    color: "bg-blue-500",
    articleCount: 12
  },
  {
    id: "teams",
    name: "Teams Administration",
    description: "Microsoft Teams setup, policies, calling features, and collaboration tools management",
    icon: "👥",
    color: "bg-purple-500",
    articleCount: 15
  },
  {
    id: "intune",
    name: "Microsoft Intune/MDM",
    description: "Mobile device management, app deployment, compliance policies, and device configuration",
    icon: "📱",
    color: "bg-green-500",
    articleCount: 18
  },
  {
    id: "identity-access",
    name: "Identity and Access",
    description: "User provisioning, access management, group policies, and identity governance",
    icon: "👤",
    color: "bg-orange-500",
    articleCount: 14
  },
  {
    id: "azure-ad",
    name: "Azure AD",
    description: "Azure Active Directory, MFA, Conditional Access, and enterprise security features",
    icon: "🔐",
    color: "bg-indigo-500",
    articleCount: 16
  },
  {
    id: "onedrive",
    name: "OneDrive",
    description: "OneDrive for Business, file sync, sharing policies, and storage management",
    icon: "☁️",
    color: "bg-cyan-500",
    articleCount: 8
  },
  {
    id: "sharepoint",
    name: "SharePoint",
    description: "SharePoint Online, site collections, document libraries, and collaboration features",
    icon: "📁",
    color: "bg-blue-600",
    articleCount: 13
  },
  {
    id: "security",
    name: "Microsoft Security/Defender",
    description: "Microsoft 365 Defender, threat protection, security policies, and compliance center",
    icon: "🛡️",
    color: "bg-red-500",
    articleCount: 11
  },
  {
    id: "powershell",
    name: "PowerShell Scripts/Cmdlets",
    description: "PowerShell automation, Exchange cmdlets, Azure AD scripts, and administrative tools",
    icon: "⚡",
    color: "bg-gray-700",
    articleCount: 9
  }
];
