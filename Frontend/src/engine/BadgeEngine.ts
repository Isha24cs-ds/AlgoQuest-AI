import { player } from "../store/gameStore";

export function unlockBadge(
  badge: string
) {
  if (
    !player.badges.includes(badge)
  ) {
    player.badges.push(badge);

    console.log(
      `🏆 Badge Unlocked: ${badge}`
    );
  }
}