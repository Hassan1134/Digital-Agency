import { useCallback, useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Bot, MessageCircle, RotateCcw, Sparkles, X } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { Link } from 'react-router-dom'
import { useFocusTrap } from '../../hooks/useFocusTrap'

const greeting = { role: 'agent', text: 'Hello—I’m the Vergeform guide. Choose a question and I’ll point you in the right direction.' }
const questions = [
  { id: 'services', question: 'What services do you offer?', answer: 'We combine website design and development, AI solutions and automation, branding and UI/UX, SEO, paid advertising, social media, and creative production. Engagements can focus on one discipline or connect several around a business goal.', action: { label: 'Explore services', to: '/services' } },
  { id: 'website', question: 'Can you redesign my website?', answer: 'Yes. We can audit what is working, clarify the customer journey, redesign the interface, rebuild it in React, and strengthen performance, accessibility, SEO, and lead capture.', action: { label: 'Explore web services', to: '/services/web-design-development' } },
  { id: 'ai', question: 'Can you build AI solutions?', answer: 'Yes. We can shape AI-native products, agent workflows, business automations, and intelligent customer experiences—with clear controls, evaluation, and human oversight built in.', action: { label: 'Explore AI services', to: '/services/ai-solutions-automation' } },
  { id: 'pricing', question: 'How much does a project cost?', answer: 'Pricing depends on scope, complexity, team, and timeline. After learning what outcome you need, we provide a tailored proposal with deliverables, assumptions, optional additions, and payment stages.', action: { label: 'Request a proposal', to: '/contact' } },
  { id: 'timeline', question: 'How long will my project take?', answer: 'Timing varies by scope and review speed. A focused engagement may take several weeks, while a larger brand or product programme may run across multiple phases. Your proposal includes clear milestones.', action: { label: 'Tell us your timeline', to: '/contact' } },
  { id: 'start', question: 'How do we get started?', answer: 'Send a short enquiry with your goals, required services, preferred timing, and useful context. We review the fit and arrange a discovery conversation before recommending the next step.', action: { label: 'Start a project', to: '/contact' } },
]

export function ChatAgent() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([greeting])
  const [typing, setTyping] = useState(false)
  const panelRef = useRef(null)
  const transcriptRef = useRef(null)
  const responseTimer = useRef(null)
  const reduced = useReducedMotion()
  const close = useCallback(() => setOpen(false), [])
  useFocusTrap(panelRef, open, close)

  useEffect(() => () => window.clearTimeout(responseTimer.current), [])
  useEffect(() => { if (open) transcriptRef.current?.scrollTo({ top: transcriptRef.current.scrollHeight, behavior: reduced ? 'auto' : 'smooth' }) }, [messages, open, reduced, typing])

  const ask = (item) => {
    if (typing) return
    setMessages((current) => [...current, { role: 'user', text: item.question }])
    setTyping(true)
    responseTimer.current = window.setTimeout(() => {
      setMessages((current) => [...current, { role: 'agent', text: item.answer, action: item.action }])
      setTyping(false)
    }, reduced ? 0 : 420)
  }

  const reset = () => {
    window.clearTimeout(responseTimer.current)
    setTyping(false)
    setMessages([greeting])
  }

  return <>
    <motion.button className={`chat-launcher ${open ? 'is-open' : ''}`} type="button" onClick={() => setOpen((value) => !value)} aria-label={open ? 'Close Vergeform chat' : 'Open Vergeform chat'} aria-expanded={open} aria-controls="vergeform-chat" whileTap={reduced ? undefined : { scale: .94 }}>
      <span className="chat-launcher__pulse" aria-hidden="true" />
      {open ? <X aria-hidden="true" /> : <MessageCircle aria-hidden="true" />}
      <span>{open ? 'Close' : 'Ask Vergeform'}</span>
    </motion.button>

    <AnimatePresence>
      {open && <motion.aside id="vergeform-chat" className="chat-agent" ref={panelRef} role="dialog" aria-modal="false" aria-labelledby="chat-agent-title" initial={reduced ? false : { opacity: 0, y: 24, scale: .97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={reduced ? undefined : { opacity: 0, y: 18, scale: .98 }} transition={{ duration: .22 }}>
        <header className="chat-agent__header">
          <div className="chat-agent__identity"><span><Bot aria-hidden="true" /></span><div><h2 id="chat-agent-title">Vergeform guide</h2><p><i /> Online · Curated answers</p></div></div>
          <button type="button" onClick={close} aria-label="Close chat"><X aria-hidden="true" /></button>
        </header>

        <div className="chat-agent__transcript" ref={transcriptRef} aria-live="polite">
          {messages.map((message, index) => <motion.div className={`chat-message chat-message--${message.role}`} initial={reduced ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} key={`${message.role}-${index}`}>
            {message.role === 'agent' && <span className="chat-message__mark"><Sparkles aria-hidden="true" /></span>}
            <div><p>{message.text}</p>{message.action && <Link to={message.action.to} onClick={close}>{message.action.label}<ArrowUpRight aria-hidden="true" /></Link>}</div>
          </motion.div>)}
          {typing && <div className="chat-message chat-message--agent"><span className="chat-message__mark"><Sparkles aria-hidden="true" /></span><div className="chat-typing" aria-label="Vergeform guide is responding"><i /><i /><i /></div></div>}
        </div>

        <div className="chat-agent__questions">
          <div><p>Choose a question</p><button type="button" onClick={reset} aria-label="Restart conversation"><RotateCcw aria-hidden="true" /> Restart</button></div>
          <div className="chat-agent__choices">{questions.map((item) => <button type="button" disabled={typing} onClick={() => ask(item)} key={item.id}>{item.question}<span>↗</span></button>)}</div>
        </div>
        <footer>Fixed answers · No personal data collected</footer>
      </motion.aside>}
    </AnimatePresence>
  </>
}
