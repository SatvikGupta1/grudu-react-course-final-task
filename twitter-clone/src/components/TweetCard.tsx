import React from 'react';
import DOMPurify from 'dompurify';
import { Tweet } from '../types';

interface TweetCardProps {
  tweet: Tweet;
}

const ALLOWED_TAGS = ['strong', 'em', 'b', 'i', 'u', 'code', 'br', 'a'];
const ALLOWED_ATTR = ['href', 'target', 'rel'];

export default function TweetCard({ tweet }: TweetCardProps) {
  const sanitizedText = DOMPurify.sanitize(tweet.text, {
    ALLOWED_TAGS,
    ALLOWED_ATTR,
  });

  return (
    <div className="tweet-card">
      <div className="tweet-avatar">
        {tweet.author_id.charAt(0).toUpperCase()}
      </div>
      <div className="tweet-content">
        <span className="tweet-author">@{tweet.author_id}</span>
        <p
          className="tweet-text"
          dangerouslySetInnerHTML={{ __html: sanitizedText }}
        />
      </div>
    </div>
  );
}
