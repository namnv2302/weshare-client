import apiInstance from '@apis/index';

enum UploadPath {
  DEFAULT = 'files/upload',
}

export const uploadImage = async (file: any, folderName?: string) => {
  return await apiInstance.post(
    UploadPath.DEFAULT,
    { file: file, folderName: folderName },
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );
};
