import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '@utils/firebase';

export const upload = async (file: any) => {
  try {
    const storageRef = ref(storage, `${file.uid}.png`);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  } catch (error) {
    console.error(error);
  }
};
