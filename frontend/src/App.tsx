import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import StatusList from './pages/StatusList';
import Header from './components/Header';

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path='' element={<Home />} />
        <Route path='/status/:status' element={<StatusList />} />
      </Routes>
    </>
  );
};

export default App;
