import React, { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { MovieList } from './pages/MovieList';
import { MovieDetails } from './pages/MovieDetails';
import { NotFound } from './pages/NotFound';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { authTokenSelector } from './store/auth/selectors/auth';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const token = useSelector(authTokenSelector);

  useEffect(() => {
    const saveToken = () => {
      if (token) {
        localStorage.setItem('token', token);
      }
    };

    window.addEventListener('beforeunload', saveToken);

    return () => {
      window.removeEventListener('beforeunload', saveToken);
    };
  }, [token]);

  return (
    <Routes>
      <Route path="/" element={<Layout token={token} />}>
        <Route index element={<Home />} />
        <Route path="movies">
          <Route
            index
            element={token ? <MovieList /> : <Navigate to="/login" />}
          />
          <Route
            path=":id"
            element={token ? <MovieDetails /> : <Navigate to="/login" />}
          />
        </Route>
        <Route path="*" element={<NotFound />} />
        <Route
          path="/login"
          element={token ? <Navigate to="/movies" /> : <Login />}
        />
        <Route
          path="/register"
          element={token ? <Navigate to="/movies" /> : <Register />}
        />
      </Route>
    </Routes>
  );
}

export default App;
