import React, { FC } from 'react';
import './fileList.scss';
import File from './file/File';
import { useAppSelector } from '../../../hooks/useSelector';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const FileList: FC = () => {
  const files = useAppSelector((state) => state.file.files);

  return (
    <div className="filelist">
      <div className="filelist__header">
        <div className="filelist__name">Название</div>
        <div className="filelist__date">Дата</div>
        <div className="filelist__size">Размер</div>
      </div>
      <TransitionGroup>
        {files.map((file) => (
          <CSSTransition
            key={file._id}
            timeout={500}
            classNames={'file'}
            exit={false}
          >
            <File key={file._id} file={file} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
};

export default FileList;
