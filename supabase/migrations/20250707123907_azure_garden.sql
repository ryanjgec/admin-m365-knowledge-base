/*
  # Seed Initial Data

  1. Categories
    - Insert predefined categories for Microsoft 365 topics

  2. Sample Articles
    - Insert sample articles for each category

  3. Admin User Setup
    - Instructions for setting up the first admin user
*/

-- Insert categories
INSERT INTO categories (id, name, description, icon, color, article_count) VALUES
('outlook', 'Outlook / Exchange Online', 'Email administration, mailbox management, transport rules, and Exchange Online configuration', '✉️', 'bg-blue-500', 0),
('teams', 'Teams Administration', 'Microsoft Teams setup, policies, calling features, and collaboration tools management', '👥', 'bg-purple-500', 0),
('intune', 'Microsoft Intune/MDM', 'Mobile device management, app deployment, compliance policies, and device configuration', '📱', 'bg-green-500', 0),
('identity-access', 'Identity and Access', 'User provisioning, access management, group policies, and identity governance', '👤', 'bg-orange-500', 0),
('azure-ad', 'Azure AD', 'Azure Active Directory, MFA, Conditional Access, and enterprise security features', '🔐', 'bg-indigo-500', 0),
('onedrive', 'OneDrive', 'OneDrive for Business, file sync, sharing policies, and storage management', '☁️', 'bg-cyan-500', 0),
('sharepoint', 'SharePoint', 'SharePoint Online, site collections, document libraries, and collaboration features', '📁', 'bg-blue-600', 0),
('security', 'Microsoft Security/Defender', 'Microsoft 365 Defender, threat protection, security policies, and compliance center', '🛡️', 'bg-red-500', 0),
('powershell', 'PowerShell Scripts/Cmdlets', 'PowerShell automation, Exchange cmdlets, Azure AD scripts, and administrative tools', '⚡', 'bg-gray-700', 0)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  icon = EXCLUDED.icon,
  color = EXCLUDED.color;

-- Insert sample articles
INSERT INTO articles (id, title, content, excerpt, category, tags, status, featured, read_time) VALUES
(gen_random_uuid(), 'Setting Up Exchange Online Transport Rules', 
'Transport rules in Exchange Online allow you to apply policies to email messages that flow through your organization. These rules can help with compliance, security, and message routing.

## Creating a Transport Rule

1. Sign in to the Exchange admin center
2. Navigate to Mail flow > Rules
3. Click the + (Add) button and select "Create a new rule"
4. Configure the rule conditions and actions

## Common Use Cases

- **Disclaimer Addition**: Automatically add legal disclaimers to outbound emails
- **Message Encryption**: Encrypt sensitive emails based on keywords
- **Compliance Monitoring**: Copy messages to compliance mailboxes
- **Spam Prevention**: Block or quarantine suspicious messages

## Best Practices

- Test rules in a lab environment first
- Use specific conditions to avoid false positives
- Monitor rule performance and effectiveness
- Document all transport rules for compliance

Transport rules are powerful tools that can significantly improve your email security and compliance posture when configured correctly.',
'Learn how to create and manage transport rules in Exchange Online to control email flow and enhance security.',
'outlook',
ARRAY['Exchange Online', 'Transport Rules', 'Email Security', 'Compliance'],
'published',
true,
'8 min read'),

(gen_random_uuid(), 'Configuring Teams Calling Policies',
'Microsoft Teams calling policies control what calling and call forwarding features are available to users in your organization.

## Types of Calling Policies

### Global Policy
The global policy applies to all users by default and includes:
- Private calling enabled
- Call forwarding to voicemail
- Simultaneous ringing to other numbers

### Custom Policies
Create custom policies for specific user groups:
- Executive policies with enhanced features
- Basic policies for standard users
- Restricted policies for temporary workers

## Configuration Steps

1. Open the Microsoft Teams admin center
2. Navigate to Voice > Calling policies
3. Select an existing policy or create a new one
4. Configure the following settings:
   - Make private calls
   - Call forwarding and simultaneous ringing
   - Call groups
   - Delegation for inbound and outbound calls
   - Prevent toll bypass

## Policy Assignment

Assign policies using:
- PowerShell cmdlets for bulk operations
- Teams admin center for individual users
- Group policy assignment for automatic assignment

## Monitoring and Troubleshooting

Use the Teams admin center to monitor:
- Policy assignment status
- User calling activity
- Call quality metrics

Regular review of calling policies ensures optimal user experience and compliance with organizational requirements.',
'Set up and manage calling policies in Microsoft Teams for enterprise voice solutions.',
'teams',
ARRAY['Teams', 'Calling', 'Voice', 'Policies'],
'published',
true,
'10 min read'),

