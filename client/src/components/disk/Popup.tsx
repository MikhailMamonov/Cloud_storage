import React, { FC, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/useSelector';
import { setPopupDisplay } from '../../store/features/files/fileSlice';
import Input from '../../utils/input/Input';
import { CreateDirProps } from '../../store/features/files/types';
import { createDir } from '../../store/features/files/actions';

const Popup: FC = () => {
  const [dirName, setDirName] = useState('');
  const { popupDisplay, currentDir } = useAppSelector((state) => state.file);
  const dispatch = useAppDispatch();

  function createHandler() {
    try {
      const data = { dirId: currentDir, name: dirName } as CreateDirProps;
      dispatch(createDir(data));
      setDirName('');
      dispatch(setPopupDisplay('none'));
    } catch (error) {
      alert(error);
    }
  }

  return (
    <div
      className="popup"
      onClick={() => {
        dispatch(setPopupDisplay('none'));
      }}
      style={{ display: popupDisplay }}
    >
      <div
        className="popup__content"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="popup__header">
          <div className="popup__title">Создать новую папку</div>
          <button
            className="popup__close"
            onClick={() => {
              dispatch(setPopupDisplay('none'));
            }}
          >
            X
          </button>
        </div>
        <Input
          type="text"
          value={dirName}
          setValue={setDirName}
          placeholder="Введите название папки"
        ></Input>
        <button className="popup__create" onClick={createHandler}>
          Создать
        </button>
      </div>
    </div>
  );
};

export default Popup;
