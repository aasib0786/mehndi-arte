/**
 * ============================================================================
 * GOOGLE APPS SCRIPT (Code.gs)
 * Automated Leads Logger to Google Sheets + Instant Email Alerts
 * ============================================================================
 *
 * Receives POST JSON from the website booking form and:
 * 1. Appends a row in Google Sheet with all 18 columns.
 * 2. Automatically initializes headers & styling if sheet is empty.
 * 3. Sends an immediate email alert with the [Service Type] in the subject.
 */

// ----------------------------------------------------------------------------
// CONFIGURATION
// ----------------------------------------------------------------------------
// Leave empty ("") to automatically send alerts to the Google account hosting this script,
// or specify a custom email address like "kashishmehndistudio@gmail.com":
const NOTIFICATION_EMAIL = "";

// The 18 exact column headers in required order:
const HEADERS = [
  "Timestamp",
  "Name",
  "Mobile",
  "Service Type",
  "Service",
  "Date",
  "Preferred Time",
  "Where",
  "Location",
  "People",
  "Package",
  "Message",
  "Page URL",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "gclid",
  "fbclid"
];

/**
 * Handles incoming POST requests from the website booking form.
 */
function doPost(e) {
  try {
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = spreadsheet.getActiveSheet();

    // 1. Auto-create headers if sheet is brand new/empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
      const headerRange = sheet.getRange(1, 1, 1, HEADERS.length);
      headerRange.setFontWeight("bold");
      headerRange.setBackground("#5A1E1B"); // Royal Maroon
      headerRange.setFontColor("#FFFFFF");
      sheet.setFrozenRows(1);
    }

    // 2. Parse incoming JSON payload
    let data = {};
    if (e && e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    } else if (e && e.parameter) {
      data = e.parameter;
    }

    // 3. Extract and normalize all 18 fields
    const timestamp = Utilities.formatDate(new Date(), "Asia/Kolkata", "yyyy-MM-dd HH:mm:ss");
    const name = (data.Name || data.fullName || "").toString().trim();
    const mobile = (data.Mobile || data.mobile || "").toString().trim();
    const serviceType = (data.ServiceType || data.serviceType || data.occasion || "General").toString().trim();
    const service = (data.Service || data.service || "General Booking").toString().trim();
    const date = (data.EventDate || data.Date || data.eventDate || "").toString().trim();
    const preferredTime = (data.TimeSlot || data.PreferredTime || data.preferredTimeSlot || "Flexible").toString().trim();
    const where = (data.Where || data.where || "At Studio").toString().trim();
    const location = (data.Location || data.location || (where === "At Studio" ? "At Studio (GK-1, New Delhi)" : "")).toString().trim();
    const people = (data.People || data.numberOfPeople || "1").toString().trim();
    const pkg = (data.Package || data.preferredPackage || "Custom").toString().trim();
    const message = (data.Message || data.notes || "").toString().trim();
    const pageUrl = (data.PageUrl || data.pageUrl || "").toString().trim();
    const utmSource = (data.utm_source || "").toString().trim();
    const utmMedium = (data.utm_medium || "").toString().trim();
    const utmCampaign = (data.utm_campaign || "").toString().trim();
    const gclid = (data.gclid || "").toString().trim();
    const fbclid = (data.fbclid || "").toString().trim();

    // 4. Append row with all 18 columns in exact requested order
    sheet.appendRow([
      timestamp,
      name,
      mobile,
      serviceType,
      service,
      date,
      preferredTime,
      where,
      location,
      people,
      pkg,
      message,
      pageUrl,
      utmSource,
      utmMedium,
      utmCampaign,
      gclid,
      fbclid
    ]);

    // Format new row cells as plain text for mobile numbers and dates
    const newRowNum = sheet.getLastRow();
    sheet.getRange(newRowNum, 1, 1, HEADERS.length).setNumberFormat("@");

    // 5. Send instant email notification with [Service Type] in subject
    sendLeadEmailNotification({
      timestamp,
      name,
      mobile,
      serviceType,
      service,
      date,
      preferredTime,
      where,
      location,
      people,
      pkg,
      message,
      pageUrl,
      utmSource,
      utmMedium,
      utmCampaign,
      gclid,
      fbclid
    });

    // 6. Return standard JSON response
    return ContentService.createTextOutput(
      JSON.stringify({
        status: "success",
        message: "Lead recorded and notification dispatched successfully",
        row: newRowNum
      })
    ).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    console.error("Error processing lead submission:", error);
    return ContentService.createTextOutput(
      JSON.stringify({
        status: "error",
        message: error.toString()
      })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Health-check endpoint for browser visits.
 */
function doGet(e) {
  return ContentService.createTextOutput(
    JSON.stringify({
      status: "online",
      service: "Kashish Mehndi & Makeup Studio Lead Webhook",
      timestamp: Utilities.formatDate(new Date(), "Asia/Kolkata", "yyyy-MM-dd HH:mm:ss")
    })
  ).setMimeType(ContentService.MimeType.JSON);
}

/**
 * Sends formatted email alert to the artist/studio owner.
 */
function sendLeadEmailNotification(lead) {
  const recipient = NOTIFICATION_EMAIL || Session.getEffectiveUser().getEmail();
  if (!recipient || !recipient.includes("@")) return;

  // Subject line with Service Type (as specified in prompt)
  const subject = `✦ New [${lead.serviceType}] Lead: ${lead.name} (${lead.mobile}) · Date: ${lead.date || 'Flexible'}`;

  const plainTextBody = `
New Booking Lead Received!

Service Line: ${lead.serviceType}
Selected Service: ${lead.service}
Client Name: ${lead.name}
Mobile Number: ${lead.mobile}
Event Date: ${lead.date || "Not specified"} | Time Slot: ${lead.preferredTime}
Where: ${lead.where}
Location / Address: ${lead.location || "N/A"}
Number of People: ${lead.people}
Preferred Package: ${lead.pkg}

Client Notes:
${lead.message || "None provided"}

Marketing & Ad Attribution:
- Source: ${lead.utmSource || "direct"}
- Medium: ${lead.utmMedium || "none"}
- Campaign: ${lead.utmCampaign || "none"}
- Google Ad (gclid): ${lead.gclid || "none"}
- Meta Ad (fbclid): ${lead.fbclid || "none"}
- Page URL: ${lead.pageUrl}

Submitted on: ${lead.timestamp} (IST)
`;

  const htmlBody = `
    <div style="font-family: Arial, sans-serif; max-width: 620px; margin: 0 auto; border: 1px solid #B8893A; padding: 24px; background-color: #FCF9F3;">
      <div style="text-align: center; border-bottom: 2px solid #5A1E1B; padding-bottom: 16px; margin-bottom: 20px;">
        <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: #B8893A; font-weight: bold;">New Website Commission</span>
        <h2 style="color: #5A1E1B; margin: 6px 0; font-size: 24px;">${lead.serviceType} Enquiry</h2>
        <span style="font-size: 13px; color: #666;">Received on ${lead.timestamp} (IST)</span>
      </div>

      <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 20px;">
        <tr style="background: #F4ECE0;">
          <td style="padding: 10px; font-weight: bold; width: 35%; color: #5A1E1B;">Client Name:</td>
          <td style="padding: 10px; font-weight: bold; color: #222;">${lead.name}</td>
        </tr>
        <tr>
          <td style="padding: 10px; font-weight: bold; color: #5A1E1B;">Mobile Number:</td>
          <td style="padding: 10px;"><a href="tel:${lead.mobile}" style="color: #5A1E1B; text-decoration: none; font-weight: bold;">${lead.mobile}</a> &nbsp;|&nbsp; <a href="https://wa.me/${lead.mobile.replace(/[^0-9]/g, '')}" style="color: #25D366; text-decoration: none; font-weight: bold;">WhatsApp ↗</a></td>
        </tr>
        <tr style="background: #F4ECE0;">
          <td style="padding: 10px; font-weight: bold; color: #5A1E1B;">Service Line:</td>
          <td style="padding: 10px; font-weight: bold; color: #5A1E1B;">${lead.serviceType}</td>
        </tr>
        <tr>
          <td style="padding: 10px; font-weight: bold; color: #5A1E1B;">Specific Service:</td>
          <td style="padding: 10px;">${lead.service}</td>
        </tr>
        <tr style="background: #F4ECE0;">
          <td style="padding: 10px; font-weight: bold; color: #5A1E1B;">Event Date & Time:</td>
          <td style="padding: 10px;">${lead.date || 'Flexible'} (Slot: ${lead.preferredTime})</td>
        </tr>
        <tr>
          <td style="padding: 10px; font-weight: bold; color: #5A1E1B;">Venue / Location:</td>
          <td style="padding: 10px;">${lead.where} — ${lead.location || 'GK-1 Studio'}</td>
        </tr>
        <tr style="background: #F4ECE0;">
          <td style="padding: 10px; font-weight: bold; color: #5A1E1B;">People & Package:</td>
          <td style="padding: 10px;">${lead.people} Person(s) &bull; ${lead.pkg}</td>
        </tr>
      </table>

      ${
        lead.message
          ? `<div style="background: #FFF; border-left: 4px solid #B8893A; padding: 12px 16px; margin-bottom: 20px;">
               <div style="font-size: 11px; text-transform: uppercase; color: #888; margin-bottom: 4px;">Client Message / Look Reference:</div>
               <div style="font-size: 14px; color: #333; line-height: 1.5;">${lead.message}</div>
             </div>`
          : ''
      }

      <div style="background: #EFE8DC; padding: 12px; font-size: 11px; color: #555;">
        <div style="font-weight: bold; margin-bottom: 4px; text-transform: uppercase; letter-spacing: 1px; color: #5A1E1B;">Marketing Attribution:</div>
        <div><strong>UTM Source:</strong> ${lead.utmSource || 'direct'} | <strong>Campaign:</strong> ${lead.utmCampaign || 'none'}</div>
        <div><strong>Google Ads (gclid):</strong> ${lead.gclid || 'none'} | <strong>Meta Ads (fbclid):</strong> ${lead.fbclid || 'none'}</div>
        <div><strong>Landing Page:</strong> ${lead.pageUrl}</div>
      </div>
    </div>
  `;

  try {
    MailApp.sendEmail({
      to: recipient,
      subject: subject,
      body: plainTextBody,
      htmlBody: htmlBody
    });
  } catch (mailError) {
    console.warn("Could not dispatch email notification:", mailError);
  }
}
