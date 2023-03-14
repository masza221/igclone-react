export interface IData {
  data: IPost;
  id: string;
}
export interface IPost {
  desc: string;
  userId: string;
  userPhoto: string;
  userName: string;
  photo: string;
  createdAt: string;
  likes?: ILike[];
}

export interface ILike {
  userId: string;
}

export interface IUser {
  photoURL: string;
  displayName?: string | null;
  isAuth: boolean;
  uid: string;
  email: string | null;
}