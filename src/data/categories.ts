
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
    name: "Outlook & Exchange Online",
    description: "Email administration, mailbox management, and Exchange Online configuration",
    icon: "✉️",
    color: "bg-blue-500",
    articleCount: 10
  },
  {
    id: "teams",
    name: "Teams Administration",
    description: "Microsoft Teams setup, policies, and troubleshooting guides",
    icon: "👥",
    color: "bg-purple-500",
    articleCount: 10
  },
  {
    id: "intune",
    name: "Intune & MDM",
    description: "Mobile device management, app deployment, and compliance policies",
    icon: "📱",
    color: "bg-green-500",
    articleCount: 10
  },
  {
    id: "azure-ad",
    name: "Azure AD & Identity",
    description: "Identity management, MFA, Conditional Access, and user administration",
    icon: "🔐",
    color: "bg-orange-500",
    articleCount: 10
  },
  {
    id: "sharepoint",
    name: "OneDrive & SharePoint",
    description: "File storage, sharing, site management, and collaboration tools",
    icon: "📁",
    color: "bg-indigo-500",
    articleCount: 10
  },
  {
    id: "security",
    name: "Security Portal",
    description: "Microsoft 365 security, threat management, and compliance center",
    icon: "🛡️",
    color: "bg-red-500",
    articleCount: 10
  }
];