(gen_random_uuid(), 'Creating Device Compliance Policies in Intune',
'Device compliance policies in Microsoft Intune help ensure that devices accessing your corporate resources meet your organization''s security requirements.

## Understanding Compliance Policies

Compliance policies evaluate devices against criteria such as:
- Operating system version requirements
- Password complexity rules
- Encryption requirements
- Jailbreak/root detection
- Threat level assessment

## Creating a Compliance Policy

### Step 1: Access Intune Admin Center
1. Sign in to the Microsoft Endpoint Manager admin center
2. Navigate to Devices > Compliance policies
3. Click "Create Policy"

### Step 2: Configure Platform Settings
Select the device platform (iOS/iPadOS, Android, Windows 10/11) and configure:

**For Windows devices:**
- System Security: BitLocker, Secure Boot, Code Integrity
- Device Health: Windows Health Attestation Service
- Device Properties: OS version, system requirements

**For Mobile devices:**
- Device Security: Screen lock, encryption
- System Security: Jailbreak/root detection
- Device Health: Mobile Threat Defense integration

### Step 3: Actions for Noncompliance
Configure automated actions:
- Send email to end user (immediately)
- Mark device noncompliant (after 1 day)
- Retire noncompliant device (after 30 days)

## Best Practices

1. **Gradual Rollout**: Start with pilot groups
2. **Clear Communication**: Inform users about requirements
3. **Grace Periods**: Allow time for remediation
4. **Regular Review**: Update policies as threats evolve

## Monitoring Compliance

Use Intune reports to track:
- Device compliance status
- Policy assignment effectiveness
- Common compliance failures

Compliance policies are essential for maintaining a secure mobile device environment while enabling productivity.',
'Step-by-step guide to creating and deploying device compliance policies using Microsoft Intune.',
'intune',
ARRAY['Intune', 'Compliance', 'Mobile Device Management', 'Security'],
'published',
true,
'12 min read'),

(gen_random_uuid(), 'Implementing Conditional Access Policies',
'Conditional Access is Azure AD''s tool for bringing signals together, making decisions, and enforcing organizational policies.

## What is Conditional Access?

Conditional Access policies are if-then statements: if a user wants to access a resource, then they must complete an action.

## Key Components

### Signals
- User or group membership
- IP location information
- Device information
- Application information
- Real-time risk detection

### Decisions
- Block access
- Grant access
- Grant access with requirements (MFA, compliant device, etc.)

## Common Policy Scenarios

### Require MFA for Admins
```
IF user is in "Global Administrators" group
THEN require multi-factor authentication
```

### Block Legacy Authentication
```
IF authentication protocol is legacy (IMAP, POP, SMTP)
THEN block access
```

### Require Compliant Devices
```
IF user accesses Office 365 apps
AND device is not compliant
THEN block access
```

## Implementation Best Practices

1. **Start with Report-only Mode**: Test policies without enforcement
2. **Use Exclusions Carefully**: Always exclude emergency access accounts
3. **Layer Policies**: Combine multiple conditions for robust security
4. **Monitor Continuously**: Review sign-in logs and policy effectiveness

## Policy Creation Process

1. Navigate to Azure AD > Security > Conditional Access
2. Create new policy or clone existing one
3. Configure assignments (users, apps, conditions)
4. Set access controls (grant/block)
5. Enable policy in report-only mode first
6. Monitor and adjust before full enforcement

## Troubleshooting

Common issues and solutions:
- **Locked out users**: Use emergency access accounts
- **Policy conflicts**: Review policy precedence
- **Performance impact**: Optimize policy conditions

Conditional Access is a powerful security tool that requires careful planning and ongoing management.',
'Create and manage Conditional Access policies to secure your Azure AD environment.',
'azure-ad',
ARRAY['Azure AD', 'Conditional Access', 'Security', 'MFA'],
'published',
true,
'13 min read'),

