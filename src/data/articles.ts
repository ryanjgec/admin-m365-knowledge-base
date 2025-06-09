
export interface Article {
  id: string;
  title: string;
  content: string;
  category: string;
  publishedDate: string;
  readTime: number;
  viewCount: number;
  tags: string[];
  featured: boolean;
  likes: number;
  dislikes: number;
}

export const articles: Article[] = [
  // Outlook & Exchange Online
  {
    id: "grant-full-access-permissions",
    title: "How to Grant Full Access and Send As Permissions in Exchange Online",
    content: `
# How to Grant Full Access and Send As Permissions in Exchange Online

## Overview
This comprehensive guide will walk you through the process of assigning mailbox permissions using both the Exchange Admin Center and PowerShell. These permissions are essential for scenarios where users need to access another user's mailbox or send emails on their behalf.

## Permission Types
- **Full Access**: Allows complete access to another user's mailbox
- **Send As**: Allows sending emails as another user
- **Send on Behalf**: Allows sending emails on behalf of another user (shows "on behalf of")

## Using Exchange Admin Center

### Step 1: Access Exchange Admin Center
1. Sign in to the Microsoft 365 admin center
2. Navigate to Exchange admin center
3. Go to Recipients > Mailboxes

### Step 2: Grant Full Access Permission
1. Select the mailbox you want to grant access to
2. Click on "Manage mailbox permissions"
3. Under "Read and manage," click "Edit"
4. Click "Add permissions"
5. Search for and select the user
6. Click "Save"

### Step 3: Grant Send As Permission
1. In the same mailbox permissions panel
2. Under "Send as," click "Edit"
3. Click "Add permissions"
4. Search for and select the user
5. Click "Save"

## Using PowerShell

### Connect to Exchange Online
\`\`\`powershell
Install-Module -Name ExchangeOnlineManagement
Connect-ExchangeOnline -UserPrincipalName admin@yourdomain.com
\`\`\`

### Grant Full Access Permission
\`\`\`powershell
Add-MailboxPermission -Identity "SharedMailbox@yourdomain.com" -User "User@yourdomain.com" -AccessRights FullAccess -InheritanceType All
\`\`\`

### Grant Send As Permission
\`\`\`powershell
Add-RecipientPermission -Identity "SharedMailbox@yourdomain.com" -Trustee "User@yourdomain.com" -AccessRights SendAs -Confirm:$false
\`\`\`

## Verification Steps
1. Check permissions using PowerShell:
\`\`\`powershell
Get-MailboxPermission -Identity "SharedMailbox@yourdomain.com" | Where-Object {$_.user -like "*User*"}
Get-RecipientPermission -Identity "SharedMailbox@yourdomain.com" | Where-Object {$_.trustee -like "*User*"}
\`\`\`

2. Test access in Outlook client
3. Verify the mailbox appears in the user's Outlook

## Common Scenarios
- **Shared Mailboxes**: Most common use case for team email addresses
- **Executive Assistants**: Granting access to executive mailboxes
- **Department Mailboxes**: Allowing multiple team members access
- **Temporary Access**: For project-based collaboration

## Troubleshooting Tips
- Permissions may take up to 60 minutes to propagate
- Clear Outlook cache if mailbox doesn't appear
- Ensure the user has an Exchange Online license
- Check for any Conditional Access policies blocking access

## Best Practices
- Use security groups for multiple users when possible
- Document all permission assignments
- Regularly audit mailbox permissions
- Remove permissions when no longer needed
- Use Send on Behalf instead of Send As when transparency is important
    `,
    category: "outlook",
    publishedDate: "2024-01-15",
    readTime: 8,
    viewCount: 2340,
    tags: ["Exchange Online", "Permissions", "PowerShell", "Mailbox"],
    featured: true,
    likes: 89,
    dislikes: 3
  },
  {
    id: "troubleshoot-outlook-connectivity",
    title: "Troubleshooting Outlook Connectivity Issues with Exchange Online",
    content: `
# Troubleshooting Outlook Connectivity Issues with Exchange Online

## Overview
This guide provides comprehensive methods to resolve common Outlook connectivity issues including "Disconnected" status, credential prompts, and sync problems with Exchange Online.

## Common Symptoms
- Outlook shows "Disconnected" or "Trying to connect"
- Repeated password prompts
- Emails not syncing properly
- Send/Receive errors
- Outlook freezes or crashes

## Step 1: Check Autodiscover Settings

### Verify Autodiscover Record
\`\`\`powershell
nslookup -type=cname autodiscover.yourdomain.com
\`\`\`

### Test Autodiscover Connectivity
1. Hold Ctrl and right-click Outlook icon in system tray
2. Select "Test E-mail AutoConfiguration"
3. Enter email address and password
4. Check "Use Guessmart" and "Secure Guessmart Authentication"
5. Click "Test"

## Step 2: Clear Outlook Credentials

### Windows Credential Manager
1. Open Control Panel > Credential Manager
2. Select "Windows Credentials"
3. Remove any entries related to Outlook or Office
4. Restart Outlook

### Registry Cleanup (Advanced Users)
\`\`\`
HKEY_CURRENT_USER\\Software\\Microsoft\\Office\\16.0\\Common\\Identity\\Identities
\`\`\`
Delete the identity entries and restart Outlook.

## Step 3: Office Online Repair

### Quick Repair
1. Go to Control Panel > Programs and Features
2. Select Microsoft Office
3. Click "Change" > "Quick Repair"
4. Follow the wizard

### Online Repair
If Quick Repair doesn't work:
1. Select "Online Repair" instead
2. This will require internet connection and takes longer
3. May require Office reinstallation

## Step 4: Check Mailbox Move History

### PowerShell Commands
\`\`\`powershell
Connect-ExchangeOnline
Get-MoveRequest -Identity user@domain.com
Get-MoveRequestStatistics -Identity user@domain.com
\`\`\`

If a mailbox move is in progress or failed, this can cause connectivity issues.

## Step 5: Network Connectivity Tests

### Test Office 365 Connectivity
Use Microsoft's connectivity analyzer:
- https://testconnectivity.microsoft.com
- Run "Outlook Connectivity" test
- Follow recommendations from results

### Check Required URLs and IPs
Ensure these are accessible:
- *.outlook.office365.com
- *.outlook.office.com
- outlook.office365.com

## Step 6: Create New Outlook Profile

### Backup Current Profile
1. Export .pst files for local data
2. Note down account settings

### Create New Profile
1. Control Panel > Mail > Show Profiles
2. Click "Add" to create new profile
3. Enter account details
4. Set as default profile
5. Test connectivity

## Step 7: Advanced Troubleshooting

### Enable Outlook Logging
1. Registry: HKEY_CURRENT_USER\\Software\\Microsoft\\Office\\16.0\\Outlook\\Options\\Mail
2. Create DWORD: EnableLogging = 1
3. Restart Outlook
4. Check logs in %temp% folder

### Check Exchange Online Health
- Visit Office 365 Service Health dashboard
- Look for any ongoing issues with Exchange Online
- Check for maintenance windows

## PowerShell Diagnostic Commands

### Check User License and Status
\`\`\`powershell
Connect-MsolService
Get-MsolUser -UserPrincipalName user@domain.com | Select-Object DisplayName,UserPrincipalName,isLicensed,Licenses
\`\`\`

### Verify Mailbox Properties
\`\`\`powershell
Connect-ExchangeOnline
Get-Mailbox user@domain.com | Format-List
Get-CasMailbox user@domain.com | Format-List
\`\`\`

## Prevention Tips
- Keep Office updated with latest patches
- Regularly clear Outlook cache
- Monitor for failed mailbox moves
- Implement proper DNS records
- Train users on credential management

## When to Escalate
- Multiple users affected simultaneously
- Connectivity issues persist after all troubleshooting
- Suspect Exchange Online service issues
- Complex hybrid environment problems
    `,
    category: "outlook",
    publishedDate: "2024-01-10",
    readTime: 12,
    viewCount: 1890,
    tags: ["Outlook", "Connectivity", "Troubleshooting", "Exchange Online"],
    featured: false,
    likes: 67,
    dislikes: 5
  },
  // Teams Administration
  {
    id: "create-manage-teams-admin",
    title: "How to Create and Manage Teams via Teams Admin Center",
    content: `
# How to Create and Manage Teams via Teams Admin Center

## Overview
This comprehensive guide covers the creation and management of Microsoft Teams through the Teams Admin Center, including naming conventions, expiration policies, and team lifecycle management.

## Accessing Teams Admin Center
1. Sign in to Microsoft 365 admin center
2. Navigate to "Show all" > "Teams" 
3. Or go directly to https://admin.teams.microsoft.com
4. Ensure you have Teams Administrator or Global Administrator role

## Creating Teams

### Method 1: Teams Admin Center
1. Go to Teams > Manage teams
2. Click "+ Add" to create new team
3. Choose team type:
   - **Private**: Only team owners can add members
   - **Public**: Anyone in organization can join
   - **Org-wide**: Everyone in organization is automatically added

### Method 2: PowerShell
\`\`\`powershell
Install-Module -Name MicrosoftTeams
Connect-MicrosoftTeams

# Create a new team
New-Team -DisplayName "Marketing Team" -Description "Marketing department collaboration" -Visibility Private
\`\`\`

## Team Settings Configuration

### General Settings
- **Team Name**: Clear, descriptive names following naming convention
- **Description**: Detailed purpose and scope
- **Team Picture**: Professional image representing the team
- **Privacy Level**: Private, Public, or Org-wide

### Member Permissions
Configure what team members can do:
- Create channels
- Delete channels
- Add/remove apps
- Create/edit/delete tabs
- Create/edit/delete connectors

### Guest Permissions
Control external user capabilities:
- Create/update/delete channels
- Create/edit/delete tabs
- Create/edit/delete connectors

## Naming Conventions Best Practices

### Recommended Structure
\`\`\`
[Department/Function]-[Purpose]-[Location/Region]
Examples:
- Marketing-Campaigns-NA
- IT-Projects-Global
- Sales-Training-EMEA
\`\`\`

### PowerShell to Enforce Naming Policy
\`\`\`powershell
# Set team naming policy
$policy = @{
    PrefixSuffixNamingRequirement = @{
        Prefix = "TEAM-"
        Suffix = "-2024"
    }
    CustomBlockedWordsList = @("Confidential", "Secret")
}
Set-AzureADDirectorySetting -Id (Get-AzureADDirectorySetting | Where-Object {$_.DisplayName -eq "Group.Unified"}).Id -DirectorySetting $policy
\`\`\`

## Team Lifecycle Management

### Expiration Policies
Set automatic expiration for unused teams:

1. **Azure AD Groups Settings**:
   - Navigate to Azure AD > Groups > Expiration
   - Set group lifetime (e.g., 365 days)
   - Choose notification timeline (e.g., 30 days before)

2. **PowerShell Configuration**:
\`\`\`powershell
# Set group expiration policy
New-AzureADMSGroupLifecyclePolicy -GroupLifetimeInDays 365 -ManagedGroupTypes "All" -AlternateNotificationEmails "admin@company.com"
\`\`\`

### Renewal Process
- Team owners receive email notifications before expiration
- Owners can renew teams through email link
- Unreturned teams are automatically deleted
- Deleted teams can be restored within 30 days

## Managing Team Owners and Members

### Adding Owners via Admin Center
1. Go to Teams > Manage teams
2. Select the team
3. Go to Members tab
4. Click "Add" and select users
5. Choose role: Owner or Member

### PowerShell Management
\`\`\`powershell
# Add team owner
Add-TeamUser -GroupId "TeamGUID" -User "user@company.com" -Role Owner

# Add team member
Add-TeamUser -GroupId "TeamGUID" -User "user@company.com" -Role Member

# Remove user from team
Remove-TeamUser -GroupId "TeamGUID" -User "user@company.com"
\`\`\`

## Monitoring and Analytics

### Teams Usage Reports
1. Teams Admin Center > Analytics & reports > Usage reports
2. Available reports:
   - Teams usage report
   - Teams user activity report
   - Teams device usage report

### Key Metrics to Monitor
- Active users per team
- Channel message count
- File sharing activity
- Meeting participation
- App usage statistics

## Team Templates

### Creating Custom Templates
1. Teams Admin Center > Teams > Team templates
2. Click "Add" to create new template
3. Configure:
   - Base template (start from scratch or existing)
   - Channels structure
   - Apps and tabs
   - Settings and permissions

### PowerShell Template Creation
\`\`\`powershell
# Create team from template
$template = Get-CsTeamsTemplate -OdataId "/api/teamTemplates/v1.0/com.microsoft.teams.template.ManageAProject"
New-Team -Template $template -DisplayName "Project Alpha" -Description "Alpha project team"
\`\`\`

## Archiving and Deletion

### When to Archive Teams
- Project completion
- Team no longer active
- Seasonal teams
- Compliance requirements

### Archive Process
1. Teams Admin Center > Teams > Manage teams
2. Select team to archive
3. Click "Archive"
4. Confirm archival

### PowerShell Archival
\`\`\`powershell
# Archive a team
Set-TeamArchivedState -GroupId "TeamGUID" -Archived $true

# Unarchive a team
Set-TeamArchivedState -GroupId "TeamGUID" -Archived $false
\`\`\`

## Troubleshooting Common Issues

### Team Creation Failures
- Check user permissions and licenses
- Verify naming policy compliance
- Ensure Exchange Online mailbox exists
- Check SharePoint site creation permissions

### Performance Issues
- Monitor team size (recommended max 10,000 members)
- Review channel structure (max 200 private channels)
- Check app and connector usage
- Monitor file storage usage

## Best Practices Summary
1. Implement consistent naming conventions
2. Set up expiration policies for team hygiene
3. Train team owners on management responsibilities
4. Regular monitoring and cleanup of unused teams
5. Use templates for standardized team creation
6. Document team governance policies
7. Monitor usage analytics for optimization
    `,
    category: "teams",
    publishedDate: "2024-01-08",
    readTime: 15,
    viewCount: 1650,
    tags: ["Teams", "Administration", "PowerShell", "Governance"],
    featured: true,
    likes: 78,
    dislikes: 2
  },
  // Security Portal
  {
    id: "navigate-security-portal",
    title: "Navigating the Microsoft 365 Security Portal: A Beginner's Guide",
    content: `
# Navigating the Microsoft 365 Security Portal: A Beginner's Guide

## Overview
The Microsoft 365 Security Portal (also known as Microsoft Defender portal) is your central hub for managing security across your Microsoft 365 environment. This guide provides a comprehensive walkthrough of the portal layout, key sections, and essential features.

## Accessing the Security Portal
- **URL**: https://security.microsoft.com
- **Required Roles**: Security Administrator, Security Reader, Global Administrator
- **Alternative Access**: Microsoft 365 admin center > Security

## Portal Dashboard Overview

### Main Navigation Menu
The left-side navigation contains these key sections:

1. **Home**: Dashboard overview and quick actions
2. **Incidents & alerts**: Centralized alert management
3. **Hunting**: Advanced threat hunting capabilities
4. **Action center**: Automated and manual remediation actions
5. **Threat analytics**: Intelligence on current threats
6. **Secure Score**: Security posture measurement
7. **Learning hub**: Training and documentation resources

### Dashboard Widgets
The main dashboard displays:
- **Security overview**: High-level security status
- **Incidents**: Active security incidents requiring attention
- **Secure Score**: Current score and improvement recommendations
- **Device compliance**: Endpoint security status
- **Identity security**: Authentication and access insights

## Key Portal Sections

### 1. Incidents & Alerts

#### Incident Management
- **Purpose**: Correlates related alerts into actionable incidents
- **Views Available**:
  - Incidents queue
  - Alert queue
  - Automated investigations

#### Alert Types
- **High Severity**: Immediate attention required
- **Medium Severity**: Investigate within 24 hours
- **Low Severity**: Monitor and review periodically
- **Informational**: FYI alerts for awareness

### 2. Threat Analytics

#### Available Intelligence
- **Threat reports**: Detailed analysis of current threats
- **Analyst reports**: Expert insights on threat landscape
- **Related incidents**: Incidents matching threat patterns
- **Impacted assets**: Resources affected by threats

#### Key Features
- Real-time threat intelligence
- IOC (Indicators of Compromise) tracking
- Mitigation recommendations
- Threat hunting queries

### 3. Secure Score

#### Score Components
- **Current Score**: Your organization's security rating
- **Max Score**: Maximum achievable score
- **Comparison Score**: Industry benchmark
- **Score History**: Trends over time

#### Improvement Actions
Categories include:
- **Identity**: MFA, Conditional Access, Privileged accounts
- **Device**: Compliance policies, endpoint protection
- **Apps**: Application security, OAuth permissions
- **Data**: Classification, protection policies

### 4. Action Center

#### Automated Actions
- **Auto-remediation**: System-initiated responses
- **Pending Actions**: Awaiting approval or user action
- **Completed Actions**: Historical remediation activities

#### Manual Actions
- **Threat hunting**: User-initiated investigations
- **Device actions**: Isolate, scan, collect investigation package
- **Email actions**: Delete, quarantine, move to folders

## Email & Collaboration Security

### Microsoft Defender for Office 365
Access through: **Email & collaboration** section

#### Key Features
- **Threat protection**: Anti-phishing, safe attachments, safe links
- **Investigation tools**: Threat Explorer, real-time detections
- **Response capabilities**: Automated investigation and response (AIR)

#### Threat Explorer
- **Purpose**: Investigate email threats and attacks
- **Views**:
  - Malware
  - Phish
  - Campaigns
  - All email

### Safe Attachments & Links
- **Safe Attachments**: Detonates files in sandbox environment
- **Safe Links**: Scans URLs at click-time
- **Configuration**: Policies section under Email & collaboration

## Endpoints Security

### Microsoft Defender for Endpoint
Access through: **Endpoints** section

#### Device Management
- **Device inventory**: All managed endpoints
- **Vulnerability management**: Security recommendations
- **Attack surface reduction**: Proactive protection rules

#### Threat & Vulnerability Management
- **Dashboards**: Security posture overview
- **Recommendations**: Prioritized security improvements
- **Remediation**: Track and manage vulnerability fixes

## Cloud Apps Security

### Microsoft Defender for Cloud Apps
Access through: **Cloud apps** section

#### App Discovery
- **Shadow IT**: Discover unmanaged cloud applications
- **Risk assessment**: Evaluate app security posture
- **Usage analytics**: Monitor cloud app consumption

#### Protection Policies
- **Access policies**: Control user access to cloud apps
- **Activity policies**: Monitor and alert on user activities
- **File policies**: Protect sensitive data in cloud storage

## Identity Security

### Microsoft Defender for Identity
Access through: **Identities** section

#### Monitoring Capabilities
- **Identity timeline**: User activity tracking
- **Lateral movement paths**: Attack progression analysis
- **Security alerts**: Suspicious identity activities

#### Investigation Tools
- **User investigation priority**: Risk-scored user list
- **Entity pages**: Detailed user/device information
- **Activity timeline**: Chronological event tracking

## Reports and Analytics

### Available Reports
- **Security report**: Overall security posture
- **Threat protection report**: Email security metrics
- **Device compliance report**: Endpoint security status
- **Identity security report**: Authentication insights

### Custom Reporting
- **Scheduled reports**: Automated report delivery
- **Report customization**: Filter and customize views
- **Data export**: CSV/Excel export capabilities

## Best Practices for Portal Usage

### Daily Tasks
1. Review incident queue for new alerts
2. Check Secure Score for new recommendations
3. Monitor threat analytics for emerging threats
4. Review automated investigation results

### Weekly Tasks
1. Analyze security reports and trends
2. Review and tune security policies
3. Conduct threat hunting exercises
4. Update security awareness based on threats

### Monthly Tasks
1. Comprehensive security posture review
2. Policy effectiveness assessment
3. Security training needs analysis
4. Incident response process review

## Getting Started Checklist

### Initial Setup
- [ ] Verify portal access and permissions
- [ ] Configure notification preferences
- [ ] Set up automated investigation settings
- [ ] Enable required security features

### First Week Actions
- [ ] Explore all main navigation sections
- [ ] Review current Secure Score
- [ ] Check for any critical incidents
- [ ] Familiarize with threat analytics

### Ongoing Management
- [ ] Establish daily monitoring routine
- [ ] Configure alert notifications
- [ ] Set up regular reporting schedule
- [ ] Plan security improvement initiatives

## Common Navigation Tips
- Use browser bookmarks for frequently accessed sections
- Leverage search functionality for quick access
- Customize dashboard widgets based on priorities
- Use filters to focus on relevant information
- Set up email notifications for critical alerts

This guide provides the foundation for effectively navigating and utilizing the Microsoft 365 Security Portal. Regular exploration and hands-on experience will help you become proficient in managing your organization's security posture.
    `,
    category: "security",
    publishedDate: "2024-01-20",
    readTime: 18,
    viewCount: 2100,
    tags: ["Security Portal", "Microsoft Defender", "Navigation", "Beginner"],
    featured: true,
    likes: 94,
    dislikes: 1
  }
];

// Get articles by category
export const getArticlesByCategory = (categoryId: string): Article[] => {
  return articles.filter(article => article.category === categoryId);
};

// Get featured articles
export const getFeaturedArticles = (): Article[] => {
  return articles.filter(article => article.featured);
};

// Get article by ID
export const getArticleById = (id: string): Article | undefined => {
  return articles.find(article => article.id === id);
};

// Search articles
export const searchArticles = (query: string, categoryId?: string): Article[] => {
  const searchTerms = query.toLowerCase().split(' ');
  let articlesToSearch = articles;
  
  if (categoryId) {
    articlesToSearch = getArticlesByCategory(categoryId);
  }
  
  return articlesToSearch.filter(article => {
    const searchText = `${article.title} ${article.content} ${article.tags.join(' ')}`.toLowerCase();
    return searchTerms.every(term => searchText.includes(term));
  });
};
