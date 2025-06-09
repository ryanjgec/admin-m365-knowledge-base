
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import { useNewsletter } from "@/hooks/useNewsletter";

const NewsletterForm = () => {
  const { email, setEmail, subscribe, isLoading } = useNewsletter();

  return (
    <form onSubmit={subscribe} className="flex flex-col sm:flex-row gap-2 max-w-md">
      <div className="flex-1 min-w-0">
        <Input
          type="email"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-ms-blue focus:ring-ms-blue"
          required
        />
      </div>
      <Button 
        type="submit" 
        disabled={isLoading}
        className="bg-ms-blue hover:bg-ms-blue-dark whitespace-nowrap flex-shrink-0 px-4"
        size="default"
      >
        <Mail className="w-4 h-4 mr-2" />
        {isLoading ? 'Subscribing...' : 'Subscribe'}
      </Button>
    </form>
  );
};

export default NewsletterForm;
