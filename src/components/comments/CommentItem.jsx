import React from "react";
import { useDispatch } from "react-redux";
import { getAuthUser } from "../../helpers/functions";
import { deleteComment } from "../../store/comments/commentsActions";

const CommentItem = ({ comment }) => {
  const dispatch = useDispatch();
  return (
    <div>
      <span className="text-white bg-black font-light  rounded">@{comment.user}</span>
      <p className="font-light">{comment.body}</p>
      {getAuthUser() === comment.user && (
        <button
          onClick={() => dispatch(deleteComment({ commentId: comment.id }))}
          className="bg-black border w-20 h-8 py-2 text-white uppercase font-light hover:bg-transparent hover:text-black transition duration-300 mt-1 last:text-xs"
        >
          delete
        </button>
      )}
    </div>
  );
};

export default CommentItem;