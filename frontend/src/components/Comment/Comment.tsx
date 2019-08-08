import React, { FunctionComponent, useState } from 'react';
import MarkdownRenderer from 'react-markdown-renderer';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';

import Media from 'react-bootstrap/Media';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

import Loader from '../../utils/Loader';

import { ApproveBar } from '../../components/QuestionsPage/style';
import { MediaImage, QuestionLink } from './style';
import { CommentProps } from './models';
import Modal from 'react-bootstrap/Modal';

const Comment: FunctionComponent<CommentProps> = ({ comment, match }) => {
  const [modal, setModal] = useState(false);
  const removeComment = () => {
    // TODO: Add remove comment method
  };

  return (
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

        {!comment.isVerified && (
          <ApproveBar>
            <ButtonGroup>
              <Button
                variant="success"
                size="sm"
                // TODO: Add approve Question method/action
                // onClick={() => approveQuestion(question._id)}
              >
                Approve
              </Button>
              <Button variant="danger" size="sm" onClick={() => setModal(true)}>
                Remove
              </Button>
            </ButtonGroup>

            <Modal size="sm" show={modal} onHide={() => setModal(false)}>
              <Modal.Header closeButton>
                <Modal.Title>Are you sure?</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p>
                  If so, you will not be able to restore this comment back
                  again.
                </p>
              </Modal.Body>
              <Modal.Footer>
                <ButtonGroup>
                  <Button variant="secondary" onClick={() => setModal(false)}>
                    Cancel
                  </Button>
                  <Button variant="danger" onClick={removeComment}>
                    Remove
                  </Button>
                </ButtonGroup>
              </Modal.Footer>
            </Modal>
          </ApproveBar>
        )}
      </Media.Body>
    </Media>
  );
};

Comment.defaultProps = {
  match: null,
};

export default Loader('comment')(Comment);
