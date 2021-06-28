import toast from 'react-hot-toast';

import copyImg from '../assets/images/copy.svg';
import { useTheme } from '../hooks/useTheme';
import '../styles/room-code.scss';

type RoomCodeProps = {
  code: string;
};

export function RoomCode({ code }: RoomCodeProps) {
  const { theme } = useTheme();

  function copyRoomCodeToClipboard() {
    navigator.clipboard.writeText(code);
    toast.success('Código da sala copiado');
  }

  return (
    <button
      type="button"
      className={`room-code ${theme}`}
      onClick={copyRoomCodeToClipboard}
    >
      <div>
        <img src={copyImg} alt="Copy room code" />
      </div>
      <span>Sala #{code}</span>
    </button>
  );
}
