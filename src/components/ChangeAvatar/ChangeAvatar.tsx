import { ChangeEvent, FC, useState } from "react";
import { IUser } from "../../interfaces/interfaces";
import * as yup from "yup";
import { FileDropArea, FileInput, FileMessage } from "../Input/Input.styles";
import axios from "axios";
import { useMutation } from "react-query";
import { useAppDispatch } from "../../state/store";
import { userUpdated } from "../../state/features/auth/authSlice";

interface IProps {
  user: IUser;
}

const sendFile = async (file: File) => {
  const formData = new FormData();
  formData.append("image", file);

  try {
    const response = await axios.post(
      "http://localhost:8800/api/upload/uploadFile",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed"); // Handle the error appropriately
  }
};

const updateUser = async (user: IUser) => {
  try {
    const response = await axios.put(
      "http://localhost:8800/api/users/"+ user._id,
      user,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Login failed"); // Handle the error appropriately
  }
};


const MAX_FILE_SIZE = 5242880; //5MB
const validFileExtensions = [
  "jpg",
  "gif",
  "png",
  "jpeg",
  "svg",
  "webp",
  "bmp",
  "heif",
  "heic",
];

const isValidFileType = (fileName: string, fileType: string) => {
  const extension = fileName.split(".").pop();
  return (
    validFileExtensions.includes(extension || "") &&
    fileType.startsWith("image/")
  );
};

const schema = yup.object().shape({
  photo: yup
    .mixed()
    .required("Photo is required")
    .test(
      "is-valid-type",
      "Not a valid image type",
      (value) => value && isValidFileType(value.name, value.type)
    )
    .test(
      "is-valid-size",
      `Max allowed size is ${MAX_FILE_SIZE / (1024 * 1024)}MB`,
      (value) => value && value.size <= MAX_FILE_SIZE
    ),
});

const ChangeAvatar: FC<IProps> = ({ user }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>();
  const fileMutation = useMutation(sendFile);
  const updateUserMutation = useMutation(updateUser);
  const dispatch = useAppDispatch();


  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    setError(null);

    const file = e.target.files?.[0];
    if (!file) return;

    const response = await schema.validate({ photo: file }).catch((err) => {
      setError(err.errors[0]);
      setLoading(false);
    })
    if (!response) return;

    const res = await fileMutation.mutateAsync(file);

    const updatedUser = {
      ...user,
      photoURL: res.fileUrl,
    };
    const res2 = await updateUserMutation.mutateAsync(updatedUser);
    dispatch(userUpdated(res2));
    setLoading(false);
  };

  return (
      <FileDropArea>
        <FileMessage $isError={error ? true : false} >{error ? error : "Drag and drop to change"}</FileMessage>
        <FileInput disabled={loading} placeholder="a" type="file" name="avatar" onChange={handleChange} />
      </FileDropArea>
  );
};

export default ChangeAvatar;
