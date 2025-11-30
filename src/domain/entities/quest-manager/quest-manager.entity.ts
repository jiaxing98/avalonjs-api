import { Faction } from '../roles/role.entity'
import { questMatrix, QuestMatrix } from './quest.entity'

export class QuestManager {
  readonly MAX_QUEST: number = 5
  readonly MAX_REJECTED_COUNT: number = 5
  readonly MIN_PLAYER: number = 5
  readonly MAX_PLAYER: number = 10
  readonly QUEST_MATRIX: QuestMatrix

  currentQuest: number
  currentRejectedCount: number
  numberOfPlayers: number

  questSuccess: number
  questFailed: number

  constructor() {
    this.QUEST_MATRIX = questMatrix
  }

  start(numberOfPlayers: number) {
    if (numberOfPlayers < this.MIN_PLAYER || numberOfPlayers > this.MAX_PLAYER) {
      throw new Error(
        `Invalid number of players: ${numberOfPlayers}. Must be between ${this.MIN_PLAYER} and ${this.MAX_PLAYER}.`
      )
    }

    this.currentQuest = 0
    this.currentRejectedCount = 0
    this.numberOfPlayers = numberOfPlayers

    this.questSuccess = 0
    this.questFailed = 0
  }

  nextTurn() {
    this.currentQuest += 1
    this.currentRejectedCount = 0
  }

  vote(tokens: boolean[]): boolean {
    const success = tokens.reduce((acc, v) => acc + (v ? 1 : -1), 0) > 0
    return success
  }

  rejectTeam(): boolean {
    this.currentRejectedCount += 1
    return this.currentRejectedCount >= this.MAX_REJECTED_COUNT
  }

  embark(tokens: boolean[]): boolean {
    const failRequired = this.QUEST_MATRIX[this.currentQuest][this.numberOfPlayers].failRequired

    const success = tokens.filter((x) => x === false).length < failRequired
    return success
  }

  evaluate(isQuestSuccess: boolean) {
    isQuestSuccess ? (this.questSuccess += 1) : (this.questFailed += 1)
  }

  endGame(): [boolean, Faction | undefined] {
    const gameFinished = this.currentQuest >= this.MAX_QUEST
    if (!gameFinished) return [false, undefined] as const

    const halfQuests = Math.ceil(this.MAX_QUEST / 2)
    if (this.questSuccess >= halfQuests) return [true, 'good'] as const
    if (this.questFailed >= halfQuests) return [true, 'evil'] as const

    return [true, undefined] as const
  }
}
