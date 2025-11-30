import { shuffle } from 'src/utils/fisher-yates-shuffle'
import { Player } from '../player.entity'
import { Faction } from '../roles/role.entity'
import { questMatrix, QuestMatrix, questRoleMatrix, QuestRoleMatrix } from './quest.entity'

class QuestConfigs {
  static MAX_QUEST: number = 5
  static MAX_REJECTED_COUNT: number = 5
  static MIN_PLAYER: number = 5
  static MAX_PLAYER: number = 10
  static QUEST: QuestMatrix = questMatrix
  static QUEST_ROLES: QuestRoleMatrix = questRoleMatrix
}

export interface QuestManagerProps {
  players: Player[]
}

export class QuestManager {
  currentQuest: number
  currentRejectedCount: number
  players: Player[]

  questSuccess: number
  questFailed: number

  constructor({ players }: QuestManagerProps) {
    this.currentQuest = 1
    this.currentRejectedCount = 0
    this.players = players

    this.questSuccess = 0
    this.questFailed = 0
  }

  get numberOfPlayers() {
    return this.players.length
  }

  start() {
    if (
      this.numberOfPlayers < QuestConfigs.MIN_PLAYER ||
      this.numberOfPlayers > QuestConfigs.MAX_PLAYER
    ) {
      throw new Error(
        `Invalid number of players: ${this.numberOfPlayers}. Must be between ${QuestConfigs.MIN_PLAYER} and ${QuestConfigs.MAX_PLAYER}.`
      )
    }

    this.assignRoles()
  }

  assignRoles() {
    const roles = QuestConfigs.QUEST_ROLES[this.numberOfPlayers]
    const shuffled = shuffle(roles)

    this.players.forEach((x, i) => {
      x.assignRole(shuffled[i])
    })
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
    return this.currentRejectedCount >= QuestConfigs.MAX_REJECTED_COUNT
  }

  embark(tokens: boolean[]): boolean {
    const failRequired = QuestConfigs.QUEST[this.currentQuest][this.numberOfPlayers].failRequired

    const success = tokens.filter((x) => x === false).length < failRequired
    return success
  }

  evaluate(isQuestSuccess: boolean) {
    isQuestSuccess ? (this.questSuccess += 1) : (this.questFailed += 1)
  }

  endGame(): [boolean, Faction | undefined] {
    const gameFinished = this.currentQuest >= QuestConfigs.MAX_QUEST

    const halfQuests = Math.ceil(QuestConfigs.MAX_QUEST / 2)
    const goodWon = this.questSuccess >= halfQuests
    const evilWon = this.questFailed >= halfQuests

    const winner = goodWon ? 'good' : evilWon ? 'evil' : undefined

    return [gameFinished, winner] as const
  }
}
