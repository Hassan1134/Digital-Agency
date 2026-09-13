import { randomUUID } from 'node:crypto'

const clean = (value) => typeof value === 'string' ? value.trim() : ''
const json = (status, body) => new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } })

export default async function enquiry(request) {
  if (request.method !== 'POST') return json(405, { error: 'Method not allowed.' })
  if (!process.env.EXCEL_WEBHOOK_URL) return json(503, { error: 'Excel integration is not configured on Netlify.' })

  try {
    const payload = await request.json()
    if (clean(payload.fax)) return json(200, { ok: true })

    const services = Array.isArray(payload.services) ? payload.services.map(clean).filter(Boolean).join(', ') : clean(payload.services)
    const email = clean(payload.email).toLowerCase()
    if (!clean(payload.name) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !services || clean(payload.description).length < 20) {
      return json(400, { error: 'Required enquiry details are missing or invalid.' })
    }

    const excelRow = {
      'Submission ID': randomUUID(),
      'Submitted At (UTC)': new Date().toISOString(),
      Name: clean(payload.name),
      Email: email,
      Company: clean(payload.company),
      Phone: clean(payload.phone),
      Website: clean(payload.website),
      Services: services,
      Goal: clean(payload.goal),
      Budget: clean(payload.budget),
      Timeline: clean(payload.timeline),
      'Project Description': clean(payload.description),
      'Source URL': clean(payload.sourceUrl) || new URL(request.url).origin + '/contact',
      Status: 'New',
    }

    const excelResponse = await fetch(process.env.EXCEL_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(excelRow),
      signal: AbortSignal.timeout(12000),
    })
    if (!excelResponse.ok) throw new Error(`Excel webhook returned ${excelResponse.status}`)

    return json(200, { ok: true, submissionId: excelRow['Submission ID'] })
  }
  catch (error) {
    console.error('Netlify Excel delivery failed:', error.message)
    return json(502, { error: 'Excel could not save the enquiry. Please try again.' })
  }
}

export const config = { path: '/api/enquiry' }
