import React, { FC, useEffect } from 'react';

import './disk.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/useSelector';
import { getFiles } from '../../store/features/files/fileSlice';
import FileList from './fileList/FileList';

const Disk: FC = () => {
  const dispatch = useAppDispatch();
  const currentDir = useAppSelector((state) => state.file.currentDir);

  useEffect(() => {
    dispatch(getFiles(currentDir));
  }, [currentDir]);

  return (
    <div className="disk">
      <div className="disk__btns">
        <button className="disk__back">Назад</button>
        <button className="disk__create">Создать папку</button>
      </div>
      <FileList />
    </div>
  );
};

export default Disk;
