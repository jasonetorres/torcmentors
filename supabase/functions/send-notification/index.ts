import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.3';
import { Resend } from "npm:resend@4.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface NotificationRequest {
  type: 'meeting_assigned' | 'message_received' | 'task_assigned' | 'goal_updated';
  recipient_email: string;
  recipient_name: string;
  sender_name?: string;
  data: {
    title?: string;
    message?: string;
    meeting_date?: string;
    meeting_time?: string;
    group_name?: string;
    [key: string]: any;
  };
}

const getEmailTemplate = (type: string, data: any, recipientName: string, senderName?: string) => {
  const baseStyle = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 12px 12px 0 0;">
        <h1 style="color: white; margin: 0; text-align: center;">Torc Mentorship</h1>
      </div>
      <div style="background: white; padding: 30px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
  `;

  const baseFooter = `
      </div>
      <div style="text-align: center; margin-top: 20px; color: #666; font-size: 14px;">
        <p>Best regards,<br>The Torc Mentorship Team</p>
        <p style="font-size: 12px; color: #999;">This is an automated notification from your mentorship platform.</p>
      </div>
    </div>
  `;

  switch (type) {
    case 'meeting_assigned':
      return `${baseStyle}
        <h2 style="color: #333; margin-top: 0;">New Meeting Scheduled</h2>
        <p>Hi ${recipientName},</p>
        <p>${senderName} has scheduled a meeting with you:</p>
        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin: 0 0 10px 0; color: #333;">${data.title}</h3>
          <p style="margin: 5px 0;"><strong>Date:</strong> ${data.meeting_date}</p>
          <p style="margin: 5px 0;"><strong>Time:</strong> ${data.meeting_time}</p>
          <p style="margin: 5px 0;"><strong>Group:</strong> ${data.group_name}</p>
          ${data.message ? `<p style="margin: 10px 0 0 0;"><strong>Notes:</strong> ${data.message}</p>` : ''}
        </div>
        <p>Please check your dashboard for more details and to confirm your attendance.</p>
        ${baseFooter}`;

    case 'message_received':
      return `${baseStyle}
        <h2 style="color: #333; margin-top: 0;">New Message</h2>
        <p>Hi ${recipientName},</p>
        <p>You have received a new message from ${senderName} in ${data.group_name}:</p>
        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #667eea;">
          <p style="margin: 0; font-style: italic;">"${data.message}"</p>
        </div>
        <p>Log in to your dashboard to read the full conversation and reply.</p>
        ${baseFooter}`;

    case 'task_assigned':
      return `${baseStyle}
        <h2 style="color: #333; margin-top: 0;">New Task Assigned</h2>
        <p>Hi ${recipientName},</p>
        <p>${senderName} has assigned you a new task:</p>
        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin: 0 0 10px 0; color: #333;">${data.title}</h3>
          ${data.message ? `<p style="margin: 0;">${data.message}</p>` : ''}
          ${data.due_date ? `<p style="margin: 10px 0 0 0;"><strong>Due Date:</strong> ${data.due_date}</p>` : ''}
        </div>
        <p>Please check your dashboard to view the complete task details.</p>
        ${baseFooter}`;

    case 'goal_updated':
      return `${baseStyle}
        <h2 style="color: #333; margin-top: 0;">Goal Progress Update</h2>
        <p>Hi ${recipientName},</p>
        <p>${senderName} has updated your goal progress:</p>
        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin: 0 0 10px 0; color: #333;">${data.title}</h3>
          ${data.message ? `<p style="margin: 0;">${data.message}</p>` : ''}
          ${data.progress ? `<p style="margin: 10px 0 0 0;"><strong>Progress:</strong> ${data.progress}%</p>` : ''}
        </div>
        <p>Keep up the great work on your mentorship journey!</p>
        ${baseFooter}`;

    default:
      return `${baseStyle}
        <h2 style="color: #333; margin-top: 0;">Notification</h2>
        <p>Hi ${recipientName},</p>
        <p>You have a new notification from your mentorship platform.</p>
        <p>Please check your dashboard for more details.</p>
        ${baseFooter}`;
  }
};

const getSubjectLine = (type: string, data: any) => {
  switch (type) {
    case 'meeting_assigned':
      return `Meeting Scheduled: ${data.title}`;
    case 'message_received':
      return `New message from ${data.sender_name}`;
    case 'task_assigned':
      return `New Task: ${data.title}`;
    case 'goal_updated':
      return `Goal Update: ${data.title}`;
    default:
      return 'Torc Mentorship Notification';
  }
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Processing notification request...");
    
    const { type, recipient_email, recipient_name, sender_name, data }: NotificationRequest = await req.json();

    console.log(`Sending ${type} notification to ${recipient_email}`);

    const htmlContent = getEmailTemplate(type, data, recipient_name, sender_name);
    const subject = getSubjectLine(type, { ...data, sender_name });

    const emailResponse = await resend.emails.send({
      from: "Torc Mentorship <notifications@resend.dev>",
      to: [recipient_email],
      subject: subject,
      html: htmlContent,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, emailResponse }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error sending notification:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);