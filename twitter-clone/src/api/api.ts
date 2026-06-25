import { User, Tweet } from '../types';

const API_BASE = 'http://localhost:3001';

export async function loginUser(email: string, password: string): Promise<User> {
  const response = await fetch(`${API_BASE}/users?email=${encodeURIComponent(email)}`);

  if (!response.ok) {
    throw new Error('Something went wrong');
  }

  const users: User[] = await response.json();

  if (users.length === 0 || users[0].password !== password) {
    const error = new Error('Invalid email or password');
    (error as any).status = 404;
    throw error;
  }

  return users[0];
}

export async function signupUser(
  email: string,
  password: string,
  name: string
): Promise<User> {
  const id = name.toLowerCase().replace(/\s+/g, '');

  const response = await fetch(`${API_BASE}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, name, email, password }),
  });

  if (!response.ok) {
    throw new Error('Something went wrong');
  }

  return response.json();
}

export async function fetchTweets(): Promise<Tweet[]> {
  const response = await fetch(`${API_BASE}/tweets`);

  if (!response.ok) {
    throw new Error('Failed to fetch tweets');
  }

  return response.json();
}

export async function createTweet(authorId: string, text: string): Promise<Tweet> {
  const response = await fetch(`${API_BASE}/tweets`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ author_id: authorId, text }),
  });

  if (!response.ok) {
    throw new Error('Failed to create tweet');
  }

  return response.json();
}
