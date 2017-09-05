import React from 'react';
import PropTypes from 'prop-types';
import MarkdownRenderer from 'react-markdown-renderer';
import moment from 'moment';
import { Link } from 'react-router-dom';

import Media from 'react-bootstrap/lib/Media';
import Image from 'react-bootstrap/lib/Image';
import Label from 'react-bootstrap/lib/Label';

const Comment = ({ comment, match }) => (
  <Media>
    <Media.Left>
      <Image
        src={comment.author.gravatar}
        alt={comment.author.username}
        style={{ width: 50, height: 50, maxWidth: 50 }}
        thumbnail
      />
    </Media.Left>
    <Media.Body>
      {match && match.params.username &&
        <h3 style={{ marginTop: 0 }}>
          <Link to={`/questions/${comment.question.slug}/one`}>{comment.question.question}</Link>
        </h3>
      }
      <Media.Heading>{comment.topic}</Media.Heading>
      <MarkdownRenderer markdown={comment.text} />
      <Label bsStyle="info">{comment.author.username}</Label>
      <Label bsStyle="default" className="pull-right">{moment(comment.created).fromNow()}</Label>
      <hr />
    </Media.Body>
  </Media>
);

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
  match: PropTypes.object
};

Comment.defaultProps = {
  match: null
};

export default Comment;