(gen_random_uuid(), 'SharePoint Permission Management Best Practices',
'Effective permission management in SharePoint Online is crucial for maintaining security while enabling collaboration.

## SharePoint Permission Model

### Permission Levels
- **Full Control**: Complete access to site and content
- **Design**: Modify site structure and appearance
- **Edit**: Add, edit, and delete content
- **Contribute**: Add and edit content, cannot delete
- **Read**: View-only access to content

### SharePoint Groups
- **Site Owners**: Full control over the site
- **Site Members**: Contribute to site content
- **Site Visitors**: Read-only access

## Best Practices for Permission Management

### 1. Use SharePoint Groups Instead of Individual Permissions
```
✅ Good: Add users to "Marketing Team Members" group
❌ Bad: Grant individual permissions to each user
```

### 2. Implement Least Privilege Principle
- Grant minimum permissions necessary
- Regularly review and audit permissions
- Remove access when no longer needed

### 3. Use Azure AD Groups for Large Organizations
- Sync on-premises groups to Azure AD
- Use dynamic groups for automatic membership
- Leverage nested groups for complex hierarchies

## Permission Inheritance

### Understanding Inheritance
- Sites inherit from site collection
- Lists inherit from sites
- Items inherit from lists
- Breaking inheritance creates unique permissions

### When to Break Inheritance
- Confidential documents requiring restricted access
- Department-specific content
- Executive or HR materials

## Advanced Permission Scenarios

### External Sharing
Configure external sharing at multiple levels:
1. **Tenant level**: Organization-wide policies
2. **Site collection level**: Site-specific restrictions
3. **Site level**: Individual site settings
4. **Item level**: Document-specific sharing

### Conditional Access Integration
Combine SharePoint permissions with Conditional Access:
- Require MFA for sensitive sites
- Block access from unmanaged devices
- Restrict access by location

## Monitoring and Auditing

### Regular Permission Reviews
- Monthly review of site owners
- Quarterly audit of external sharing
- Annual comprehensive permission review

### Using SharePoint Admin Center
Monitor sharing activities:
- Active sites report
- Sharing reports
- Access requests

### PowerShell for Bulk Operations
```powershell
# Get all site permissions
Get-PnPSiteGroup | Get-PnPGroupMember

# Remove user from all sites
Remove-PnPUser -Identity "user@domain.com"
```

## Common Permission Issues

### Problem: Users Can''t Access Content
**Solutions:**
- Check permission inheritance
- Verify group membership
- Review Conditional Access policies

### Problem: Too Many Permission Requests
**Solutions:**
- Implement self-service access
- Use Azure AD groups
- Provide clear access guidelines

Proper permission management ensures SharePoint remains secure while enabling effective collaboration.',
'Learn best practices for managing permissions and access control in SharePoint Online.',
'sharepoint',
ARRAY['SharePoint', 'Permissions', 'Access Control', 'Security'],
'published',
true,
'10 min read'),

