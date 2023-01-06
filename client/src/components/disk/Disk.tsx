import React, { ChangeEvent, FC, useEffect, useState } from 'react';

import './disk.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/useSelector';
import {
  setCurrentDir,
  popFromStack,
  setPopupDisplay,
} from '../../store/features/files/fileSlice';
import FileList from './fileList/FileList';
import Popup from './Popup';
import { getFiles, uploadFile } from '../../store/features/files/actions';
import { UploadFileProps } from '../../store/features/files/types';
import Uploader from './uploader/Uploader';

const Disk: FC = () => {
  const dispatch = useAppDispatch();
  const currentDir = useAppSelector((state) => state.file.currentDir);
  const [...dirStackCopy] = useAppSelector((state) => state.file.dirStack);
  const [dragEnter, setDragEnter] = useState(false);
  const [sort, setSort] = useState('type');
  useEffect(() => {
    dispatch(getFiles({ dirId: currentDir, sort }));
  }, [currentDir, sort]);

  function onShowPopup(): void {
    dispatch(setPopupDisplay('flex'));
  }

  function onBackClick(): void {
    const backDirId = dirStackCopy.pop();
    dispatch(setCurrentDir(backDirId));
    dispatch(popFromStack());
  }

  function onFileUpload(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files) {
      const fileListAsArray = Array.from(event.target.files);
      fileListAsArray.forEach((file) => {
        dispatch(uploadFile({ file, dirId: currentDir } as UploadFileProps));
      });
    }
  }

  function onDragEnterHandler(event: React.DragEvent<HTMLDivElement>) {
    console.log('enter');
    event.preventDefault();
    event.stopPropagation();
    setDragEnter(true);
  }

  function onDragLeaveHandler(event: React.DragEvent<HTMLDivElement>) {
    console.log('leave');
    event.preventDefault();
    event.stopPropagation();
    setDragEnter(false);
  }

  function onDropHandler(event: React.DragEvent<HTMLDivElement>) {
    console.log('drop');
    event.preventDefault();
    event.stopPropagation();
    const files = Array.from(event.dataTransfer.files);
    files.forEach((file) => {
      dispatch(uploadFile({ file, dirId: currentDir } as UploadFileProps));
    });
    setDragEnter(false);
  }

  return !dragEnter ? (
    <div
      className="disk"
      onDragEnter={onDragEnterHandler}
      onDragLeave={onDragLeaveHandler}
      onDragOver={onDragEnterHandler}
    >
      <div className="disk__btns">
        <button className="disk__back" onClick={() => onBackClick()}>
          Назад
        </button>
        <button className="disk__create" onClick={() => onShowPopup()}>
          Создать папку
        </button>
        <div className="disk___upload">
          <label htmlFor="disk__upload-input" className="disk__upload-label">
            Загрузить файл
          </label>
          <input
            onChange={(e) => onFileUpload(e)}
            multiple
            type="file"
            id="disk__upload-input"
            className="disk__upload-input"
          />
        </div>
      </div>
      <select
        className="disk__select"
        value={sort}
        onChange={(e) => {
          setSort(e.target.value);
        }}
      >
        <option value="name"> По имени</option>
        <option value="type"> По типу</option>
        <option value="date"> По дате</option>
      </select>
      <FileList />
      <Popup />
      <Uploader></Uploader>
    </div>
  ) : (
    <div
      onDragEnter={onDragEnterHandler}
      onDragLeave={onDragLeaveHandler}
      onDragOver={onDragEnterHandler}
      onDrop={onDropHandler}
      className="drop-area"
    >
      Перетащите файлы сюда
    </div>
  );
};

export default Disk;
