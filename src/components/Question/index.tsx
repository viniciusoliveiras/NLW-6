import { ReactNode } from 'react';

import cx from 'classnames';

import './styles.scss';
import { useTheme } from '../../hooks/useTheme';

type QuestionProps = {
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  isAnswered?: boolean;
  isHighlighted?: boolean;
  likeCount?: number;
  children?: ReactNode;
};

export function Question({
  content,
  author,
  isAnswered = false,
  isHighlighted = false,
  likeCount = 0,
  children,
}: QuestionProps) {
  const { theme } = useTheme();

  return (
    <div
      className={cx(
        'question',
        theme,
        { answered: isAnswered },
        { highlighted: isHighlighted && !isAnswered }
      )}
    >
      <p>{content}</p>
      <footer>
        <div className="user-info">
          <img src={author.avatar} alt="Foto do autor" />
          <span>{author.name}</span>
        </div>
        {likeCount > 0 && <span>{likeCount} like(s)</span>}
        <div>{children}</div>
      </footer>
    </div>
  );
}
