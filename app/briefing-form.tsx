'use client';

import { useEffect, useRef, useState, type SyntheticEvent } from 'react';
import { ArrowUpRight, Check } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

export function BriefingIntro() {
  return (
    <div className="briefing-intro">
      <p className="eyebrow">Start a conversation</p>
      <h2>
        Bring your next
        <br />
        <em>lunar decision.</em>
      </h2>
      <p>
        Tell us what you’re working on. A Potomac briefing explores the data,
        platform tools, and intelligence relevant to your priorities.
      </p>
      <ul>
        <li>Your site, market, or investment questions</li>
        <li>The platforms and data relevant to your work</li>
        <li>Opportunities to work with Potomac</li>
      </ul>
      <a className="email-alternative" href="mailto:info@potomacdb.com">
        Prefer email? info@potomacdb.com{' '}
        <ArrowUpRight size={17} aria-hidden="true" />
      </a>
    </div>
  );
}

export function BriefingForm() {
  const [interest, setInterest] = useState('Lunar intelligence briefing');
  const [pending, setPending] = useState(false);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState('');
  const [receipt, setReceipt] = useState('');
  const requestId = useRef('');
  const statusRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLOutputElement>(null);

  useEffect(() => {
    requestId.current = crypto.randomUUID();
    // oxlint-disable-next-line react/react-compiler -- SSR must stay disabled until the client initializes its inquiry ID.
    setReady(true);
    const chooseInterest = (event: Event) => {
      const value = (event as CustomEvent<string>).detail;
      if (value === 'Cabeus Terminal early access') setInterest(value);
    };
    window.addEventListener('potomac:inquiry', chooseInterest);
    return () => window.removeEventListener('potomac:inquiry', chooseInterest);
  }, []);

  useEffect(() => {
    if (receipt) successRef.current?.focus();
    else if (error) statusRef.current?.focus();
  }, [receipt, error]);

  async function submit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!ready || pending || !requestId.current) return;
    const data = new FormData(event.currentTarget);
    setPending(true);
    setError('');
    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...Object.fromEntries(data),
          requestId: requestId.current,
        }),
        signal: AbortSignal.timeout(15000),
      });
      const result = (await response.json()) as {
        error?: string;
        reference?: string;
      };
      if (!response.ok || !result.reference)
        throw new Error(
          result.error || 'Your request could not be saved. Please try again.',
        );
      setReceipt(result.reference);
    } catch (failure) {
      setError(
        failure instanceof Error && failure.name !== 'TimeoutError'
          ? failure.message
          : 'The connection timed out. Please retry, or email info@potomacdb.com.',
      );
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="briefing-form-panel">
      {receipt ? (
        <output className="inquiry-success" ref={successRef} tabIndex={-1}>
          <Check size={30} aria-hidden="true" />
          <h3>Request received.</h3>
          <p>
            Your inquiry has been securely saved. For time-sensitive requests,
            please email info@potomacdb.com and include your reference below.
          </p>
          <small>Reference: {receipt}</small>
          <button
            type="button"
            className="text-link"
            onClick={() => {
              setReceipt('');
              requestId.current = crypto.randomUUID();
            }}
          >
            Send another inquiry <ArrowUpRight size={17} aria-hidden="true" />
          </button>
        </output>
      ) : (
        <form
          className="briefing-form"
          method="post"
          action="/api/inquiries"
          onSubmit={submit}
          aria-label="Request a Potomac briefing"
          aria-busy={pending}
        >
          {/* Native POST is a privacy backstop; this JSON form unlocks only after hydration. */}
          <fieldset
            className="briefing-form-fields"
            disabled={!ready || pending}
          >
            <legend className="sr-only">Briefing details</legend>
            <div className="form-pair">
              <div>
                <Label htmlFor="inquiry-name">Name</Label>
                <Input
                  id="inquiry-name"
                  name="name"
                  autoComplete="name"
                  required
                  maxLength={100}
                />
              </div>
              <div>
                <Label htmlFor="inquiry-email">Email</Label>
                <Input
                  id="inquiry-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  maxLength={254}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="inquiry-organization">
                Organization <span>(optional)</span>
              </Label>
              <Input
                id="inquiry-organization"
                name="organization"
                autoComplete="organization"
                maxLength={160}
              />
            </div>
            <div>
              <Label htmlFor="inquiry-interest">I’m interested in</Label>
              <Input
                id="inquiry-interest"
                name="interest"
                value={interest}
                onChange={(event) => setInterest(event.target.value)}
                required
                maxLength={160}
              />
            </div>
            <div>
              <Label htmlFor="inquiry-message">
                What would you like to explore?
              </Label>
              <Textarea
                id="inquiry-message"
                name="message"
                required
                maxLength={2000}
                rows={4}
                placeholder="Tell us about your priorities or the decision you’re working toward."
              />
            </div>
            <div className="form-honeypot" aria-hidden="true">
              <label htmlFor="inquiry-website">Leave this field empty</label>
              <input
                id="inquiry-website"
                name="website"
                tabIndex={-1}
                autoComplete="off"
              />
            </div>
            <p className="form-privacy">
              Your details are stored privately and used to respond to this
              inquiry. Please don’t include confidential or sensitive mission
              information.
            </p>
            {error && (
              <div
                className="form-error"
                role="alert"
                ref={statusRef}
                tabIndex={-1}
              >
                {error}
              </div>
            )}
            <button
              type="submit"
              className="button-primary"
              disabled={!ready || pending}
            >
              {pending ? 'Submitting…' : 'Send inquiry'}{' '}
              <ArrowUpRight size={18} aria-hidden="true" />
            </button>
          </fieldset>
          {!ready && (
            <output className="form-privacy">
              If this form stays unavailable, email{' '}
              <a href="mailto:info@potomacdb.com">info@potomacdb.com</a>.
            </output>
          )}
        </form>
      )}
    </div>
  );
}
