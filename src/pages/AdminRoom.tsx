import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import cx from 'classnames';

import { database } from '../services/firebase';
import { useRoom } from '../hooks/useRoom';
import { Question } from '../components/Question';
import { RoomHeader } from '../components/RoomHeader';
import emptyQuestionsImg from '../assets/images/empty-questions.svg';
import '../styles/room.scss';
import { useTheme } from '../hooks/useTheme';

type RoomParams = {
  id: string;
};

export function AdminRoom() {
  const params = useParams<RoomParams>();
  const { theme } = useTheme();
  const roomID = params.id;

  const { questions, title } = useRoom(roomID);

  async function handleCheckQuestionAsAnswered(questionID: string) {
    try {
      await database.ref(`rooms/${roomID}/questions/${questionID}`).update({
        isAnswered: true,
      });
    } catch {
      toast.error('Erro ao realizar essa ação. Tente mais tarde');
    }
  }

  async function handleHighlightQuestion(questionID: string) {
    try {
      await database.ref(`rooms/${roomID}/questions/${questionID}`).update({
        isHighlighted: true,
      });
    } catch {
      toast.error('Erro ao realizar essa ação. Tente mais tarde');
    }
  }

  async function handleDeleteQuestion(questionID: string) {
    try {
      if (
        window.confirm('Tem certeza que você deseja excluir esta pergunta?')
      ) {
        await database.ref(`rooms/${roomID}/questions/${questionID}`).remove();
      }
    } catch {
      toast.error('Erro ao realizar essa ação. Tente mais tarde');
    }
  }

  return (
    <div id='page-room'>
      <RoomHeader id={roomID} adminRoom />

      <main className={theme}>
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
              likeCount={question.likeCount}
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
                className={cx('delete-button')}
                aria-label='Remover pergunta'
                onClick={() => handleDeleteQuestion(question.id)}
              >
                <svg
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M3 5.99988H5H21'
                    stroke='#737380'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                  <path
                    d='M8 5.99988V3.99988C8 3.46944 8.21071 2.96074 8.58579 2.58566C8.96086 2.21059 9.46957 1.99988 10 1.99988H14C14.5304 1.99988 15.0391 2.21059 15.4142 2.58566C15.7893 2.96074 16 3.46944 16 3.99988V5.99988M19 5.99988V19.9999C19 20.5303 18.7893 21.039 18.4142 21.4141C18.0391 21.7892 17.5304 21.9999 17 21.9999H7C6.46957 21.9999 5.96086 21.7892 5.58579 21.4141C5.21071 21.039 5 20.5303 5 19.9999V5.99988H19Z'
                    stroke='#737380'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
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
