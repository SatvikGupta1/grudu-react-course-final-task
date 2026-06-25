import React, { useState } from 'react';
import { validateTweetText } from '../utils/validation';

interface TweetFormProps {
  onSubmit: (text: string) => Promise<void>;
}

export default function TweetForm({ onSubmit }: TweetFormProps) {
  const [text, setText] = useState('');
  const [touched, setTouched] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const error = touched ? validateTweetText(text) : null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);

    const validationError = validateTweetText(text);
    if (validationError) return;

    setSubmitting(true);
    try {
      await onSubmit(text);
      setText('');
      setTouched(false);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="tweet-form" onSubmit={handleSubmit}>
      <div className="tweet-form-inner">
        <textarea
          className={`tweet-input ${error ? 'input-error' : ''}`}
          placeholder="What's happening?"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onBlur={() => setTouched(true)}
          maxLength={140}
          rows={3}
        />
        {error && <span className="error-message">{error}</span>}
      </div>
      <div className="tweet-form-footer">
        <span className="char-count">{text.length}/140</span>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={submitting || !!error}
        >
          {submitting ? 'Tweeting...' : 'Tweet'}
        </button>
      </div>
    </form>
  );
}
