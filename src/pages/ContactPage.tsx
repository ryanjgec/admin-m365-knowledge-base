
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, MessageCircle, FileQuestion, Lightbulb } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    category: "",
    message: ""
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate form submission
    toast({
      title: "Message sent!",
      description: "Thank you for contacting us. We'll get back to you within 24 hours.",
    });
    
    // Reset form
    setFormData({
      name: "",
      email: "",
      subject: "",
      category: "",
      message: ""
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const contactReasons = [
    {
      icon: <FileQuestion className="w-6 h-6" />,
      title: "General Questions",
      description: "Questions about our content, website, or Microsoft 365 topics"
    },
    {
      icon: <Lightbulb className="w-6 h-6" />,
      title: "Content Suggestions",
      description: "Suggest new articles or topics you'd like to see covered"
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: "Feedback",
      description: "Share your thoughts on how we can improve our knowledge base"
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Partnerships",
      description: "Collaborate with us or discuss partnership opportunities"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Get in Touch
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Have a question, suggestion, or want to contribute? We'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Send us a Message</CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name *</Label>
                      <Input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General Question</SelectItem>
                        <SelectItem value="content">Content Suggestion</SelectItem>
                        <SelectItem value="feedback">Feedback</SelectItem>
                        <SelectItem value="partnership">Partnership</SelectItem>
                        <SelectItem value="technical">Technical Issue</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      type="text"
                      value={formData.subject}
                      onChange={(e) => handleInputChange("subject", e.target.value)}
                      placeholder="Brief description of your message"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      placeholder="Please provide details about your question or suggestion..."
                      rows={6}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full bg-ms-blue hover:bg-ms-blue-dark">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information & Reasons */}
          <div className="space-y-6">
            {/* Contact Info */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-ms-blue" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-sm text-gray-600">contact@microsoftadmin.in</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <MessageCircle className="w-5 h-5 text-ms-blue" />
                  <div>
                    <p className="font-medium">Response Time</p>
                    <p className="text-sm text-gray-600">Within 24 hours</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Why Contact Us */}
            <Card>
              <CardHeader>
                <CardTitle>How Can We Help?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {contactReasons.map((reason, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="text-ms-blue mt-1">
                        {reason.icon}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">{reason.title}</h4>
                        <p className="text-sm text-gray-600">{reason.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Links */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Links</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <a href="/about" className="block text-ms-blue hover:underline">
                    About Us
                  </a>
                  <a href="/categories" className="block text-ms-blue hover:underline">
                    Browse Categories
                  </a>
                  <a href="#newsletter" className="block text-ms-blue hover:underline">
                    Newsletter Signup
                  </a>
                  <a href="/privacy" className="block text-ms-blue hover:underline">
                    Privacy Policy
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Frequently Asked Questions</CardTitle>
              <CardDescription>
                Quick answers to common questions about our knowledge base
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">How often is content updated?</h4>
                  <p className="text-sm text-gray-600">We update our content regularly, with new articles published weekly and existing content reviewed monthly for accuracy.</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Can I suggest article topics?</h4>
                  <p className="text-sm text-gray-600">Absolutely! Use the contact form above to suggest topics you'd like to see covered. We prioritize community requests.</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Is the content free to access?</h4>
                  <p className="text-sm text-gray-600">Yes, all our content is completely free. We believe in making Microsoft 365 knowledge accessible to everyone.</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Can I contribute articles?</h4>
                  <p className="text-sm text-gray-600">Yes! We welcome expert contributions. Contact us to discuss your ideas and our contribution guidelines.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ContactPage;
