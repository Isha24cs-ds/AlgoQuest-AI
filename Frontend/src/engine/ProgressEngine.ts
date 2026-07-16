import { player } from "../store/gameStore";

export function unlockWorld(
  world: string
) {
  if (
    !player.unlockedWorlds.includes(world)
  ) {
    player.unlockedWorlds.push(world);
  }
}