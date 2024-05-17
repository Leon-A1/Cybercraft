import React, { useEffect, useRef, useState } from 'react';
import { useSphere } from 'use-cannon';
import { useThree, useFrame } from 'react-three-fiber';
import { FPVControls } from './FPVControls';
import { useKeyboardControls } from '../hooks/useKeyboardControls';
import { Vector3, Raycaster } from 'three';

const SPEED = 4; 
const JUMP_FORCE = 10; 

export const Player = (props) => {
  const { camera, scene } = useThree();
  const { moveForward, moveBackward, moveLeft, moveRight, jump } = useKeyboardControls();
  const [isGrounded, setIsGrounded] = useState(false);
  const [ref, api] = useSphere(() => ({
    mass: 0.3, 
    type: 'Dynamic',
    ...props,
  }));

  const velocity = useRef([0, 0, 0]);
  const raycaster = useRef(new Raycaster());

  useEffect(() => {
    api.velocity.subscribe((v) => {
      velocity.current = v;
    });
  }, [api.velocity]);

  useFrame(() => {
    camera.position.copy(ref.current.position);
    const direction = new Vector3();
    const frontVector = new Vector3(
      0,
      0,
      (moveBackward ? 1 : 0) - (moveForward ? 1 : 0)
    );
    const sideVector = new Vector3(
      (moveLeft ? 1 : 0) - (moveRight ? 1 : 0),
      0,
      0
    );

    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(SPEED)
      .applyEuler(camera.rotation);

    api.velocity.set(direction.x, velocity.current[1], direction.z);

    // Raycasting to check if the player is on the ground
    raycaster.current.set(ref.current.position, new Vector3(0, -1, 0));
    const intersects = raycaster.current.intersectObject(scene, true);
    setIsGrounded(intersects.length > 0 && intersects[0].distance < 1.1); 

    if (jump && isGrounded) {
      api.velocity.set(velocity.current[0], JUMP_FORCE, velocity.current[2]);
    }
  });

  return (
    <>
      <FPVControls />
      <mesh ref={ref} />
    </>
  );
};

