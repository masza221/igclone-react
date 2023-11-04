import React, { FC } from "react";
import styled from "styled-components";
import Like from "../Like/Like";

interface LikesProps {
  likesCount: number;
  liked: boolean;
  handleClick: () => void;
  disabled?: boolean;
}

const StyledLikes = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 5px 10px;
  gap: 10px;

  p {
    font-size: 1rem;
    font-weight: 600;
  }
`;

const Likes: FC<LikesProps> = ({ likesCount, handleClick, liked, disabled }) => {
  return (
    <StyledLikes>
      <Like isLiked={liked} onClick={handleClick} disabled={disabled} />
      <p>
        {likesCount} <b>Likes</b>
      </p>
    </StyledLikes>
  );
};

export default Likes;
