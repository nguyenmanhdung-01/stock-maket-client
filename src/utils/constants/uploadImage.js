import {
  getDownloadURL,
  ref,
  updateMetadata,
  uploadBytes,
} from "firebase/storage";
import { storage } from "../../libraries/firebaseConfig";

const getRandomFileName = () => {
  const randomNumber = Math.floor(10000000 + Math.random() * 90000000);
  return `${randomNumber}`;
};

export const uploadImageToFirebase = async (file) => {
  const fileName = getRandomFileName();
  const storageRef = ref(storage, `uploads/${fileName}.jpg`);

  try {
    // Upload file lên Firebase Storage
    const snapshot = await uploadBytes(storageRef, file);
    // Lấy đường dẫn public của file
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};

export const updateImageToFirebase = async (file) => {
  const storageRef = ref(storage, `uploads/${file}`);
  try {
    const metadata = {
      customMetadata: {
        updated: "true", // Thêm thông tin metadata cần cập nhật
      },
    };
    const snapshot = await updateMetadata(storageRef, metadata);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    console.error("Error update file:", error);
    throw error;
  }
};
