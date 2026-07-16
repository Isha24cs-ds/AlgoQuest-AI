import { player } from "../store/gameStore";

export function buyHint(level: number) {
  let cost = 0;

  if (level === 1) cost = 10;
  if (level === 2) cost = 20;
  if (level === 3) cost = 50;

  if (player.coins >= cost) {
    player.coins -= cost;

    return true;
  }

  return false;
}