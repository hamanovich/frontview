import React from 'react';
import { shape, string } from 'prop-types';
import MarkdownRenderer from 'react-markdown-renderer';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';

import Media from 'react-bootstrap/lib/Media';
import Image from 'react-bootstrap/lib/Image';
import Label from 'react-bootstrap/lib/Label';

import Loader from '../../utils/Loader';

import { CommentType } from '../../propTypes';

const MediaImage = styled(Image)`
  width: 50px;
  height: 50px;
  max-width: 50px;
`;

const Question = styled(Link)`
  display: inline-block;
  margin-bottom: 5px;
  font-size: 24px;
`;

const Comment = ({ comment, match }) => (
  <Media>
    <Media.Left>
      <MediaImage src={comment.author.gravatar} alt={comment.author.username} thumbnail />
    </Media.Left>
    <Media.Body>
      {match && (
        <Question to={`/questions/${comment.question.slug}/one`}>
          {comment.question.question}
        </Question>
      )}
      <Media.Heading>{comment.topic}</Media.Heading>
      <MarkdownRenderer markdown={comment.text} />
      <Label bsStyle="info">{comment.author.username}</Label>
      <Label bsStyle="default" className="pull-right">
        {distanceInWordsToNow(comment.created, { addSuffix: true })}
      </Label>
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
