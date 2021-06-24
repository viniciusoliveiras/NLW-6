import { useParams } from 'react-router-dom';

import { useRoom } from '../hooks/useRoom';
import { Question } from '../components/Question';
import { RoomHeader } from '../components/RoomHeader';
import deleteImg from '../assets/images/delete.svg';
import '../styles/room.scss';
import { database } from '../services/firebase';

type RoomParams = {
  id: string;
};

export function AdminRoom() {
  const params = useParams<RoomParams>();
  const roomID = params.id;

  const { questions, title } = useRoom(roomID);

  async function handleDeleteQuestion(questionID: string) {
    if (window.confirm('Tem certeza que você deseja excluir esta pergunta?')) {
      await database.ref(`rooms/${roomID}/questions/${questionID}`).remove();
    }
  }

  return (
    <div id='page-room'>
      <RoomHeader id={roomID} adminRoom />

      <main>
        <div className='room-title'>
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>

        <div className='question-list'>
          {questions.map((question) => (
            <Question
              key={question.id}
              content={question.content}
              author={question.author}
            >
              <button
                type='button'
                onClick={() => handleDeleteQuestion(question.id)}
              >
                <img src={deleteImg} alt='Remover pergunta' />
              </button>
            </Question>
          ))}
        </div>
      </main>
    </div>
  );
}
