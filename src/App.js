import React from "react";
import { Canvas } from "react-three-fiber";
import { Stars } from "drei";
import { Physics } from "use-cannon";
import { Ground } from "./components/Ground";
import Cubes from "./components/Cubes";
import { Player } from "./components/Player";
import { Hud } from "./components/Hud";

function App() {
  return (
    <Canvas shadowMap sRGB>
      <Stars />
      <ambientLight intensity={0.45} />
      <pointLight castShadow intensity={0.25} position={[100, 100, 100]} />
      <Hud position={[0, 0, -1]} />
      <Physics gravity={[0, -15, 0]}>
        <Ground position={[0, 0.5, 0]} />
        <Player position={[0, 3, 10]} />
        <Cubes />
      </Physics>
    </Canvas>
  );
}

export default App;
