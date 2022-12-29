import Navbar from './components/navbar/Navbar';
import './app.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Registration from './components/registtration/Registration';
import Login from './components/authorization/Login';
import { useAppSelector } from './hooks/useSelector';

function App() {
  const { isAuth } = useAppSelector((state) => state.auth);

  return (
    <BrowserRouter>
      <div className="app">
        <Navbar></Navbar>
        <div className="wrap">
          {!isAuth && (
            <Routes>
              <Route
                path="/registration"
                element={<Registration></Registration>}
              ></Route>
              <Route path="/login" element={<Login></Login>}></Route>
            </Routes>
          )}
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
