import { player } from "../store/gameStore";

export function rewardPlayer(
  xp: number,
  coins: number
) {
  player.xp += xp;
  player.coins += coins;

  console.log(
    `+${xp} XP | +${coins} Coins`
  );

  checkLevelUp();
}

function checkLevelUp() {
  const requiredXP = player.level * 500;

  if (player.xp >= requiredXP) {
    player.level++;

    console.log(
      `🎉 Level Up! Level ${player.level}`
    );
  }
}