const requiredText = (value) => typeof value === 'string' ? value.trim() : ''

function buildExcelRow(body, request) {
  const services = Array.isArray(body.services) ? body.services.map(requiredText).filter(Boolean).join(', ') : requiredText(body.services)
  const forwardedHost = request.headers['x-forwarded-host'] || request.headers.host || ''
  const forwardedProtocol = request.headers['x-forwarded-proto'] || 'https'

  return {
    'Submission ID': globalThis.crypto.randomUUID(),
    'Submitted At (UTC)': new Date().toISOString(),
    Name: requiredText(body.name),
    Email: requiredText(body.email).toLowerCase(),
    Company: requiredText(body.company),
    Phone: requiredText(body.phone),
    Website: requiredText(body.website),
    Services: services,
    Goal: requiredText(body.goal),
    Budget: requiredText(body.budget),
    Timeline: requiredText(body.timeline),
    'Project Description': requiredText(body.description),
    'Source URL': requiredText(body.sourceUrl) || `${forwardedProtocol}://${forwardedHost}/contact`,
    Status: 'New',
  }
}

export default async function handler(request, response) {
  if (request.method !== 'POST') return response.status(405).json({ error: 'Method not allowed.' })
  if (!process.env.EXCEL_WEBHOOK_URL) return response.status(503).json({ error: 'The Excel integration is not configured.' })

  const body = typeof request.body === 'string' ? JSON.parse(request.body) : request.body || {}

  // A filled honeypot is treated as success but is never stored.
  if (requiredText(body.fax)) return response.status(200).json({ ok: true })

  const row = buildExcelRow(body, request)
  if (!row.Name || !row.Email || !row.Services || row['Project Description'].length < 20) {
    return response.status(400).json({ error: 'Required enquiry details are missing or invalid.' })
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(row.Email)) return response.status(400).json({ error: 'Enter a valid email address.' })

  try {
    const excelResponse = await fetch(process.env.EXCEL_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(row),
      signal: AbortSignal.timeout(12000),
    })

    if (!excelResponse.ok) throw new Error(`Excel webhook returned ${excelResponse.status}`)
    return response.status(200).json({ ok: true, submissionId: row['Submission ID'] })
  } catch (error) {
    console.error('Excel enquiry delivery failed:', error.message)
    return response.status(502).json({ error: 'The enquiry could not be saved. Please try again.' })
  }
}
