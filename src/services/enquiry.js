import { agency } from '../config/agency'

export class DemoModeError extends Error { constructor() { super('No enquiry endpoint is configured.'); this.name = 'DemoModeError' } }

export async function submitEnquiry(payload) {
  if (!agency.enquiryEndpoint) throw new DemoModeError()
  const controller = new AbortController()
  const timeout = window.setTimeout(() => controller.abort(), 15000)
  try {
    const response = await fetch(agency.enquiryEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...payload, sourceUrl: window.location.href }),
      signal: controller.signal,
    })
    const result = await response.json().catch(() => ({}))
    if (!response.ok) throw new Error(result.error || 'The enquiry could not be sent. Please try again.')
    return result
  } catch (error) {
    if (error.name === 'AbortError' || error.name === 'TimeoutError') throw new Error('The request timed out. Please try again.')
    throw error
  } finally {
    window.clearTimeout(timeout)
  }
}
