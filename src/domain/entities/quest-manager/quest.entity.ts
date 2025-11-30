export interface Quest {
  teamSize: number
  failRequired: number
}

export interface QuestNumber {
  [numberOfPlayers: number]: Quest
}

export interface QuestMatrix {
  [questNumber: number]: QuestNumber
}

export const questMatrix: QuestMatrix = {
  1: {
    5: { teamSize: 2, failRequired: 1 },
    6: { teamSize: 2, failRequired: 1 },
    7: { teamSize: 2, failRequired: 1 },
    8: { teamSize: 3, failRequired: 1 },
    9: { teamSize: 3, failRequired: 1 },
    10: { teamSize: 3, failRequired: 1 },
  },
  2: {
    5: { teamSize: 3, failRequired: 1 },
    6: { teamSize: 3, failRequired: 1 },
    7: { teamSize: 3, failRequired: 1 },
    8: { teamSize: 4, failRequired: 1 },
    9: { teamSize: 4, failRequired: 1 },
    10: { teamSize: 4, failRequired: 1 },
  },
  3: {
    5: { teamSize: 2, failRequired: 1 },
    6: { teamSize: 4, failRequired: 1 },
    7: { teamSize: 3, failRequired: 1 },
    8: { teamSize: 4, failRequired: 1 },
    9: { teamSize: 4, failRequired: 1 },
    10: { teamSize: 4, failRequired: 1 },
  },
  4: {
    5: { teamSize: 3, failRequired: 1 },
    6: { teamSize: 3, failRequired: 1 },
    7: { teamSize: 4, failRequired: 2 },
    8: { teamSize: 5, failRequired: 2 },
    9: { teamSize: 5, failRequired: 2 },
    10: { teamSize: 5, failRequired: 2 },
  },
  5: {
    5: { teamSize: 3, failRequired: 1 },
    6: { teamSize: 4, failRequired: 1 },
    7: { teamSize: 4, failRequired: 1 },
    8: { teamSize: 5, failRequired: 1 },
    9: { teamSize: 5, failRequired: 1 },
    10: { teamSize: 5, failRequired: 1 },
  },
}
