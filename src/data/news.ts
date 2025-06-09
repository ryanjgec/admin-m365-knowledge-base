
export interface NewsPost {
  id: string;
  title: string;
  subtitle: string;
  content: string;
  image: string;
  originalLink?: string;
  author: string;
  publishedAt: string;
  category: string;
  isFeatured?: boolean;
}

export const newsData: NewsPost[] = [
  {
    id: "microsoft-365-copilot-expansion",
    title: "Microsoft 365 Copilot Expands to More Enterprise Features",
    subtitle: "New AI capabilities now available across Teams, Outlook, and SharePoint for enterprise customers",
    content: "Microsoft has announced significant expansions to its Copilot AI assistant, bringing enhanced productivity features to enterprise customers. The update includes improved integration with Teams for meeting summaries, advanced email composition in Outlook, and intelligent document analysis in SharePoint. Organizations can now leverage AI-powered insights across their entire Microsoft 365 ecosystem, streamlining workflows and enhancing collaboration. The rollout is expected to complete by Q2 2024 for all eligible enterprise subscriptions.",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=400&fit=crop",
    originalLink: "https://techcommunity.microsoft.com/copilot-expansion",
    author: "Microsoft Tech Community",
    publishedAt: "2024-03-15",
    category: "AI & Productivity",
    isFeatured: true
  },
  {
    id: "teams-premium-security-updates",
    title: "Microsoft Teams Premium Introduces Advanced Security Controls",
    subtitle: "Enhanced encryption, watermarking, and admin controls now available for sensitive meetings",
    content: "Microsoft Teams Premium has rolled out comprehensive security enhancements designed for organizations handling sensitive information. The new features include end-to-end encryption for all meeting types, automatic watermarking for shared content, and granular admin controls for meeting policies. Additionally, the update introduces AI-powered threat detection that can identify and flag potentially risky sharing behaviors during meetings. These security improvements are particularly valuable for healthcare, financial services, and government organizations that require strict compliance with data protection regulations.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=400&fit=crop",
    originalLink: "https://techcommunity.microsoft.com/teams-security-update",
    author: "Microsoft Security Team",
    publishedAt: "2024-03-10",
    category: "Security & Compliance"
  },
  {
    id: "sharepoint-modernization-tools",
    title: "New SharePoint Migration Tools Simplify Legacy System Upgrades",
    subtitle: "Automated migration wizard reduces downtime and preserves custom configurations",
    content: "Microsoft has launched a comprehensive suite of migration tools designed to help organizations transition from legacy SharePoint versions to modern SharePoint Online. The new automated migration wizard can preserve custom workflows, maintain permission structures, and migrate large document libraries with minimal downtime. The tool also includes pre-migration assessment capabilities that identify potential compatibility issues and provide recommendations for resolution. Early adopters report up to 70% reduction in migration time compared to manual processes.",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop",
    originalLink: "https://docs.microsoft.com/sharepoint-migration",
    author: "SharePoint Product Team",
    publishedAt: "2024-03-08",
    category: "SharePoint & Collaboration"
  },
  {
    id: "power-platform-governance",
    title: "Power Platform Introduces Enhanced Governance Framework",
    subtitle: "New admin controls help organizations manage citizen development at scale",
    content: "Microsoft Power Platform has unveiled a robust governance framework that enables administrators to maintain control while empowering citizen developers. The update includes centralized app monitoring, automated compliance checking, and enhanced data loss prevention policies. Organizations can now set up approval workflows for app deployment, implement usage analytics dashboards, and establish environment-specific security policies. The framework is designed to balance innovation with security, allowing businesses to scale their low-code development initiatives safely.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=400&fit=crop",
    originalLink: "https://powerapps.microsoft.com/governance-update",
    author: "Power Platform Team",
    publishedAt: "2024-03-05",
    category: "Power Platform"
  },
  {
    id: "azure-ad-conditional-access",
    title: "Azure AD Conditional Access Gets Machine Learning Boost",
    subtitle: "AI-powered risk assessment improves security while reducing false positives",
    content: "Azure Active Directory's Conditional Access policies now leverage machine learning to provide more accurate risk assessments and reduce authentication friction for users. The enhanced system analyzes user behavior patterns, device characteristics, and location data to make intelligent access decisions. Organizations using the new ML-powered policies report a 40% reduction in false positive security alerts while maintaining higher protection against genuine threats. The update also includes new policy templates for common compliance scenarios and simplified configuration options for administrators.",
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&h=400&fit=crop",
    originalLink: "https://docs.microsoft.com/azure/active-directory/conditional-access",
    author: "Azure AD Team",
    publishedAt: "2024-03-01",
    category: "Identity & Access"
  },
  {
    id: "microsoft-viva-analytics",
    title: "Microsoft Viva Analytics Launches with Workplace Intelligence",
    subtitle: "New dashboard provides insights into team productivity and employee wellbeing",
    content: "Microsoft has officially launched Viva Analytics, a comprehensive workplace intelligence platform that helps organizations understand productivity patterns and employee engagement. The platform aggregates data from Microsoft 365 applications to provide insights into meeting effectiveness, collaboration patterns, and work-life balance metrics. Privacy-first design ensures individual user data remains protected while providing valuable organizational insights. Early enterprise customers report improved meeting culture and better resource allocation based on the platform's recommendations.",
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=800&h=400&fit=crop",
    originalLink: "https://www.microsoft.com/viva/analytics",
    author: "Microsoft Viva Team",
    publishedAt: "2024-02-28",
    category: "Employee Experience"
  }
];

export const getFeaturedNews = (): NewsPost[] => {
  return newsData.filter(post => post.isFeatured).slice(0, 3);
};

export const getLatestNews = (limit: number = 6): NewsPost[] => {
  return newsData.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()).slice(0, limit);
};

export const getNewsByCategory = (category: string): NewsPost[] => {
  return newsData.filter(post => post.category === category);
};
