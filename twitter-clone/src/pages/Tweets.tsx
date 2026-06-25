import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { fetchTweets, createTweet } from '../api/api';
import { Tweet } from '../types';
import TweetCard from '../components/TweetCard';
import TweetForm from '../components/TweetForm';

export default function Tweets() {
  const { user, logout } = useAuth();
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadTweets = useCallback(async () => {
    try {
      setError('');
      const data = await fetchTweets();
      setTweets(data.reverse());
    } catch {
      setError('Failed to load tweets');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTweets();
  }, [loadTweets]);

  const handleCreateTweet = async (text: string) => {
    if (!user) return;
    await createTweet(user.id, text);
    await loadTweets();
  };

  return (
    <div className="tweets-page">
      <header className="app-header">
        <div className="header-content">
          <div className="header-left">
            <svg className="header-logo" viewBox="0 0 24 24" width="28" height="28">
              <path
                fill="currentColor"
                d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"
              />
            </svg>
            <h1>Home</h1>
          </div>
          <div className="header-right">
            <span className="user-name">{user?.name}</span>
            <button className="btn btn-outline btn-sm" onClick={logout}>
              Log out
            </button>
          </div>
        </div>
      </header>

      <main className="tweets-main">
        <TweetForm onSubmit={handleCreateTweet} />

        {error && <div className="alert alert-error">{error}</div>}

        {loading ? (
          <div className="loading">Loading tweets...</div>
        ) : tweets.length === 0 ? (
          <div className="empty-state">No tweets yet. Be the first to tweet!</div>
        ) : (
          <div className="tweets-list">
            {tweets.map((tweet) => (
              <TweetCard key={tweet.id} tweet={tweet} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
