import { useState } from 'react';
import type { FormEvent } from 'react';
import { siteApi } from '../api/siteApi';
// BACKEND DISABLED
// import { contactApi } from '../api/contactApi';
// import { ApiError } from '../api/httpClient';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';

type SubmissionStatus = 'idle' | 'submitting' | 'success' | 'error';

export function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<SubmissionStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('submitting');
    setErrorMessage(null);

    try {
      // await contactApi.send({ name, email, message });

      // No backend: open the visitor's mail client with the message pre-filled.
      const { contactEmail } = await siteApi.getInfo();
      const subject = encodeURIComponent(`Message de ${name}`);
      const body = encodeURIComponent(`${message}\n\n${name} (${email})`);
      window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
      setStatus('success');
      setName('');
      setEmail('');
      setMessage('');
    } catch (error) {
      setStatus('error');
      // setErrorMessage(error instanceof ApiError ? error.message : 'Une erreur est survenue.');
      setErrorMessage(error instanceof Error ? error.message : 'Une erreur est survenue.');
    }
  };

  return (
    <form className="flex w-full max-w-md flex-col gap-2" onSubmit={handleSubmit}>
      <Label htmlFor="name" className="mt-2">
        Nom
      </Label>
      <Input
        id="name"
        value={name}
        onChange={(event) => setName(event.target.value)}
        required
        disabled={status === 'submitting'}
      />

      <Label htmlFor="email" className="mt-2">
        Email
      </Label>
      <Input
        id="email"
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        required
        disabled={status === 'submitting'}
      />

      <Label htmlFor="message" className="mt-2">
        Message
      </Label>
      <Textarea
        id="message"
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        required
        minLength={10}
        disabled={status === 'submitting'}
      />

      <Button type="submit" disabled={status === 'submitting'} className="mt-3 h-10 self-start px-6 text-base">
        {status === 'submitting' ? 'Envoi...' : 'Envoyer'}
      </Button>

      {status === 'success' && (
        <p role="status" className="text-green-700 dark:text-green-400">
          Votre application mail s'ouvre, il ne reste qu'à envoyer. Merci !
        </p>
      )}
      {status === 'error' && (
        <p role="alert" className="text-red-600 dark:text-red-400">
          {errorMessage}
        </p>
      )}
    </form>
  );
}
