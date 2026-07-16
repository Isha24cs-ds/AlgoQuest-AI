export interface PlayerState {
  level: number;
  xp: number;
  coins: number;
  hearts: number;
  streak: number;
  badges: string[];
  unlockedWorlds: string[];
}

export const player: PlayerState = {
  level: 1,
  xp: 0,
  coins: 100,
  hearts: 3,
  streak: 0,
  badges: [],
  unlockedWorlds: ["variables"],
};