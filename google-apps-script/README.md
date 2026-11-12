# Google Sheets Leads Backup & Email Notification Setup

Follow this step-by-step guide to set up a free, automatic Google Sheets backup and instant email alert for every website lead.

---

### Step 1: Create a New Google Sheet
1. Go to [https://sheets.new](https://sheets.new) in your browser.
2. Name the sheet in the top-left (e.g., **`Kashish Studio Leads 2026`**).
3. *(Optional)* You can leave row 1 blank — `Code.gs` will automatically write and format the 18 columns with royal maroon styling on the first submission!
   Or paste these 18 headers in `A1:R1`:
   > `Timestamp`, `Name`, `Mobile`, `Service Type`, `Service`, `Date`, `Preferred Time`, `Where`, `Location`, `People`, `Package`, `Message`, `Page URL`, `utm_source`, `utm_medium`, `utm_campaign`, `gclid`, `fbclid`

---

### Step 2: Open Google Apps Script
1. In your Google Sheet menu bar, click **Extensions** → **Apps Script**.
2. Delete any default code in the editor (`function myFunction() {}`).
3. Open [`google-apps-script/Code.gs`](./Code.gs) from this project, copy the entire code, and paste it into the Apps Script editor.
4. *(Optional)* If you want email alerts sent to a specific email instead of your default Google account, set:
   ```javascript
   const NOTIFICATION_EMAIL = "your-email@gmail.com";
   ```
5. Click the **Save** icon (disk icon or `Ctrl + S`).

---

### Step 3: Deploy as a Web App
1. Click the blue **Deploy** button at the top-right → select **New deployment**.
2. In the modal that appears, click the **gear icon** ⚙️ next to *Select type* → choose **Web app**.
3. Fill in the deployment settings:
   - **Description**: `Kashish Studio Leads Webhook`
   - **Execute as**: `Me (<your-email@gmail.com>)`
   - **Who has access**: `Anyone` *(Crucial: allows the website form to POST leads without requiring visitors to sign in to Google)*
4. Click **Deploy**.

---

### Step 4: Authorize Google Permissions
1. Click **Authorize Access** when prompted by Google.
2. Select your Google account.
3. If Google shows *"Google hasn't verified this app"*:
   - Click **Advanced** (small link at bottom-left).
   - Click **Go to Untitled project (unsafe)**.
4. Click **Allow** to permit the script to write rows to your Google Sheet and send email notifications.

---

### Step 5: Copy Web App URL & Paste into `.env`
1. After authorization, Google displays:
   > **Web app URL**:
   > `https://script.google.com/macros/s/AKfycbx.../exec`
2. Click **Copy**.
3. Open your project's [`.env`](../.env) file in your code editor and paste it into `VITE_LEADS_WEBHOOK_URL`:
   ```bash
   VITE_LEADS_WEBHOOK_URL="https://script.google.com/macros/s/AKfycbx.../exec"
   ```

---

### Step 6: Test the Integration
1. Run `npm run dev` and submit a test booking on the website.
2. Check your Google Sheet: a new row with all 18 fields will appear instantly!
3. Check your email: an instant email notification with the `[Service Type]` in the subject will arrive.
