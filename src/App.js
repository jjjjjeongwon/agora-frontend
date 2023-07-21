//packages
import { Route, Routes } from 'react-router-dom';
import './App.css';

//pages
import Login from './components/pages/Login';
// import MapList from './components/pages/MapList';
// import Signup from './components/pages/Signup';
import Main from './components/pages/Main';
// import Three from './components/pages/Three';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      {/* <Route path="/three" element={<Three />} /> */}
      <Route path="/login" element={<Login />} />
      {/* <Route path="/signup" element={<Signup />} /> */}
      {/* <Route path="/maplist" element={<MapList />} /> */}
    </Routes>
  );
}

export default App;
