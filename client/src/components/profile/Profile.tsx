import React from 'react';
import { useAppDispatch } from '../../hooks/useSelector';
import { deleteAvatar, uploadAvatar } from '../../store/features/files/actions';

const Profile = () => {
  const dispatch = useAppDispatch();

  function changeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;
    const file = e.target.files[0];
    dispatch(uploadAvatar(file));
  }

  return (
    <div>
      <button onClick={() => dispatch(deleteAvatar())}>Удалить аватар</button>
      <input
        accept="image/*"
        onChange={(e) => changeHandler(e)}
        type="file"
        placeholder="Загрузить аватар"
      />
    </div>
  );
};

export default Profile;
