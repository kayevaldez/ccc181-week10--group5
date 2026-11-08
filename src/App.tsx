// MEMBER 3 (Part 2): decides between the login form and the Welcome screen.
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import BrandPanel from './components/BrandPanel';
import LoginForm from './components/LoginForm';
import Welcome from './components/Welcome';
import Footer from './components/Footer';
import { ApiError, clearToken, getMe, getToken } from './api/auth';
import type { AuthUser } from './api/auth';

export default function App() {
  const [user, setUser] = useState<AuthUser | null>(null);
  // If a token is saved, we must ask the API before showing anything.
  const [checking, setChecking] = useState<boolean>(() => getToken() !== null);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      return;
    }
    let active = true;
    getMe(token)
      .then((me) => {
        if (active) setUser(me); // 200: show the Welcome screen
      })
      .catch((error: unknown) => {
        // 401: the token is wrong or expired, so delete it.
        if (error instanceof ApiError && error.status === 401) {
          clearToken();
        }
      })
      .finally(() => {
        if (active) setChecking(false);
      });
    return () => {
      active = false;
    };
  }, []);

  function handleLogout() {
    clearToken();
    setUser(null);
  }

  let panel;
  if (checking) {
    panel = (
      <section className="login-card">
        <p role="status">Checking your session...</p>
      </section>
    );
  } else if (user) {
    panel = <Welcome user={user} onLogout={handleLogout} />;
  } else {
    panel = <LoginForm onLoggedIn={setUser} />;
  }

  return (
    <div className="page">
      <Navbar />
      <main className="container">
        <div className="login-layout">
          <BrandPanel />
          {panel}
        </div>
      </main>
      <Footer />
    </div>
  );
}