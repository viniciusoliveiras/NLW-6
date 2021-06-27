import { FormEvent, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import toast from 'react-hot-toast';

import illustrationImg from '../assets/images/illustration.svg';
import logoLightImg from '../assets/images/logo.svg';
import logoDarkImg from '../assets/images/logo-dark.svg';
import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/Button';
import { database } from '../services/firebase';
import '../styles/auth.scss';
import { useTheme } from '../hooks/useTheme';
import { ThemeSwitch } from '../components/ThemeSwitch';

export function NewRoom() {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [newRoom, setNewRoom] = useState('');
  const history = useHistory();

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();

    if (newRoom.trim() === '') {
      return;
    }

    const roomRef = database.ref('rooms');

    try {
      const { key } = await roomRef.push({
        title: newRoom,
        authorId: user?.id,
      });
      history.push(`/admin/rooms/${key}`);
    } catch {
      toast.error('Tivemos um problema ao criar a sala. Tente mais tarde');
    }
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
          <h2>Crie uma nova sala</h2>

          <form onSubmit={handleCreateRoom}>
            <input
              type='text'
              placeholder='Nome da sala'
              onChange={(event) => setNewRoom(event.target.value)}
            />

            <Button type='submit'>Criar sala</Button>
          </form>

          <p>
            Quer entrar em uma sala já existente?{' '}
            <Link to='/'>Clique aqui</Link>
          </p>

          <div className='switcher'>
            <ThemeSwitch />
          </div>
        </div>
      </main>
    </div>
  );
}
