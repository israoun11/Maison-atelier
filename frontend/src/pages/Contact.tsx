import { useState, type ChangeEvent, type FormEvent } from 'react';
import { errorMessage, submitContact } from '../services/api';
import { usePageTitle } from '../hooks/usePageTitle';
import type { ContactPayload } from '../types';
import Reveal from '../components/Reveal';

type Errors = Partial<Record<keyof ContactPayload, string>>;
const empty: ContactPayload = { name: '', email: '', subject: '', message: '' };

function validate(v: ContactPayload): Errors {
  const e: Errors = {};
  if (v.name.trim().length < 2) e.name = 'Please enter your name (at least 2 characters).';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim())) e.email = 'Please enter a valid email address.';
  if (v.subject.trim().length < 3) e.subject = 'Please enter a subject (at least 3 characters).';
  if (v.message.trim().length < 10) e.message = 'Your message should be at least 10 characters.';
  return e;
}

export default function Contact() {
  usePageTitle('Contact', 'Get in touch with Atelier Maison to discuss your interior architecture or design project.');
  const [values, setValues] = useState<ContactPayload>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [feedback, setFeedback] = useState('');

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues((v) => ({ ...v, [e.target.name]: e.target.value }));
    setErrors((er) => ({ ...er, [e.target.name]: undefined }));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const errs = validate(values);
    setErrors(errs);
    if (Object.keys(errs).length) { setStatus('idle'); setFeedback(''); return; }
    setStatus('sending');
    try {
      const msg = await submitContact({
        name: values.name.trim(), email: values.email.trim(), subject: values.subject.trim(), message: values.message.trim(),
      });
      setValues(empty);
      setStatus('success');
      setFeedback(msg);
    } catch (err) {
      setStatus('error');
      setFeedback(errorMessage(err));
    }
  };

  const field = (name: keyof ContactPayload, label: string, type = 'text', autoComplete?: string) => (
    <div>
      <label htmlFor={name} className="label">{label}</label>
      <input id={name} name={name} type={type} autoComplete={autoComplete} value={values[name]} onChange={onChange} className="field"
        aria-invalid={!!errors[name]} aria-describedby={errors[name] ? `${name}-err` : undefined} required />
      {errors[name] && <p id={`${name}-err`} className="mt-2 text-xs text-red-800">{errors[name]}</p>}
    </div>
  );

  return (
    <div className="container-x pb-24 pt-36 md:pb-32 md:pt-44">
      <div className="grid gap-16 md:grid-cols-12">
        <Reveal className="md:col-span-5">
          <p className="eyebrow">Contact</p>
          <h1 className="mt-4 text-5xl leading-tight md:text-7xl">Let us talk.</h1>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-brown/80">
            Tell us about your space, your timeline and what you imagine. We reply to every enquiry within two working days.
          </p>
          <address className="mt-10 space-y-2 text-sm not-italic text-brown">
            <p>12 Rue des Archives, 75003 Paris</p>
            <p><a href="mailto:hello@ateliermaison.example" className="underline underline-offset-4">hello@ateliermaison.example</a></p>
          </address>
        </Reveal>

        <Reveal className="md:col-span-6 md:col-start-7" delay={120}>
          <form onSubmit={onSubmit} noValidate className="space-y-7" aria-label="Contact form">
            {field('name', 'Name', 'text', 'name')}
            {field('email', 'Email', 'email', 'email')}
            {field('subject', 'Subject')}
            <div>
              <label htmlFor="message" className="label">Message</label>
              <textarea id="message" name="message" rows={6} value={values.message} onChange={onChange} className="field resize-y"
                aria-invalid={!!errors.message} aria-describedby={errors.message ? 'message-err' : undefined} required />
              {errors.message && <p id="message-err" className="mt-2 text-xs text-red-800">{errors.message}</p>}
            </div>
            <button type="submit" className="btn btn-dark" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending…' : 'Send message'}
            </button>
            <div aria-live="polite">
              {status === 'success' && <p role="status" className="border border-taupe bg-sand px-4 py-3 text-sm text-brown">{feedback}</p>}
              {status === 'error' && <p role="alert" className="border border-red-800/40 bg-white px-4 py-3 text-sm text-red-900">{feedback}</p>}
            </div>
          </form>
        </Reveal>
      </div>
    </div>
  );
}
