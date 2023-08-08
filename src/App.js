//packages
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { AnimatePresence } from 'framer-motion';

//pages
import Login from './components/pages/Login';
import Signup from './components/pages/Signup';
import Main from './components/pages/Main';
// import Three from './components/pages/Three';
import MapList from './components/pages/MapList';
import World from './components/pages/World';
// import MainWorld from './components/pages/MainWorld';
import CollectionSpace from './components/pages/CollectionSpace';
import Test from './components/pages/Test';
import GlobalWorld from './components/pages/GlobalWorld';
import CollectionSpaceTwo from './components/pages/CollectionSpaceTwo';
import CollectionSpaceThree from './components/pages/CollectionSpaceThree';
import ImageEffect from './components/pages/ImageEffect';

function App() {
  return (
    <AnimatePresence>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/globalworld" element={<GlobalWorld />} />
        <Route path="/world" element={<World />} />
        {/* <Route path="/world" element={<MainWorld />} /> */}
        <Route path="/maplist" element={<MapList />} />
        <Route path="/test" element={<Test />} />
        <Route path="/collectionspace/:id" element={<CollectionSpace />} />
        <Route
          path="/collectionspace_two/:id"
          element={<CollectionSpaceTwo />}
        />
        <Route
          path="/collectionspace_three/:id"
          element={<CollectionSpaceThree />}
        />
        <Route path="/imageeffect" element={<ImageEffect />} />
      </Routes>
    </AnimatePresence>
  );
}

export default App;
