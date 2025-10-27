class EmailService {
  // Send member confirmation email (console logging for now)
  static async sendMemberConfirmation(memberData) {
    try {
      const message = `
        MEMBER CONFIRMATION EMAIL
        ========================
        
        Dear ${memberData.name},
        
        Welcome to the UO Student Workers Union! Your membership has been successfully registered.
        
        Member Details:
        - Name: ${memberData.name}
        - Email: ${memberData.email}
        - UO ID: ${memberData.uo_id}
        - Workplace: ${memberData.workplace_name || 'Not specified'}
        - Role: ${memberData.role_name || 'Member'}
        
        You will receive updates about union activities and events at this email address.
        
        Best regards,
        UOSW Administration
      `;

      console.log('📧 EMAIL SENT (Console Log):');
      console.log('To:', memberData.email);
      console.log('Subject: Welcome to UOSW - Membership Confirmation');
      console.log('Content:', message);
      console.log('=====================================');

      return { success: true, messageId: `console_${Date.now()}` };
    } catch (error) {
      console.error('Email service error:', error);
      throw new Error('Failed to send confirmation email');
    }
  }

  // Send event reminder email
  static async sendEventReminder(eventData, recipients) {
    try {
      const message = `
        EVENT REMINDER
        =============
        
        Event: ${eventData.title}
        Date: ${new Date(eventData.event_date).toLocaleString()}
        Location: ${eventData.location || 'TBD'}
        
        Description:
        ${eventData.description || 'No description provided'}
        
        We look forward to seeing you there!
        
        UOSW Administration
      `;

      console.log('📧 EVENT REMINDER EMAIL SENT (Console Log):');
      console.log('To:', recipients.map(r => r.email).join(', '));
      console.log('Subject: Event Reminder - ' + eventData.title);
      console.log('Content:', message);
      console.log('=====================================');

      return { 
        success: true, 
        messageId: `event_reminder_${Date.now()}`,
        recipientsCount: recipients.length
      };
    } catch (error) {
      console.error('Event reminder email error:', error);
      throw new Error('Failed to send event reminder');
    }
  }

  // Send check-in confirmation email
  static async sendCheckInConfirmation(memberData, eventData) {
    try {
      const message = `
        CHECK-IN CONFIRMATION
        ====================
        
        Dear ${memberData.name},
        
        You have successfully checked in to:
        
        Event: ${eventData.title}
        Date: ${new Date(eventData.event_date).toLocaleString()}
        Location: ${eventData.location || 'TBD'}
        
        Thank you for your participation!
        
        UOSW Administration
      `;

      console.log('📧 CHECK-IN CONFIRMATION EMAIL SENT (Console Log):');
      console.log('To:', memberData.email);
      console.log('Subject: Check-in Confirmation - ' + eventData.title);
      console.log('Content:', message);
      console.log('=====================================');

      return { success: true, messageId: `checkin_${Date.now()}` };
    } catch (error) {
      console.error('Check-in confirmation email error:', error);
      throw new Error('Failed to send check-in confirmation');
    }
  }

  // Send dues reminder email
  static async sendDuesReminder(memberData) {
    try {
      const message = `
        DUES REMINDER
        =============
        
        Dear ${memberData.name},
        
        This is a friendly reminder that your union dues are currently unpaid.
        
        Member Details:
        - Name: ${memberData.name}
        - UO ID: ${memberData.uo_id}
        - Workplace: ${memberData.workplace_name || 'Not specified'}
        
        Please contact the treasurer to arrange payment.
        
        Thank you for your continued membership!
        
        UOSW Administration
      `;

      console.log('📧 DUES REMINDER EMAIL SENT (Console Log):');
      console.log('To:', memberData.email);
      console.log('Subject: UOSW Dues Reminder');
      console.log('Content:', message);
      console.log('=====================================');

      return { success: true, messageId: `dues_reminder_${Date.now()}` };
    } catch (error) {
      console.error('Dues reminder email error:', error);
      throw new Error('Failed to send dues reminder');
    }
  }

  // Send general announcement
  static async sendAnnouncement(announcementData, recipients) {
    try {
      const message = `
        UNION ANNOUNCEMENT
        =================
        
        Subject: ${announcementData.subject}
        
        ${announcementData.message}
        
        UOSW Administration
      `;

      console.log('📧 ANNOUNCEMENT EMAIL SENT (Console Log):');
      console.log('To:', recipients.map(r => r.email).join(', '));
      console.log('Subject:', announcementData.subject);
      console.log('Content:', message);
      console.log('=====================================');

      return { 
        success: true, 
        messageId: `announcement_${Date.now()}`,
        recipientsCount: recipients.length
      };
    } catch (error) {
      console.error('Announcement email error:', error);
      throw new Error('Failed to send announcement');
    }
  }

  // Test email service
  static async testEmailService() {
    try {
      console.log('📧 EMAIL SERVICE TEST');
      console.log('Service is running in console logging mode');
      console.log('=====================================');
      return { success: true, mode: 'console_logging' };
    } catch (error) {
      console.error('Email service test error:', error);
      throw new Error('Email service test failed');
    }
  }
}

module.exports = EmailService;

