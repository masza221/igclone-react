import { FC} from "react";
import { IData } from "../../interfaces/interfaces";
import { StyledPost, StyledUser, StyledUserName } from "./Post.styles";
import Image from "../Image/Image";


interface IProps {
  data: IData ;
}



export const Post: FC<IProps> = ( {data}) => {

  const {desc, photo, userPhoto} = data.data;


  return (
    <StyledPost>
      <StyledUser>
        <Image width="50px" height="50px" src={userPhoto} alt="user" />
        <span>{data.data.userName}</span>
      </StyledUser>
      { photo && <Image src={photo} alt=""/>}
      {desc && <p><StyledUserName>{data.data.userName}</StyledUserName>: {desc}</p>}
    </StyledPost>
  );
};
