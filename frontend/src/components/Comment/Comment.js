import React from 'react';
import { shape, string } from 'prop-types';
import MarkdownRenderer from 'react-markdown-renderer';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';

import Media from 'react-bootstrap/Media';
import Image from 'react-bootstrap/Image';
import Badge from 'react-bootstrap/Badge';

import Loader from '../../utils/Loader';

import { CommentType } from '../../propTypes';

const MediaImage = styled(Image)`
  width: 50px;
  height: 50px;
  margin-right: 16px;
`;

const Question = styled(Link)`
  display: inline-block;
  margin-bottom: 5px;
  font-size: 24px;
`;

const Comment = ({ comment, match }) => (
  <Media>
    <MediaImage src={comment.author.gravatar} alt={comment.author.username} rounded />
    <Media.Body>
      {match && (
        <Question to={`/questions/${comment.question.slug}/one`}>
          {comment.question.question}
        </Question>
      )}
      <h5>{comment.topic}</h5>
      <MarkdownRenderer markdown={comment.text} />
      <Badge variant="info">{comment.author.username}</Badge>
      <Badge variant="default" className="pull-right">
        {distanceInWordsToNow(comment.created, { addSuffix: true })}
      </Badge>
    </Media.Body>
  </Media>
);

Comment.propTypes = {
  comment: CommentType.isRequired,
  match: shape({
    params: shape({
      username: string.isRequired,
    }).isRequired,
  }),
};

Comment.defaultProps = {
  match: null,
};

export default Loader('comment')(Comment);
