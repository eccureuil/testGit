// AuthApp.jsx
import React, { useState } from 'react';
import './login.css';

const AuthApp = () => {
  const [currentView, setCurrentView] = useState('login'); // login, register, forgot
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  });
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulation d'authentification
    if (formData.email && formData.password) {
      setMessage({ type: 'success', text: 'Connexion réussie ! Redirection...' });
      setTimeout(() => {
        alert('Connecté avec succès!');
      }, 1000);
    } else {
      setMessage({ type: 'error', text: 'Veuillez remplir tous les champs' });
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.password && formData.confirmPassword) {
      if (formData.password === formData.confirmPassword) {
        setMessage({ type: 'success', text: 'Inscription réussie ! Vous pouvez maintenant vous connecter.' });
        setTimeout(() => {
          setCurrentView('login');
          setFormData({ ...formData, password: '', confirmPassword: '' });
          setMessage({ type: '', text: '' });
        }, 2000);
      } else {
        setMessage({ type: 'error', text: 'Les mots de passe ne correspondent pas' });
      }
    } else {
      setMessage({ type: 'error', text: 'Veuillez remplir tous les champs' });
    }
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    if (formData.email) {
      setMessage({ type: 'success', text: 'Un email de réinitialisation a été envoyé !' });
      setTimeout(() => {
        setCurrentView('login');
        setFormData({ ...formData, email: '' });
        setMessage({ type: '', text: '' });
      }, 2000);
    } else {
      setMessage({ type: 'error', text: 'Veuillez entrer votre email' });
    }
  };

  return (
    <div className="auth-app">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h1>
              {currentView === 'login' && '🔐 Connexion'}
              {currentView === 'register' && '📝 Inscription'}
              {currentView === 'forgot' && '❓ Mot de passe oublié'}
            </h1>
            <p className="auth-subtitle">
              {currentView === 'login' && 'Connectez-vous à votre compte'}
              {currentView === 'register' && 'Créez votre compte gratuitement'}
              {currentView === 'forgot' && 'Entrez votre email pour réinitialiser'}
            </p>
          </div>

          {message.text && (
            <div className={`message ${message.type}`}>
              {message.type === 'success' ? '✅ ' : '⚠️ '}
              {message.text}
            </div>
          )}

          {currentView === 'login' && (
            <form onSubmit={handleLogin} className="auth-form">
              <div className="form-group">
                <label htmlFor="email">📧 Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="exemple@email.com"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">🔒 Mot de passe</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                />
              </div>

              <button type="submit" className="btn-primary">
                Se connecter
              </button>

              <div className="auth-links">
                <button
                  type="button"
                  onClick={() => setCurrentView('register')}
                  className="link-btn"
                >
                  🆕 Créer un compte
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentView('forgot')}
                  className="link-btn"
                >
                  🔑 Mot de passe oublié ?
                </button>
              </div>
            </form>
          )}

          {currentView === 'register' && (
            <form onSubmit={handleRegister} className="auth-form">
              <div className="form-group">
                <label htmlFor="name">👤 Nom complet</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Jean Dupont"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">📧 Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="exemple@email.com"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">🔒 Mot de passe</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                />
                <small className="input-hint">Minimum 8 caractères</small>
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">✓ Confirmer le mot de passe</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                />
              </div>

              <button type="submit" className="btn-primary">
                S'inscrire
              </button>

              <div className="auth-links">
                <button
                  type="button"
                  onClick={() => setCurrentView('login')}
                  className="link-btn"
                >
                  🔄 Déjà un compte ? Se connecter
                </button>
              </div>
            </form>
          )}

          {currentView === 'forgot' && (
            <form onSubmit={handleForgotPassword} className="auth-form">
              <div className="form-group">
                <label htmlFor="email">📧 Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="exemple@email.com"
                  required
                />
              </div>

              <button type="submit" className="btn-primary">
                📨 Envoyer l'email de réinitialisation
              </button>

              <div className="auth-links">
                <button
                  type="button"
                  onClick={() => setCurrentView('login')}
                  className="link-btn"
                >
                  ⬅️ Retour à la connexion
                </button>
              </div>
            </form>
          )}

          <div className="auth-footer">
            <p>
              {currentView === 'login' && 'Version de démonstration - Interface d\'authentification'}
              {currentView === 'register' && 'En créant un compte, vous acceptez nos conditions'}
              {currentView === 'forgot' && 'Vous recevrez un lien pour réinitialiser votre mot de passe'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthApp;