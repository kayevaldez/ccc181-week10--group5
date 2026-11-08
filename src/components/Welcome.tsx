// MEMBER 3 (Part 2): shown only after the API answers 200.
import type { AuthUser } from '../api/auth';

interface WelcomeProps {
  user: AuthUser;
  onLogout: () => void;
}

export default function Welcome({ user, onLogout }: WelcomeProps) {
  return (
    <section className="welcome-card" aria-labelledby="welcome-title-user">
      <h2 id="welcome-title-user" className="welcome-card__title">
        Welcome, {user.name}
      </h2>
      <p className="welcome-card__email">{user.email}</p>
      <button
        type="button"
        className="btn btn--primary welcome-card__logout"
        onClick={onLogout}
      >
        Log out
      </button>
    </section>
  );
}