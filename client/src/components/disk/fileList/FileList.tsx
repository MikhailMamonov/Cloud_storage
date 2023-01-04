import React, { FC } from 'react';
import './fileList.scss';
import File from './file/File';
import { useAppSelector } from '../../../hooks/useSelector';

const FileList: FC = () => {
  const files = useAppSelector((state) => state.file.files).map((file) => (
    <File key={file.id} file={file} />
  ));

  return (
    <div className="filelist">
      <div className="filelist__header">
        <div className="filelist__name">Название</div>
        <div className="filelist__date">Дата</div>
        <div className="filelist__size">Размер</div>
      </div>
      {files}
    </div>
  );
};

export default FileList;
