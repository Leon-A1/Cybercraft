import React, { useState, useEffect } from 'react';
import { Canvas } from 'react-three-fiber';
import { Stars } from 'drei';
import { Physics } from 'use-cannon';
import { Ground } from './components/Ground';
import Cubes from './components/Cubes';
import { Player } from './components/Player';
import { Hud } from './components/Hud';
import Notification from './components/Notification';

function App() {
  const [isMobile, setIsMobile] = useState(false);
  const [showNotification, setShowNotification] = useState(true);

  useEffect(() => {
    if (window.innerWidth < 450) {
      setIsMobile(true);
    }

    const timer = setTimeout(() => {
      setShowNotification(false);
    }, 15000);

    return () => clearTimeout(timer);
  }, []);

  if (isMobile) {
    return (
      <div style={{ padding: '2rem', color: 'white' }}>
        <p>Cybercraft is only available on desktop</p>
      </div>
    );
  }

  return (
    <>
      {showNotification && (
        <Notification
          message={`Use W A S D to move around.\nPress 1-4 to select textures.\nLeft click to build.\nHold shift and left click to delete a block.`}
        />
      )}
      <Canvas shadowMap sRGB>
        <Stars />
        <ambientLight intensity={0.45} />
        <pointLight castShadow intensity={0.25} position={[100, 100, 100]} />
        <Hud position={[0, 0, -1]} />
        <Physics gravity={[0, -12, 0]}>
          <Ground position={[0, 0.5, 0]} />
          <Player position={[0, 3, 10]} />
          <Cubes />
        </Physics>
      </Canvas>
    </>
  );
}

export default App;

