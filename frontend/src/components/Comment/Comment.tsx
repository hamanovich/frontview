import React, { FC } from 'react';
import MarkdownRenderer from 'react-markdown-renderer';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';

import Media from 'react-bootstrap/Media';
import Badge from 'react-bootstrap/Badge';

import Loader from '../../utils/Loader';

import { MediaImage, QuestionLink } from './style';
import { CommentProps } from './models';

const Comment: FC<CommentProps> = ({ comment, match }) => (
  <Media>
    <MediaImage
      src={comment.author.gravatar}
      alt={comment.author.username}
      rounded
    />
    <Media.Body>
      {match && (
        <QuestionLink to={`/questions/${comment.question.slug}/one`}>
          {comment.question.question}
        </QuestionLink>
      )}
      <h5>{comment.topic}</h5>
      <MarkdownRenderer markdown={comment.text} className="mb-2" />
      <Badge variant="info">{comment.author.username}</Badge>
      <Badge className="pull-right">
        {distanceInWordsToNow(comment.created, { addSuffix: true })}
      </Badge>
    </Media.Body>
  </Media>
);

Comment.defaultProps = {
  match: null,
};

export default Loader('comment')(Comment);
