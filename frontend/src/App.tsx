import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import StatusList from './pages/StatusList';
import Header from './components/Header';
import { useThemeContext } from './theme/ThemeContextProvider';
import { CssBaseline, ThemeProvider } from '@mui/material';

const App = () => {
  const { theme } = useThemeContext();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Routes>
        <Route path='' element={<Home />} />
        <Route path='/status/:status' element={<StatusList />} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
