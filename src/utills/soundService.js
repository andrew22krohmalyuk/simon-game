import { SOUND_URL } from "../config/urls";

export const SOUND_TYPES = {
  RED: 1,
  GREEN: 2,
  BLUE: 3,
  YELLOW: 4,
};

export const SOUND_INDEXES = {
  1: 'RED',
  2: 'GREEN',
  3: 'BLUE',
  4: 'YELLOW',
};

export const playSound = value =>  { new Audio(`${SOUND_URL}/projects/simon/sounds/${value}.ogg`).play(); };

export const getRandomSound = () => {
  const index = Math.floor(Math.random() * Object.keys(SOUND_INDEXES).length + 1);
  return {
    index,
    color: SOUND_INDEXES[index].toLowerCase()
  }
};
