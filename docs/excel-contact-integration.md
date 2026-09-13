# Store contact enquiries in Microsoft Excel

The project includes a server endpoint at `api/enquiry.js`. It validates contact submissions and sends one flat, Excel-ready record to a private Power Automate workflow.

## Test locally first

The Vite development server includes a Windows-only local adapter that writes directly to `templates/Vergeform Enquiries.xlsx` using the installed Microsoft Excel application. `.env.local` already points the form to `/api/enquiry`.

1. Close `Vergeform Enquiries.xlsx` if it is open.
2. Start the site with `npm run dev` (restart it if it was already running).
3. Submit a complete enquiry through `/contact`.
4. Reopen the workbook and check the `Enquiries` worksheet.

This direct file-writing adapter runs only in local development. The deployed site uses the private Power Automate route described below.

## 1. Prepare the workbook

Use the ready-made workbook at `templates/Vergeform Enquiries.xlsx` and upload it to OneDrive for Business or SharePoint. It already contains an `Enquiries` worksheet and a named Excel table called `Enquiries` with the required headings.

| Submission ID | Submitted At (UTC) | Name | Email | Company | Phone | Website | Services | Goal | Budget | Timeline | Project Description | Source URL | Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |

Keep the headings exactly as shown so mapping remains clear.

## 2. Create the Power Automate flow

1. Create an automated cloud flow with the **When an HTTP request is received** trigger.
2. Use this sample payload to generate the request schema:

```json
{
  "Submission ID": "123e4567-e89b-12d3-a456-426614174000",
  "Submitted At (UTC)": "2026-09-13T12:00:00.000Z",
  "Name": "Example Person",
  "Email": "person@example.com",
  "Company": "Example Company",
  "Phone": "+1 555 0100",
  "Website": "https://example.com",
  "Services": "web-development, ai-automation",
  "Goal": "growth",
  "Budget": "$5,000–$15,000",
  "Timeline": "Within 1–2 months",
  "Project Description": "A representative project description.",
  "Source URL": "https://your-domain.com/contact",
  "Status": "New"
}
```

3. Add the Excel Online (Business) action **Add a row into a table**.
4. Select the workbook and `Enquiries` table, then map every incoming property to its matching Excel column.
5. Add a **Response** action with status `200` and a small JSON body such as `{ "ok": true }`.
6. Save the flow and copy its HTTP POST URL.

Microsoft documents that the current Excel Online (Business) connector supports the **Add a row into a table** action for a selected workbook and table.

## 3. Configure deployment

Set these environment variables in the hosting provider, then redeploy:

```text
VITE_ENQUIRY_ENDPOINT=/api/enquiry
EXCEL_WEBHOOK_URL=<the private Power Automate HTTP POST URL>
```

`EXCEL_WEBHOOK_URL` is server-only. Never rename it with a `VITE_` prefix and never commit its value. Variables prefixed with `VITE_` are included in browser code.

### Netlify deployment

This repository now includes `netlify/functions/enquiry.mjs` and routes it directly to `/api/enquiry`. In the Netlify dashboard, open **Project configuration → Environment variables**, create `EXCEL_WEBHOOK_URL`, paste the private Power Automate HTTP POST URL as its value, and redeploy. The variable must be available to Functions. Do not place the secret in `netlify.toml`.

The included `api/enquiry.js` follows the Vercel serverless-function convention. Netlify uses the included `netlify/functions/enquiry.mjs` adapter. Other static hosts need an equivalent server function while keeping the public route `/api/enquiry` unchanged.

## 4. Verify before launch

Submit a real test enquiry from the deployed `/contact` page. Confirm that:

- The website shows the success message only after the flow succeeds.
- Exactly one row appears in the Excel table.
- Services are stored as comma-separated values.
- The timestamp, source URL, and `New` status are populated.
- The Power Automate URL is absent from the browser Network request and built JavaScript.

For a public launch, also enable platform rate limiting or bot protection on `/api/enquiry`. A hidden honeypot is already included for basic automated-spam filtering.
