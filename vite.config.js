import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { execFile } from 'node:child_process'
import { randomUUID } from 'node:crypto'
import path from 'node:path'
import { promisify } from 'node:util'

const execFileAsync = promisify(execFile)
const clean = (value) => typeof value === 'string' ? value.trim() : ''

function localExcelEnquiries() {
  return {
    name: 'local-excel-enquiries',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use('/api/enquiry', (request, response, next) => {
        if (request.method !== 'POST') return next()

        let body = ''
        request.on('data', (chunk) => { body += chunk })
        request.on('end', async () => {
          response.setHeader('Content-Type', 'application/json')
          try {
            const payload = JSON.parse(body || '{}')
            if (clean(payload.fax)) return response.end(JSON.stringify({ ok: true }))

            const services = Array.isArray(payload.services) ? payload.services.map(clean).filter(Boolean).join(', ') : clean(payload.services)
            if (!clean(payload.name) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean(payload.email)) || !services || clean(payload.description).length < 20) {
              response.statusCode = 400
              return response.end(JSON.stringify({ error: 'Required enquiry details are missing or invalid.' }))
            }

            const excelRow = {
              'Submission ID': randomUUID(),
              'Submitted At (UTC)': new Date().toISOString(),
              Name: clean(payload.name),
              Email: clean(payload.email).toLowerCase(),
              Company: clean(payload.company),
              Phone: clean(payload.phone),
              Website: clean(payload.website),
              Services: services,
              Goal: clean(payload.goal),
              Budget: clean(payload.budget),
              Timeline: clean(payload.timeline),
              'Project Description': clean(payload.description),
              'Source URL': clean(payload.sourceUrl) || 'http://localhost/contact',
              Status: 'New',
            }
            const encodedRow = Buffer.from(JSON.stringify(excelRow), 'utf8').toString('base64')
            await execFileAsync('powershell.exe', ['-NoProfile', '-ExecutionPolicy', 'Bypass', '-File', path.resolve('scripts/append-enquiry-to-excel.ps1'), encodedRow], { timeout: 30000, windowsHide: true })
            response.statusCode = 200
            response.end(JSON.stringify({ ok: true, submissionId: excelRow['Submission ID'] }))
          } catch (error) {
            console.error('Local Excel write failed:', error.message)
            response.statusCode = 500
            response.end(JSON.stringify({ error: 'Could not update the local Excel workbook. Close the workbook and try again.' }))
          }
        })
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), localExcelEnquiries()],
  build: {
    assetsInlineLimit: 0,
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            { name: 'framework', test: /node_modules[\\/](react|react-dom|react-router|motion)/, priority: 20 },
            { name: 'vendor', test: /node_modules/, priority: 10 },
          ],
        },
      },
    },
  },
})
