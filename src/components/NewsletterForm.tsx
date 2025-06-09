
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import { useNewsletter } from "@/hooks/useNewsletter";

const NewsletterForm = () => {
  const { email, setEmail, subscribe, isLoading } = useNewsletter();

  return (
    <form onSubmit={subscribe} className="flex flex-col sm:flex-row gap-3">
      <div className="flex-1">
        <Input
          type="email"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full"
          required
        />
      </div>
      <Button 
        type="submit" 
        disabled={isLoading}
        className="bg-ms-blue hover:bg-ms-blue-dark whitespace-nowrap"
      >
        <Mail className="w-4 h-4 mr-2" />
        {isLoading ? 'Subscribing...' : 'Subscribe'}
      </Button>
    </form>
  );
};

export default NewsletterForm;
