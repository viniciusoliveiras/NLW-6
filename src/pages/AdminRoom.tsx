import { useParams } from 'react-router-dom';
import cx from 'classnames';

import { database } from '../services/firebase';
import { useRoom } from '../hooks/useRoom';
import { Question } from '../components/Question';
import { RoomHeader } from '../components/RoomHeader';
import deleteImg from '../assets/images/delete.svg';
import emptyQuestionsImg from '../assets/images/empty-questions.svg';
import '../styles/room.scss';

type RoomParams = {
  id: string;
};

export function AdminRoom() {
  const params = useParams<RoomParams>();
  const roomID = params.id;

  const { questions, title } = useRoom(roomID);

  async function handleCheckQuestionAsAnswered(questionID: string) {
    await database.ref(`rooms/${roomID}/questions/${questionID}`).update({
      isAnswered: true,
    });
  }

  async function handleHighlightQuestion(questionID: string) {
    await database.ref(`rooms/${roomID}/questions/${questionID}`).update({
      isHighlighted: true,
    });
  }

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
              isAnswered={question.isAnswered}
              isHighlighted={question.isHighlighted}
            >
              <button
                type='button'
                className={cx('answered-button', {
                  answered: question.isAnswered,
                })}
                aria-label='Marcar pergunta como respondida'
                onClick={() => handleCheckQuestionAsAnswered(question.id)}
                disabled={question.isAnswered}
              >
                <svg
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <circle
                    cx='12.0003'
                    cy='11.9998'
                    r='9.00375'
                    stroke='#737380'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                  <path
                    d='M8.44287 12.3391L10.6108 14.507L10.5968 14.493L15.4878 9.60193'
                    stroke='#737380'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              </button>

              <button
                type='button'
                className={cx('highlighted-button', {
                  highlighted: question.isHighlighted && !question.isAnswered,
                })}
                aria-label='Dar destaque a pergunta'
                onClick={() => handleHighlightQuestion(question.id)}
                disabled={question.isAnswered}
              >
                <svg
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fill-rule='evenodd'
                    clip-rule='evenodd'
                    d='M12 17.9999H18C19.657 17.9999 21 16.6569 21 14.9999V6.99988C21 5.34288 19.657 3.99988 18 3.99988H6C4.343 3.99988 3 5.34288 3 6.99988V14.9999C3 16.6569 4.343 17.9999 6 17.9999H7.5V20.9999L12 17.9999Z'
                    stroke='#737380'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              </button>

              <button
                type='button'
                onClick={() => handleDeleteQuestion(question.id)}
              >
                <img src={deleteImg} alt='Remover pergunta' />
              </button>
            </Question>
          ))}
        </div>

        {questions.length <= 0 && (
          <div className='empty-questions admin'>
            <img src={emptyQuestionsImg} />
            <h2>Nenhuma pergunta por aqui...</h2>
            <p>
              Envie o código desta sala para seus amigos e comece a responder
              perguntas!
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
