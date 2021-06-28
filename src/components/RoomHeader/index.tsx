/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import toast from 'react-hot-toast';
import { useHistory } from 'react-router-dom';

import logoDarkImg from '../../assets/images/logo-dark.svg';
import logoLightImg from '../../assets/images/logo.svg';
import { useTheme } from '../../hooks/useTheme';
import { database } from '../../services/firebase';
import { Button } from '../Button';
import { RoomCode } from '../RoomCode';
import './styles.scss';
import { ThemeSwitch } from '../ThemeSwitch';

type RoomHeaderProps = {
  id: string;
  adminRoom?: boolean;
};

export function RoomHeader({ id, adminRoom = false }: RoomHeaderProps) {
  const history = useHistory();
  const { theme } = useTheme();

  async function handleEndRoom() {
    try {
      if (window.confirm('Tem certeza que você deseja encerrar esta sala?')) {
        await database.ref(`rooms/${id}`).update({
          endedAt: new Date(),
        });
        history.push('/');
      }
    } catch {
      toast.error('Erro ao encerrar a sala. Tente mais tarde');
    }
  }

  return (
    <header className={theme}>
      <div className="content">
        <img
          src={theme === 'light' ? logoLightImg : logoDarkImg}
          alt="letmeask"
          onClick={() => history.push('/')}
        />
        <div>
          <RoomCode code={id} />
          {adminRoom && (
            <Button isOutlined onClick={handleEndRoom}>
              Encerrar sala
            </Button>
          )}
          <ThemeSwitch />
        </div>
      </div>
    </header>
  );
}
