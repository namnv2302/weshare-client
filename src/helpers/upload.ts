import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '@utils/firebase';

export const uploadImage = async (file: any) => {
  try {
    const extName = file.name.split('.')[1];
    const nameFile = file.name.split('.')[0];
    const storageRef = ref(storage, `${nameFile}-${file.uid}.${extName}`);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  } catch (error) {
    console.error(error);
  }
};

export const uploadFile = async (file: any) => {
  try {
    const extName = file.name.split('.')[1];
    const nameFile = file.name.split('.')[0];
    const storageRef = ref(storage, `${nameFile}-${file.uid}.${extName}`);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  } catch (error) {
    console.error(error);
  }
};
