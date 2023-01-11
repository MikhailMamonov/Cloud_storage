import { FC, useState } from 'react';
import Input from 'utils/input/Input';
import { registration } from 'store/actions/auth';
import './registration.scss';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'store';
import { RegistrationProps } from 'store/types/auth';

const Registration: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch<AppDispatch>();

  const handleRegister = () => {
    try {
      const data = { email, password } as RegistrationProps;
      dispatch(registration(data));
      setEmail('');
      setPassword('');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="registration">
      <div className="registration__header">Регистрация</div>
      <Input
        value={email}
        setValue={setEmail}
        type="text"
        placeholder="введите имя"
      />
      <Input
        value={password}
        setValue={setPassword}
        type="password"
        placeholder="введите пароль"
      />
      <button className="registration__btn" onClick={handleRegister}>
        Зарегистрироваться
      </button>
    </div>
  );
};

export default Registration;
