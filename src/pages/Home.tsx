/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from 'react';
import { FormEvent } from 'react';
import toast from 'react-hot-toast';
import { useHistory } from 'react-router-dom';

import googleIconImg from '../assets/images/google-icon.svg';
import illustrationImg from '../assets/images/illustration.svg';
import logoDarkImg from '../assets/images/logo-dark.svg';
import logoLightImg from '../assets/images/logo.svg';
import { Button } from '../components/Button';
import { ThemeSwitch } from '../components/ThemeSwitch';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../hooks/useTheme';
import { database } from '../services/firebase';

import '../styles/auth.scss';

export function Home() {
  const history = useHistory();
  const { user, signInWithGoogle } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [roomCode, setRoomCode] = useState('');

  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle();
    }

    history.push('/rooms/new');
  }

  async function joinRoom(event: FormEvent) {
    event.preventDefault();

    if (roomCode.trim() === '') {
      return;
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    if (!roomRef.exists()) {
      toast.error('Esta sala não existe');
      return;
    }

    if (roomRef.val().endedAt) {
      toast.error('Esta sala está encerrada');
      return;
    }

    history.push(`/rooms/${roomCode}`);
  }

  return (
    <div id="page-auth" className={theme}>
      <aside>
        <img
          src={illustrationImg}
          alt="Ilustração simbolizando perguntas e respostas"
        />

        <strong>Toda pergunta tem uma resposta.</strong>

        <p>Aprenda e compartilhe conhecimento com outras pessoas</p>
      </aside>

      <main>
        <div className="main-content">
          <img
            src={theme === 'light' ? logoLightImg : logoDarkImg}
            alt="Letmeask"
            onClick={toggleTheme}
          />

          <button
            type="button"
            className="create-room"
            onClick={handleCreateRoom}
          >
            <img src={googleIconImg} alt="Google Logo" />
            Crie sua sala com o Google
          </button>

          <div className="separator">ou entre em uma sala</div>

          <form onSubmit={joinRoom}>
            <input
              type="text"
              placeholder="Código da sala"
              onChange={event => setRoomCode(event.target.value)}
            />

            <Button type="submit">Entrar na sala</Button>
          </form>

          <div className="switcher">
            <ThemeSwitch />
          </div>
        </div>
      </main>
    </div>
  );
}
