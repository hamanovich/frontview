import React, { FunctionComponent, useState } from 'react';
import { connect } from 'react-redux';
import MarkdownRenderer from 'react-markdown-renderer';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';

import Media from 'react-bootstrap/Media';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Modal from 'react-bootstrap/Modal';

import { addFlashMessage } from '../../actions/flash';
import {
  approveComment,
  removeComment,
  CommentsActionTypes,
} from '../../actions/comments';
import { ApproveBar } from '../../components/QuestionsPage/style';
import { MediaImage, QuestionLink } from './style';
import {
  Comment as CommentType,
  CommentQuestion,
  AddFlashMessageType,
  RoleEnum,
} from '../../propTypes';

type CommentProps = {
  comment: CommentQuestion;
  match: {
    params: {
      username: string;
    };
  } | null;
  role?: string;
  approveComment: (id: string) => Promise<CommentsActionTypes>;
  removeComment: (id: string) => Promise<CommentsActionTypes>;
  addFlashMessage: AddFlashMessageType;
};

const Comment: FunctionComponent<CommentProps> = ({
  comment,
  match,
  role,
  approveComment,
  removeComment,
  addFlashMessage,
}) => {
  const [modal, setModal] = useState<boolean>(false);

  const remove = (id: string) => {
    removeComment(id).then(() => {
      addFlashMessage({
        type: 'success',
        text: `Comment with id=__${id}__ was removed`,
      });
    });
  };

  const approve = (id: string) => {
    approveComment(id).then(() => {
      addFlashMessage({
        type: 'success',
        text: `Comment with id=__${id}__ was approved`,
      });
    });
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

        {(!comment.isVerified ||
          comment.author.username ===
            (match && match.params && match.params.username)) && (
          <ApproveBar>
            <ButtonGroup>
              {(role === RoleEnum.ADMIN || role === RoleEnum.SUPERADMIN) && (
                <Button
                  variant="success"
                  size="sm"
                  onClick={() => approve(comment._id)}>
                  Approve
                </Button>
              )}
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
                  <Button variant="danger" onClick={() => remove(comment._id)}>
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

const mapStateToProps = (state: { comments: CommentType[] }) => ({
  comments: state.comments,
});

const mapDispatchToProps = { addFlashMessage, approveComment, removeComment };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Comment);
