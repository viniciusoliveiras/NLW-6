import { useHistory } from 'react-router-dom';
import logoImg from '../../assets/images/logo.svg';
import { database } from '../../services/firebase';
import { Button } from '../Button';

import { RoomCode } from '../RoomCode';
import './styles.scss';

type RoomHeaderProps = {
  id: string;
  adminRoom?: boolean;
};

export function RoomHeader({ id, adminRoom = false }: RoomHeaderProps) {
  const history = useHistory();

  async function handleEndRoom() {
    await database.ref(`rooms/${id}`).update({
      endedAt: new Date(),
    });

    history.push('/');
  }

  return (
    <header>
      <div className='content'>
        <img src={logoImg} alt='letmeask' onClick={() => history.push('/')} />
        <div>
          <RoomCode code={id} />
          {adminRoom && (
            <Button isOutlined onClick={handleEndRoom}>
              Encerrar sala
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
