
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface NewsletterEmailRequest {
  email: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email }: NewsletterEmailRequest = await req.json();

    if (!email) {
      throw new Error("Email is required");
    }

    // Send confirmation email
    const emailResponse = await resend.emails.send({
      from: "Microsoft Admin Knowledge Base <onboarding@resend.dev>",
      to: [email],
      subject: "Welcome to Microsoft Admin Knowledge Base Newsletter!",
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background-color: #1B2A41; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="margin: 0; font-size: 24px;">Welcome to Microsoft Admin Knowledge Base!</h1>
          </div>
          
          <div style="background-color: #f8f9fa; padding: 30px; border-radius: 0 0 8px 8px;">
            <h2 style="color: #1B2A41; margin-top: 0;">Thank you for subscribing!</h2>
            
            <p style="color: #333; line-height: 1.6;">
              You've successfully subscribed to our newsletter. You'll now receive:
            </p>
            
            <ul style="color: #333; line-height: 1.8;">
              <li>Latest Microsoft 365 administration tips and tricks</li>
              <li>Step-by-step guides for complex configurations</li>
              <li>Best practices from industry experts</li>
              <li>Early access to new articles and resources</li>
            </ul>
            
            <p style="color: #333; line-height: 1.6;">
              Stay tuned for valuable content that will help you master Microsoft 365 administration!
            </p>
            
            <div style="text-align: center; margin-top: 30px;">
              <a href="${Deno.env.get('SITE_URL') || 'https://your-site.com'}" 
                 style="background-color: #1B2A41; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block;">
                Visit Our Website
              </a>
            </div>
            
            <p style="color: #666; font-size: 12px; margin-top: 30px; text-align: center;">
              You can unsubscribe at any time by clicking the unsubscribe link in our emails.
            </p>
          </div>
        </div>
      `,
    });

    console.log("Newsletter confirmation email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ 
      success: true, 
      message: "Newsletter subscription confirmed! Check your email." 
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-newsletter-email function:", error);
    return new Response(
      JSON.stringify({ 
        error: error.message || "Failed to send newsletter confirmation email" 
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
