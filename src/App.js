//packages
import { Route, Routes } from 'react-router-dom';
import './App.css';

//pages
import Login from './components/pages/Login';
import Signup from './components/pages/Signup';
import Main from './components/pages/Main';
// import Three from './components/pages/Three';
import MapList from './components/pages/MapList';
import World from './components/pages/World';
import CollectionSpace from './components/pages/CollectionSpace';
import Test from './components/pages/Test';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      {/* <Route path="/three/:id" element={<Three />} /> */}
      <Route path="/world" element={<World />} />
      <Route path="/maplist" element={<MapList />} />
      <Route path="/test" element={<Test />} />
      <Route path="/collectionspace" element={<CollectionSpace />} />
    </Routes>
  );
}

export default App;
