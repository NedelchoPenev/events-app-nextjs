import { useState, useEffect, useContext } from 'react';

import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';
import NotificationContext from '../../store/notification-context';

function Comments(props) {
  const notificationCtx = useContext(NotificationContext);
  const { eventId } = props;

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([])
  const [newCommentAdded, setNewCommentAdded] = useState(false)

  useEffect(() => {
    if (showComments) {
      fetch(`/api/comments/${eventId}`)
        .then(res => res.json())
        .then(data => {
          setComments(data.comments)
        })
    }
  }, [showComments, newCommentAdded])

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData) {
    notificationCtx.showNotification({
      title: 'Sending comment...',
      message: 'Your comment is currently being stored into a database.',
      status: 'pending',
    });
    fetch(`/api/comments/${eventId}`, {
      method: "POST",
      body: JSON.stringify(commentData),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      if (res.ok) {
        return res.json()
      }

      return res.json().then(data => {
        throw new Error(data.message || 'Something went wrong!')
      })
    })
      .then((data) => {
        notificationCtx.showNotification({
          title: 'Success!',
          message: 'Your comment was saved!',
          status: 'success',
        });
        setNewCommentAdded((prevStatus) => !prevStatus)
      })
      .catch((error) => {
        notificationCtx.showNotification({
          title: 'Error!',
          message: error.message || 'Something went wrong!',
          status: 'error',
        });
      });
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList comments={comments} />}
    </section>
  );
}

export default Comments;
