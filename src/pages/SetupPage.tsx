import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, ArrowRight, Database, User, Settings, FileText } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DatabaseStatus from '@/components/DatabaseStatus';
import { useAuth } from '@/hooks/useAuth';
import { useAdminAuth } from '@/hooks/useAdminAuth';

const SetupPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isAdminAuthenticated } = useAdminAuth();
  const [currentStep, setCurrentStep] = useState(1);

  const setupSteps = [
    {
      id: 1,
      title: 'Database Connection',
      description: 'Verify Supabase database connection and schema',
      icon: Database,
      completed: true, // Since we're here, database is connected
      action: () => setCurrentStep(2)
    },
    {
      id: 2,
      title: 'User Authentication',
      description: 'Sign up or sign in to create your account',
      icon: User,
      completed: !!user,
      action: () => navigate('/auth')
    },
    {
      id: 3,
      title: 'Admin Setup',
      description: 'Configure admin access for content management',
      icon: Settings,
      completed: isAdminAuthenticated,
      action: () => navigate('/admin-setup')
    },
    {
      id: 4,
      title: 'Content Management',
      description: 'Access admin dashboard to manage content',
      icon: FileText,
      completed: false,
      action: () => navigate('/admin')
    }
  ];

  const completedSteps = setupSteps.filter(step => step.completed).length;
  const progressPercentage = (completedSteps / setupSteps.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Setup Your Knowledge Base
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Complete these steps to get your Microsoft 365 Admin Knowledge Base up and running
          </p>
          
          {/* Progress Bar */}
          <div className="mt-8 max-w-md mx-auto">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Progress</span>
              <span>{completedSteps}/{setupSteps.length} completed</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-[#1B2A41] h-2 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Database Status Card */}
        <div className="mb-8">
          <DatabaseStatus />
        </div>

        {/* Setup Steps */}
        <div className="space-y-6">
          {setupSteps.map((step, index) => {
            const Icon = step.icon;
            const isActive = currentStep === step.id;
            
            return (
              <Card 
                key={step.id} 
                className={`transition-all duration-200 ${
                  isActive ? 'ring-2 ring-[#1B2A41] shadow-lg' : ''
                } ${step.completed ? 'bg-green-50 border-green-200' : ''}`}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-full ${
                        step.completed 
                          ? 'bg-green-100 text-green-600' 
                          : isActive 
                            ? 'bg-[#1B2A41] text-white' 
                            : 'bg-gray-100 text-gray-400'
                      }`}>
                        {step.completed ? (
                          <CheckCircle className="w-6 h-6" />
                        ) : (
                          <Icon className="w-6 h-6" />
                        )}
                      </div>
                      <div>
                        <CardTitle className="flex items-center">
                          Step {step.id}: {step.title}
                          {step.completed && (
                            <Badge className="ml-2 bg-green-500 hover:bg-green-600">
                              Completed
                            </Badge>
                          )}
                        </CardTitle>
                        <CardDescription>{step.description}</CardDescription>
                      </div>
                    </div>
                    
                    {!step.completed && (
                      <Button 
                        onClick={step.action}
                        className="bg-[#1B2A41] hover:bg-[#152030]"
                      >
                        {step.id === 2 && !user ? 'Sign Up' : 'Continue'}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    )}
                  </div>
                </CardHeader>
                
                {step.completed && (
                  <CardContent>
                    <div className="flex items-center text-green-600">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      <span className="text-sm">This step has been completed successfully</span>
                    </div>
                  </CardContent>
                )}
              </Card>
            );
          })}
        </div>

        {/* Completion Message */}
        {completedSteps === setupSteps.length && (
          <Card className="mt-8 bg-green-50 border-green-200">
            <CardHeader>
              <CardTitle className="text-green-800 flex items-center">
                <CheckCircle className="w-6 h-6 mr-2" />
                Setup Complete!
              </CardTitle>
              <CardDescription className="text-green-700">
                Your Microsoft 365 Admin Knowledge Base is ready to use.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-4">
                <Button 
                  onClick={() => navigate('/admin')}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Go to Admin Dashboard
                </Button>
                <Button 
                  onClick={() => navigate('/')}
                  variant="outline"
                >
                  View Website
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Help Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Need Help?</CardTitle>
            <CardDescription>
              If you encounter any issues during setup, here are some resources
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">Database Issues</h4>
                <p className="text-sm text-blue-700">
                  Check your Supabase connection and ensure migrations are run
                </p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <h4 className="font-semibold text-purple-800 mb-2">Authentication Problems</h4>
                <p className="text-sm text-purple-700">
                  Verify email settings and check browser console for errors
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default SetupPage;