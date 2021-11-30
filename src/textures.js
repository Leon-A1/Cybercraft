import neonImg from "./images/neon.jpg";
import cbImg from "./images/cyber_bricks.jpg";
import pallImg from "./images/palladium.jpg";
import glassImg from "./images/glass.png";

import { TextureLoader, NearestFilter, LinearMipMapLinearFilter } from "three";

export const neon = new TextureLoader().load(neonImg);
export const cyberBricks = new TextureLoader().load(cbImg);
export const palladium = new TextureLoader().load(pallImg);
export const glass = new TextureLoader().load(glassImg);

neon.magFilter = NearestFilter;
neon.minFilter = LinearMipMapLinearFilter;
cyberBricks.magFilter = NearestFilter;
cyberBricks.minFilter = LinearMipMapLinearFilter;
palladium.magFilter = NearestFilter;
palladium.minFilter = LinearMipMapLinearFilter;
glass.magFilter = NearestFilter;
glass.minFilter = LinearMipMapLinearFilter;
