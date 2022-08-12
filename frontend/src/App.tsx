import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { MovieList } from './pages/MovieList';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="movies">
          <Route index element={<MovieList />} />
          {/* <Route path=":id" element={<MovieDetails />} /> */}
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
