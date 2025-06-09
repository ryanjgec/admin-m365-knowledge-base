
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const AboutPage = () => {
  const teamMembers = [
    {
      name: "Microsoft 365 Community",
      role: "Content Contributors",
      description: "Expert administrators and consultants sharing real-world experience"
    },
    {
      name: "Technical Reviewers",
      role: "Quality Assurance",
      description: "Ensuring accuracy and best practices in all published content"
    },
    {
      name: "Community Moderators",
      role: "Community Management",
      description: "Fostering a helpful and collaborative learning environment"
    }
  ];

  const features = [
    "Expert-written articles and guides",
    "Real-world troubleshooting scenarios",
    "Step-by-step PowerShell examples",
    "Best practices and recommendations",
    "Regular content updates",
    "Community-driven knowledge sharing"
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About MicrosoftAdmin.in
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your trusted source for Microsoft 365 administration knowledge, 
            built by administrators for administrators.
          </p>
        </div>

        {/* Mission Section */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl">Our Mission</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 text-lg leading-relaxed mb-4">
              MicrosoftAdmin.in was created to bridge the knowledge gap in Microsoft 365 administration. 
              We understand the daily challenges faced by IT administrators, and our goal is to provide 
              practical, tested solutions that work in real-world scenarios.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              Our knowledge base combines expert insights, community contributions, and hands-on 
              experience to deliver the most comprehensive resource for Microsoft 365 administrators 
              in India and beyond.
            </p>
          </CardContent>
        </Card>

        {/* What We Offer */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl">What We Offer</CardTitle>
            <CardDescription>
              Comprehensive resources designed for Microsoft 365 administrators
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-ms-blue rounded-full"></div>
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Coverage Areas */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl">Coverage Areas</CardTitle>
            <CardDescription>
              We cover all major Microsoft 365 services and administrative tasks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <Badge variant="secondary" className="p-3 text-center bg-blue-50 text-blue-700">
                Exchange Online
              </Badge>
              <Badge variant="secondary" className="p-3 text-center bg-purple-50 text-purple-700">
                Microsoft Teams
              </Badge>
              <Badge variant="secondary" className="p-3 text-center bg-green-50 text-green-700">
                Intune & MDM
              </Badge>
              <Badge variant="secondary" className="p-3 text-center bg-orange-50 text-orange-700">
                Azure AD & Identity
              </Badge>
              <Badge variant="secondary" className="p-3 text-center bg-indigo-50 text-indigo-700">
                SharePoint Online
              </Badge>
              <Badge variant="secondary" className="p-3 text-center bg-red-50 text-red-700">
                Security & Compliance
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Team Section */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl">Our Contributors</CardTitle>
            <CardDescription>
              A community of experienced Microsoft 365 professionals
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {teamMembers.map((member, index) => (
                <div key={index} className="text-center p-4 border rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">{member.name}</h3>
                  <Badge variant="outline" className="mb-3">{member.role}</Badge>
                  <p className="text-sm text-gray-600">{member.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Community Section */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl">Join Our Community</CardTitle>
            <CardDescription>
              Become part of the growing Microsoft 365 administrator community
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-6">
              We believe in the power of community-driven knowledge sharing. Whether you're 
              a seasoned administrator or just starting your Microsoft 365 journey, there's 
              a place for you in our community.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-ms-blue-light rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Share Your Knowledge</h4>
                <p className="text-sm text-gray-600">
                  Contribute articles, tips, and solutions based on your real-world experience.
                </p>
              </div>
              <div className="p-4 bg-ms-blue-light rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Learn from Experts</h4>
                <p className="text-sm text-gray-600">
                  Access in-depth guides and troubleshooting resources from industry experts.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact CTA */}
        <div className="text-center bg-white p-8 rounded-lg shadow-sm border">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Have Questions or Suggestions?
          </h2>
          <p className="text-gray-600 mb-6">
            We'd love to hear from you. Reach out to us with any questions, 
            suggestions, or if you'd like to contribute to our knowledge base.
          </p>
          <a 
            href="/contact" 
            className="inline-flex items-center px-6 py-3 bg-ms-blue hover:bg-ms-blue-dark text-white rounded-lg font-medium transition-colors"
          >
            Get in Touch
          </a>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AboutPage;
