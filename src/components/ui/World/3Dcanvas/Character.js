// import React, { useRef, useEffect } from 'react';
// import { useGLTF, useAnimations } from '@react-three/drei';
// useGLTF.preload('../models/TigerCharacter.gltf');
// const Character = (props) => {
//   const group = useRef();
//   const { nodes, materials, animations } = useGLTF(
//     '../models/TigerCharacter.gltf'
//   );
//   const { actions } = useAnimations(animations, group);

//   useEffect(() => {
//     actions[props.moveState].reset().fadeIn(0.2).play();
//     return () => {
//       actions[props.moveState]?.fadeOut(0.2);
//     };
//   }, [props.moveState]);

//   return (
//     <group ref={group} {...props} dispose={null}>
//       <group name="Scene">
//         <group name="Armature" position={[0, 0.536, 0]} scale={0.535}>
//           <primitive object={nodes.Bone} />
//           <skinnedMesh
//             castShadow
//             name="body"
//             geometry={nodes.body.geometry}
//             material={materials.Material}
//             skeleton={nodes.body.skeleton}
//           />
//           <skinnedMesh
//             castShadow
//             name="body_2"
//             geometry={nodes.body_2.geometry}
//             material={materials['Material.004']}
//             skeleton={nodes.body_2.skeleton}
//           />
//           <skinnedMesh
//             castShadow
//             name="ear_2"
//             geometry={nodes.ear_2.geometry}
//             material={materials['Material.005']}
//             skeleton={nodes.ear_2.skeleton}
//           />
//           <skinnedMesh
//             castShadow
//             name="eyebrown"
//             geometry={nodes.eyebrown.geometry}
//             material={materials['Material.002']}
//             skeleton={nodes.eyebrown.skeleton}
//           />
//           <skinnedMesh
//             castShadow
//             name="eyes"
//             geometry={nodes.eyes.geometry}
//             material={materials['Material.001']}
//             skeleton={nodes.eyes.skeleton}
//           />
//           <skinnedMesh
//             castShadow
//             name="head"
//             geometry={nodes.head.geometry}
//             material={materials.Material}
//             skeleton={nodes.head.skeleton}
//           />
//           <skinnedMesh
//             castShadow
//             name="head_2"
//             geometry={nodes.head_2.geometry}
//             material={materials['Material.003']}
//             skeleton={nodes.head_2.skeleton}
//           />
//           <skinnedMesh
//             castShadow
//             name="mouth"
//             geometry={nodes.mouth.geometry}
//             material={materials['Material.001']}
//             skeleton={nodes.mouth.skeleton}
//           />
//           <skinnedMesh
//             castShadow
//             name="nose"
//             geometry={nodes.nose.geometry}
//             material={materials['Material.002']}
//             skeleton={nodes.nose.skeleton}
//           />
//           <skinnedMesh
//             castShadow
//             name="tail"
//             geometry={nodes.tail.geometry}
//             material={materials.Material}
//             skeleton={nodes.tail.skeleton}
//           />
//         </group>
//       </group>
//     </group>
//   );
// };

// export default Character;

import React, { useRef, useEffect } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
useGLTF.preload('../models/BunnyCharacter.gltf');
const Character = (props) => {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF(
    '../models/BunnyCharacter.gltf'
  );
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    actions[props.moveState].reset().fadeIn(0.2).play();
    return () => {
      actions[props.moveState]?.fadeOut(0.2);
    };
  }, [props.moveState]);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Armature" position={[0, 0.536, 0]} scale={0.535}>
          <primitive object={nodes.Bone} />
          <skinnedMesh
            castShadow
            name="Body"
            geometry={nodes.Body.geometry}
            material={materials['Material.009']}
            skeleton={nodes.Body.skeleton}
          />
          <skinnedMesh
            castShadow
            name="body_2"
            geometry={nodes.body_2.geometry}
            material={materials['Material.008']}
            skeleton={nodes.body_2.skeleton}
          />
          <skinnedMesh
            castShadow
            name="Ear_2"
            geometry={nodes.Ear_2.geometry}
            material={materials['Material.007']}
            skeleton={nodes.Ear_2.skeleton}
          />
          <skinnedMesh
            castShadow
            name="eyebrow"
            geometry={nodes.eyebrow.geometry}
            material={materials['Material.003']}
            skeleton={nodes.eyebrow.skeleton}
          />
          <skinnedMesh
            castShadow
            name="eyes"
            geometry={nodes.eyes.geometry}
            material={materials['Material.002']}
            skeleton={nodes.eyes.skeleton}
          />
          <skinnedMesh
            castShadow
            name="Head"
            geometry={nodes.Head.geometry}
            material={materials['bunny texturee']}
            skeleton={nodes.Head.skeleton}
          />
          <skinnedMesh
            castShadow
            name="moustache"
            geometry={nodes.moustache.geometry}
            material={materials['Material.001']}
            skeleton={nodes.moustache.skeleton}
          />
          <skinnedMesh
            castShadow
            name="mouth"
            geometry={nodes.mouth.geometry}
            material={materials['Material.010']}
            skeleton={nodes.mouth.skeleton}
          />
          <skinnedMesh
            castShadow
            name="nose"
            geometry={nodes.nose.geometry}
            material={materials['Material.007']}
            skeleton={nodes.nose.skeleton}
          />
          <skinnedMesh
            castShadow
            name="tail"
            geometry={nodes.tail.geometry}
            material={materials['Material.008']}
            skeleton={nodes.tail.skeleton}
          />
        </group>
      </group>
    </group>
  );
};
export default Character;
