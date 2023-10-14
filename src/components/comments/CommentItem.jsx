import React from "react";
import { useDispatch } from "react-redux";
import { getAuthUser } from "../../helpers/functions";
import { deleteComment } from "../../store/comments/commentsActions";

const CommentItem = ({ comment }) => {
  const dispatch = useDispatch();
  return (
    <div>
      <span>@{comment.user}</span>
      <p>{comment.body}</p>
      {getAuthUser() === comment.user && (
        <button
          onClick={() => dispatch(deleteComment({ commentId: comment.id }))}
        >
          delete
        </button>
      )}
    </div>
  );
};

export default CommentItem;
