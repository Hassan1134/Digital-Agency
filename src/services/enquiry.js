import { agency } from '../config/agency'

export class DemoModeError extends Error { constructor() { super('No enquiry endpoint is configured.'); this.name = 'DemoModeError' } }

export async function submitEnquiry(payload) {
  if (!agency.enquiryEndpoint) throw new DemoModeError()
  const response = await fetch(agency.enquiryEndpoint, {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload),
  })
  if (!response.ok) throw new Error('The enquiry could not be sent. Please try again.')
  return response.json().catch(() => ({}))
}
