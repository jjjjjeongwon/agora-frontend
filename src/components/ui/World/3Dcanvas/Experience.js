import { OrbitControls } from '@react-three/drei';
import { CharacterController } from './CharacterController';
import Light from './Light';
import Floor from './Floor';
import Road from './Road';
import Lamp from './Lamp';
import FloorFence from './FloorFence';
import House from './House';
import Car from './Car';
import Tree from './Tree';
import HouseName from './HouseName';
const Experience = () => {
  return (
    <>
      <OrbitControls enableDamping enablePan={false} />
      <Light />
      <Floor />
      <Road />
      {/* <FloorFence /> */}
      <Lamp />
      <House />
      <HouseName />
      <Car />
      <Tree />
      <CharacterController />
    </>
  );
};

export default Experience;
