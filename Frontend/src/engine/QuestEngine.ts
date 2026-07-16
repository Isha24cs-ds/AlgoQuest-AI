import { rewardPlayer } from "./RewardEngine";

export function completeEasyQuest() {
  rewardPlayer(100, 50);
}

export function completeMediumQuest() {
  rewardPlayer(180, 80);
}

export function completeHardQuest() {
  rewardPlayer(350, 150);
}