(gen_random_uuid(), 'Advanced Threat Hunting with Microsoft 365 Defender',
'Microsoft 365 Defender provides advanced threat hunting capabilities using KQL (Kusto Query Language) to proactively search for threats across your environment.

## Introduction to Threat Hunting

Threat hunting is the proactive search for cyber threats that may have evaded traditional security measures. Microsoft 365 Defender provides a unified platform for hunting across:

- Microsoft Defender for Endpoint
- Microsoft Defender for Office 365
- Microsoft Defender for Identity
- Microsoft Defender for Cloud Apps

## Getting Started with Advanced Hunting

### Accessing Advanced Hunting
1. Navigate to Microsoft 365 Defender portal
2. Go to Hunting > Advanced hunting
3. Use the query editor to write KQL queries

### Basic KQL Syntax
```kql
// Basic table query
DeviceEvents
| where Timestamp > ago(7d)
| where ActionType == "ProcessCreated"
| limit 100
```

## Common Hunting Scenarios

### 1. Suspicious PowerShell Activity
```kql
DeviceProcessEvents
| where Timestamp > ago(30d)
| where FileName =~ "powershell.exe"
| where ProcessCommandLine contains "-enc" or ProcessCommandLine contains "-encoded"
| where ProcessCommandLine contains "bypass" or ProcessCommandLine contains "hidden"
| project Timestamp, DeviceName, ProcessCommandLine, InitiatingProcessFileName
| order by Timestamp desc
```

### 2. Unusual Sign-in Patterns
```kql
SigninLogs
| where TimeGenerated > ago(7d)
| where RiskLevelDuringSignIn == "high"
| summarize SigninCount = count() by UserPrincipalName, Location, bin(TimeGenerated, 1h)
| where SigninCount > 5
| order by SigninCount desc
```

### 3. Email-based Threats
```kql
EmailEvents
| where Timestamp > ago(7d)
| where ThreatTypes has "Phish" or ThreatTypes has "Malware"
| join EmailAttachmentInfo on NetworkMessageId
| project Timestamp, SenderFromAddress, RecipientEmailAddress, Subject, FileName, FileType
| order by Timestamp desc
```

### 4. Lateral Movement Detection
```kql
DeviceLogonEvents
| where Timestamp > ago(24h)
| where LogonType == "Network"
| summarize LogonCount = count(), UniqueDevices = dcount(DeviceName) by AccountName, bin(Timestamp, 1h)
| where UniqueDevices > 5
| order by LogonCount desc
```

## Advanced Hunting Techniques

### 1. Cross-Domain Correlation
```kql
let SuspiciousIPs = 
    DeviceNetworkEvents
    | where Timestamp > ago(7d)
    | where RemoteIPType == "Public"
    | summarize ConnectionCount = count() by RemoteIP
    | where ConnectionCount > 100
    | project RemoteIP;
//
EmailEvents
| where Timestamp > ago(7d)
| where SenderIPv4 in (SuspiciousIPs)
| project Timestamp, SenderFromAddress, RecipientEmailAddress, Subject, SenderIPv4
```

### 2. Behavioral Analysis
```kql
DeviceFileEvents
| where Timestamp > ago(30d)
| where ActionType == "FileCreated"
| where FolderPath startswith @"C:\Users\" and FolderPath endswith @"\AppData\Roaming\"
| summarize FileCount = count(), UniqueFiles = dcount(FileName) by DeviceName, InitiatingProcessFileName, bin(Timestamp, 1d)
| where FileCount > 50
| order by FileCount desc
```

## Building Custom Detection Rules

### Creating Detection Rules from Queries
1. Develop and test your KQL query
2. Click "Create detection rule" in the query editor
3. Configure rule settings:
   - Rule name and description
   - Frequency (every 5 minutes to 24 hours)
   - Alert threshold
   - Suppression settings

### Example Detection Rule
```kql
// Detect potential credential dumping
DeviceProcessEvents
| where Timestamp > ago(5m)
| where ProcessCommandLine has_any ("sekurlsa", "logonpasswords", "lsadump")
| where InitiatingProcessFileName !in ("powershell_ise.exe", "SecurityHealthService.exe")
```

## Threat Hunting Best Practices

### 1. Start with Hypothesis
- Define what you''re looking for
- Base hunts on threat intelligence
- Focus on high-value assets

### 2. Use Threat Intelligence
- Incorporate IOCs from threat feeds
- Leverage MITRE ATT&CK framework
- Stay updated on current threats

### 3. Optimize Query Performance
- Use time filters to limit data scope
- Filter early in the query pipeline
- Use summarize operations efficiently

### 4. Document and Share Findings
- Create playbooks for common hunts
- Share successful queries with team
- Document false positives to improve queries

## Integration with Other Tools

### Microsoft Sentinel Integration
- Export hunting queries to Sentinel
- Use Sentinel workbooks for visualization
- Leverage Sentinel''s ML capabilities

### Threat Intelligence Platforms
- Import IOCs into custom detection rules
- Correlate findings with external threat data
- Automate threat hunting based on new intelligence

Advanced threat hunting with Microsoft 365 Defender enables proactive threat detection and response, significantly improving your security posture.',
'Learn advanced threat hunting techniques using Microsoft 365 Defender and KQL queries.',
'security',
ARRAY['Microsoft 365 Defender', 'Threat Hunting', 'KQL', 'Security'],
'published',
true,
'15 min read'),

