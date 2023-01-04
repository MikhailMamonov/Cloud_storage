import { FC, useState } from 'react';
import Input from '../../utils/input/Input';
import { login } from '../../store/features/auth/authSlice';
import './authorization.scss';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { LoginProps } from '../../store/features/auth/types';

const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch<AppDispatch>();

  const handleRegister = () => {
    try {
      const data = { email, password } as LoginProps;
      dispatch(login(data));
      setEmail('');
      setPassword('');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="registration">
      <div className="registration__header">Авторизация</div>
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
        Войти
      </button>
    </div>
  );
};

export default Login;
