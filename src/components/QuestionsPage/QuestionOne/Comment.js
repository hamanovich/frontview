import React from 'react';
import PropTypes from 'prop-types';
import MarkdownRenderer from 'react-markdown-renderer';
import moment from 'moment';

import Media from 'react-bootstrap/lib/Media';
import Image from 'react-bootstrap/lib/Image';
import Label from 'react-bootstrap/lib/Label';

const Comment = ({ comment }) => (
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
      <Media.Heading>{comment.topic}</Media.Heading>
      <MarkdownRenderer markdown={comment.text} />
      <Label bsStyle="info">{comment.author.username}</Label>
      <Label bsStyle="default" className="pull-right">{moment(comment.created).fromNow()}</Label>
      <hr />
    </Media.Body>
  </Media>
);

Comment.propTypes = {
  comment: PropTypes.object.isRequired
};

export default Comment;