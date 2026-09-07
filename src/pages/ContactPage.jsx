import { useEffect, useMemo, useRef, useState } from 'react'
import { AlertCircle, ArrowLeft, Check, CheckCircle2, LoaderCircle } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { Button } from '../components/elements/Button'
import { Seo } from '../components/modules/Seo'
import { agency } from '../config/agency'
import { goals, services } from '../data/content'
import { DemoModeError, submitEnquiry } from '../services/enquiry'

const budgets = ['Not sure yet', 'Under $5,000', '$5,000–$15,000', '$15,000–$30,000', '$30,000+']
const timelines = ['As soon as practical', 'Within 1–2 months', 'Within 3–6 months', 'Flexible / exploring']

export function ContactPage() {
  const [params] = useSearchParams()
  const serviceParam = services.some((s) => s.id === params.get('service')) ? params.get('service') : ''
  const goalParam = goals.some((g) => g.id === params.get('goal')) ? params.get('goal') : ''
  const [step, setStep] = useState(1)
  const [status, setStatus] = useState('idle')
  const [message, setMessage] = useState('')
  const summaryRef = useRef(null)
  const { register, handleSubmit, trigger, setValue, formState: { errors, isSubmitting }, getValues } = useForm({ defaultValues: { services: [], goal: '', description: '', budget: '', timeline: '', name: '', email: '', company: '', website: '', phone: '' } })
  const contactOptions = useMemo(() => [agency.email && { label: 'Email', value: agency.email, href: `mailto:${agency.email}` }, agency.whatsapp && { label: 'WhatsApp', value: agency.whatsapp, href: `https://wa.me/${agency.whatsapp.replace(/\D/g, '')}` }, agency.bookingUrl && { label: 'Book a call', value: 'Choose a time', href: agency.bookingUrl }].filter(Boolean), [])
  useEffect(() => { if (Object.keys(errors).length) summaryRef.current?.focus() }, [errors])
  useEffect(() => {
    if (serviceParam) setValue('services', [serviceParam])
    if (goalParam) setValue('goal', goalParam)
  }, [goalParam, serviceParam, setValue])
  const next = async () => { if (await trigger(['services', 'description'])) { setStep(2); window.scrollTo({ top: 0, behavior: 'smooth' }) } }
  const onSubmit = async (data) => {
    if (status === 'success' || isSubmitting) return
    setStatus('loading'); setMessage('')
    try { await submitEnquiry(data); setStatus('success'); setMessage('Your enquiry has been confirmed as received.') }
    catch (error) { setStatus(error instanceof DemoModeError ? 'demo' : 'error'); setMessage(error instanceof DemoModeError ? 'Demo only: no enquiry endpoint is configured, so your information has not been sent. Add VITE_ENQUIRY_ENDPOINT to enable live submission.' : error.message) }
  }
  const errorKeys = Object.keys(errors)
  return <>
    <Seo title="Contact — Growth Studio" description="Tell Growth Studio about your website, brand, or marketing project." path="/contact" />
    <section className="contact-page surface-dark"><div className="container contact-layout"><aside className="contact-intro"><p className="eyebrow">Start a project</p><h1>Tell us what you<br /><em>want to build.</em></h1><p className="lede">A few useful details will help us understand the opportunity and suggest a sensible next step.</p><div className="next-steps"><h2>What happens next</h2><ol><li><span>01</span>We review your goals, context, and requested services.</li><li><span>02</span>If the fit looks useful, we agree on a discovery conversation.</li><li><span>03</span>You receive a tailored scope and proposal—never a generic package.</li></ol></div>{contactOptions.length > 0 && <div className="direct-contact"><p className="mini-label">Prefer another route?</p>{contactOptions.map((item) => <a key={item.href} href={item.href}><span>{item.label}</span>{item.value}</a>)}</div>}</aside>
      <div className="enquiry-card"><div className="form-progress" aria-label={`Step ${step} of 2`}><div><span>0{step}</span> / 02</div><div className="form-progress__track"><i style={{ width: `${step * 50}%` }} /></div><p>{step === 1 ? 'Project details' : 'Your details'}</p></div>
        {errorKeys.length > 0 && <div className="error-summary" ref={summaryRef} tabIndex="-1" role="alert"><AlertCircle /><div><strong>Please check the highlighted fields.</strong><ul>{errorKeys.map((key) => <li key={key}>{errors[key]?.message}</li>)}</ul></div></div>}
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <input type="hidden" {...register('goal')} />
          {step === 1 && <div className="form-step"><fieldset><legend>What do you need? <span>Required</span></legend><div className="checkbox-grid">{services.map((service) => <label key={service.id}><input type="checkbox" value={service.id} {...register('services', { validate: (value) => value.length > 0 || 'Choose at least one service.' })} /><span><i><Check /></i>{service.short}</span></label>)}</div>{errors.services && <p className="field-error">{errors.services.message}</p>}</fieldset><label className="field"><span>Tell us about the project <b>Required</b></span><textarea rows="7" placeholder="What are you building, changing, or trying to achieve?" {...register('description', { required: 'Add a short project description.', minLength: { value: 20, message: 'Please share at least 20 characters.' } })} />{errors.description && <small>{errors.description.message}</small>}</label><div className="form-pair"><label className="field"><span>Budget range <b>Optional</b></span><select {...register('budget')}><option value="">Select a range</option>{budgets.map((item) => <option key={item}>{item}</option>)}</select></label><label className="field"><span>Preferred timeline <b>Optional</b></span><select {...register('timeline')}><option value="">Select timing</option>{timelines.map((item) => <option key={item}>{item}</option>)}</select></label></div><Button type="button" onClick={next}>Continue to contact details</Button></div>}
          {step === 2 && <div className="form-step"><div className="form-pair"><label className="field"><span>Name <b>Required</b></span><input autoComplete="name" {...register('name', { required: 'Enter your name.' })} />{errors.name && <small>{errors.name.message}</small>}</label><label className="field"><span>Email <b>Required</b></span><input type="email" autoComplete="email" {...register('email', { required: 'Enter your email.', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email address.' } })} />{errors.email && <small>{errors.email.message}</small>}</label></div><div className="form-pair"><label className="field"><span>Company <b>Optional</b></span><input autoComplete="organization" {...register('company')} /></label><label className="field"><span>Website URL <b>Optional</b></span><input type="url" placeholder="https://" {...register('website', { validate: (value) => !value || /^https?:\/\/.+/.test(value) || 'Use a full URL beginning with http:// or https://.' })} />{errors.website && <small>{errors.website.message}</small>}</label></div><label className="field"><span>Phone or WhatsApp <b>Optional</b></span><input type="tel" autoComplete="tel" {...register('phone')} /></label><p className="privacy-note">We use these details only to assess and respond to your enquiry. They are not added to a marketing list.</p>{status !== 'idle' && <div className={`submit-status submit-status--${status}`} role="status">{status === 'loading' ? <LoaderCircle className="spin" /> : status === 'success' ? <CheckCircle2 /> : <AlertCircle />}<p>{message || 'Sending your enquiry…'}</p></div>}<div className="form-actions"><button type="button" className="back-button" onClick={() => setStep(1)}><ArrowLeft /> Back</button><Button type="submit" disabled={isSubmitting || status === 'success'}>{isSubmitting ? 'Sending…' : agency.enquiryEndpoint ? 'Send enquiry' : 'Test demo submission'}</Button></div></div>}
        </form>{!agency.enquiryEndpoint && <p className="demo-label"><strong>Demo form:</strong> submissions are intentionally not sent until an endpoint is configured. Your current project selections: {getValues('services').length || 0}.</p>}</div>
    </div></section>
  </>
}