(gen_random_uuid(), 'PowerShell Automation for Exchange Online',
'PowerShell automation is essential for efficient Exchange Online administration, enabling bulk operations and consistent configuration management.

## Getting Started with Exchange Online PowerShell

### Installation and Connection
```powershell
# Install the Exchange Online Management module
Install-Module -Name ExchangeOnlineManagement -Force

# Connect to Exchange Online
Connect-ExchangeOnline -UserPrincipalName admin@contoso.com
```

### Modern Authentication
```powershell
# Connect using modern authentication with MFA
Connect-ExchangeOnline -UserPrincipalName admin@contoso.com -ShowProgress $true

# Connect using certificate-based authentication for automation
Connect-ExchangeOnline -CertificateThumbprint "THUMBPRINT" -AppId "APP-ID" -Organization "contoso.onmicrosoft.com"
```

## Essential Exchange Online Cmdlets

### Mailbox Management
```powershell
# Get all mailboxes
Get-Mailbox | Select-Object DisplayName, PrimarySmtpAddress, RecipientTypeDetails

# Create a new mailbox
New-Mailbox -Name "John Doe" -DisplayName "John Doe" -UserPrincipalName "john.doe@contoso.com" -Password (ConvertTo-SecureString "TempPassword123!" -AsPlainText -Force)

# Set mailbox properties
Set-Mailbox -Identity "john.doe@contoso.com" -ProhibitSendQuota 50GB -ProhibitSendReceiveQuota 55GB -IssueWarningQuota 45GB

# Enable litigation hold
Set-Mailbox -Identity "john.doe@contoso.com" -LitigationHoldEnabled $true -LitigationHoldDuration 2555
```

### Distribution Group Management
```powershell
# Create a distribution group
New-DistributionGroup -Name "Marketing Team" -DisplayName "Marketing Team" -PrimarySmtpAddress "marketing@contoso.com"

# Add members to distribution group
Add-DistributionGroupMember -Identity "Marketing Team" -Member "user1@contoso.com"
Add-DistributionGroupMember -Identity "Marketing Team" -Member "user2@contoso.com"

# Get distribution group members
Get-DistributionGroupMember -Identity "Marketing Team" | Select-Object Name, PrimarySmtpAddress
```

## Advanced Automation Scripts

### Bulk Mailbox Creation
```powershell
# Import users from CSV and create mailboxes
$Users = Import-Csv "C:\Scripts\NewUsers.csv"

foreach ($User in $Users) {
    try {
        New-Mailbox -Name $User.DisplayName -DisplayName $User.DisplayName -UserPrincipalName $User.UserPrincipalName -Password (ConvertTo-SecureString $User.TempPassword -AsPlainText -Force) -FirstName $User.FirstName -LastName $User.LastName
        Write-Host "Successfully created mailbox for $($User.DisplayName)" -ForegroundColor Green
    }
    catch {
        Write-Host "Failed to create mailbox for $($User.DisplayName): $($_.Exception.Message)" -ForegroundColor Red
    }
}
```

### Mailbox Permission Management
```powershell
# Grant full access permissions
function Grant-MailboxFullAccess {
    param(
        [Parameter(Mandatory=$true)]
        [string]$Mailbox,
        [Parameter(Mandatory=$true)]
        [string]$User,
        [switch]$AutoMapping = $true
    )
    
    try {
        Add-MailboxPermission -Identity $Mailbox -User $User -AccessRights FullAccess -AutoMapping:$AutoMapping
        Write-Host "Granted full access to $Mailbox for $User" -ForegroundColor Green
    }
    catch {
        Write-Host "Failed to grant access: $($_.Exception.Message)" -ForegroundColor Red
    }
}

# Usage
Grant-MailboxFullAccess -Mailbox "shared@contoso.com" -User "manager@contoso.com"
```

### Transport Rule Automation
```powershell
# Create transport rule for disclaimer
New-TransportRule -Name "Email Disclaimer" -SentToScope "NotInOrganization" -ApplyHtmlDisclaimerText "<p><font size='2' color='gray'>This email and any attachments are confidential and may be privileged.</font></p>" -ApplyHtmlDisclaimerFallbackAction Wrap

# Create transport rule for encryption
New-TransportRule -Name "Encrypt Confidential Emails" -SubjectContainsWords "Confidential","Secret" -ApplyOME $true

# Get all transport rules
Get-TransportRule | Select-Object Name, State, Priority | Sort-Object Priority
```

## Reporting and Monitoring Scripts

### Mailbox Size Report
```powershell
# Generate mailbox size report
$MailboxStats = Get-Mailbox -ResultSize Unlimited | Get-MailboxStatistics | Select-Object DisplayName, @{Name="TotalItemSize(MB)";Expression={[math]::Round(($_.TotalItemSize.ToString().Split("(")[1].Split(" ")[0].Replace(",","")/1MB),2)}}, ItemCount, LastLogonTime

$MailboxStats | Export-Csv "C:\Reports\MailboxSizeReport.csv" -NoTypeInformation
Write-Host "Mailbox size report exported to C:\Reports\MailboxSizeReport.csv"
```

### Inactive Mailbox Report
```powershell
# Find inactive mailboxes (no logon in last 90 days)
$InactiveMailboxes = Get-Mailbox -ResultSize Unlimited | Get-MailboxStatistics | Where-Object {$_.LastLogonTime -lt (Get-Date).AddDays(-90) -or $_.LastLogonTime -eq $null} | Select-Object DisplayName, LastLogonTime, TotalItemSize

$InactiveMailboxes | Export-Csv "C:\Reports\InactiveMailboxes.csv" -NoTypeInformation
```

### Message Trace Automation
```powershell
# Automated message trace for failed deliveries
function Get-FailedMessages {
    param(
        [int]$Days = 7
    )
    
    $StartDate = (Get-Date).AddDays(-$Days)
    $EndDate = Get-Date
    
    $FailedMessages = Get-MessageTrace -StartDate $StartDate -EndDate $EndDate -Status Failed
    
    $FailedMessages | Select-Object Received, SenderAddress, RecipientAddress, Subject, Status | Export-Csv "C:\Reports\FailedMessages_$(Get-Date -Format 'yyyyMMdd').csv" -NoTypeInformation
    
    Write-Host "Found $($FailedMessages.Count) failed messages in the last $Days days"
}

# Usage
Get-FailedMessages -Days 7
```

## Best Practices for PowerShell Automation

### 1. Error Handling
```powershell
try {
    # Your Exchange Online commands here
    Connect-ExchangeOnline -UserPrincipalName $AdminUPN
}
catch {
    Write-Error "Failed to connect to Exchange Online: $($_.Exception.Message)"
    exit 1
}
finally {
    # Cleanup code
    Disconnect-ExchangeOnline -Confirm:$false
}
```

### 2. Logging
```powershell
# Create log function
function Write-Log {
    param(
        [string]$Message,
        [string]$Level = "INFO"
    )
    
    $Timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $LogMessage = "[$Timestamp] [$Level] $Message"
    
    Write-Host $LogMessage
    Add-Content -Path "C:\Logs\ExchangeAutomation.log" -Value $LogMessage
}

# Usage
Write-Log "Starting mailbox creation process" "INFO"
```

### 3. Credential Management
```powershell
# Store credentials securely
$Credential = Get-Credential
$Credential | Export-Clixml "C:\Scripts\Credentials\ExchangeAdmin.xml"

# Load stored credentials
$Credential = Import-Clixml "C:\Scripts\Credentials\ExchangeAdmin.xml"
Connect-ExchangeOnline -Credential $Credential
```

### 4. Scheduled Automation
```powershell
# Create scheduled task for automation
$Action = New-ScheduledTaskAction -Execute "PowerShell.exe" -Argument "-File C:\Scripts\DailyExchangeReport.ps1"
$Trigger = New-ScheduledTaskTrigger -Daily -At "06:00AM"
$Settings = New-ScheduledTaskSettingsSet -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries
Register-ScheduledTask -TaskName "Daily Exchange Report" -Action $Action -Trigger $Trigger -Settings $Settings
```

PowerShell automation significantly improves Exchange Online administration efficiency and consistency.',
'Essential PowerShell scripts and cmdlets for automating Exchange Online administration tasks.',
'powershell',
ARRAY['PowerShell', 'Exchange Online', 'Automation', 'Scripts'],
'published',
true,
'16 min read')
ON CONFLICT (id) DO NOTHING;

-- Update article counts for categories
UPDATE categories SET article_count = (
  SELECT COUNT(*) FROM articles WHERE articles.category = categories.id AND articles.status = 'published'
);