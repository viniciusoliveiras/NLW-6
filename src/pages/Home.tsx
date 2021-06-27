import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import toast from 'react-hot-toast';

import illustrationImg from '../assets/images/illustration.svg';
import logoLightImg from '../assets/images/logo.svg';
import logoDarkImg from '../assets/images/logo-dark.svg';
import googleIconImg from '../assets/images/google-icon.svg';
import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/Button';
import '../styles/auth.scss';
import { FormEvent } from 'react';
import { database } from '../services/firebase';
import { useTheme } from '../hooks/useTheme';

export function Home() {
  const history = useHistory();
  const { user, signInWithGoogle } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [roomCode, setRoomCode] = useState('');

  useEffect(() => {
    toast('Clique na logo caso queria alterar o tema', {
      duration: 3000,
    });
  }, []);

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
    <div id='page-auth' className={theme}>
      <aside>
        <img
          src={illustrationImg}
          alt='Ilustração simbolizando perguntas e respostas'
        />

        <strong>Toda pergunta tem uma resposta.</strong>

        <p>Aprenda e compartilhe conhecimento com outras pessoas</p>
      </aside>

      <main>
        <div className='main-content'>
          <img
            src={theme === 'light' ? logoLightImg : logoDarkImg}
            alt='Letmeask'
            onClick={toggleTheme}
          />

          <button className='create-room' onClick={handleCreateRoom}>
            <img src={googleIconImg} alt='Google Logo' />
            Crie sua sala com o Google
          </button>

          <div className='separator'>ou entre em uma sala</div>

          <form onSubmit={joinRoom}>
            <input
              type='text'
              placeholder='Digite o código da sala'
              onChange={(event) => setRoomCode(event.target.value)}
            />

            <Button type='submit'>Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  );
}
