import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../config/config";
import { IData, IPost } from "../interfaces/interfaces";

const usePosts = () => {
    const [postsState, setPostsState] = useState<IData[]>([]);

      

    useEffect(() => {
      const getPosts = async () => {
        const postsCol = collection(db, "posts");
        const postsSnapshot = await getDocs(postsCol);
        const postsList: IData[] = postsSnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data() as IPost,
        }));
        sortPosts(postsList);
        setPostsState(postsList);
      };
      getPosts();

      return () => {
        console.log( 'unmount');
      }
    }, []);


    const sortPosts = (posts: IData[]) => {
      posts.sort((a, b) => {
        return (
          new Date(b.data.createdAt).getTime() -
          new Date(a.data.createdAt).getTime()
        );
      });
    };

    const getUserPosts = (userId: string) => {
      return postsState.filter((post) => post.data.userId === userId);
    };



    return {postsState, getUserPosts};
};
export default usePosts;
