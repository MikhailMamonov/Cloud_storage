import React, { FC } from 'react';
import UploadFile from './UploadFile';
import './uploader.scss';
import { useAppDispatch, useAppSelector } from '../../../hooks/useSelector';
import { hideUploader } from '../../../store/features/uploader/uploaderSlice';

const Uploader: FC = () => {
  const files = useAppSelector((state) => state.upload.files);

  const isVisible = useAppSelector((state) => state.upload.isVisible);
  const dispatch = useAppDispatch();

  return (
    <>
      {isVisible && (
        <div className="uploader">
          <div className="uploader__header">
            <div className="uploader__title">Загрузки</div>
            <button
              className="uploader__close"
              onClick={() => dispatch(hideUploader())}
            >
              X
            </button>
          </div>
          {files.map((file) => (
            <UploadFile key={file.id} file={file}></UploadFile>
          ))}
        </div>
      )}
    </>
  );
};

export default Uploader;
