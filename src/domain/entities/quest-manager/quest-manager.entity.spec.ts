import { Player } from '../player.entity'
import { QuestManager } from './quest-manager.entity'

describe('Quest Manager with 5 players', () => {
  let qm: QuestManager

  beforeEach(async () => {
    const player1 = new Player('player001', true)
    const player2 = new Player('player002', false)
    const player3 = new Player('player003', false)
    const player4 = new Player('player004', false)
    const player5 = new Player('player005', false)

    qm = new QuestManager({ players: [player1, player2, player3, player4, player5] })
  })

  it('AssignRoles_Shuffle_AllPlayersHaveRole', async () => {
    // arrange
    // act
    qm.assignRoles()

    // assert
    expect(qm.players.every((x) => x.role !== undefined)).toBe(true)
  })

  it('NextTurn_WithRejection_QuestAndRejectedCountUpdated', async () => {
    // arrange
    qm.currentQuest = 1
    qm.currentRejectedCount = 3

    // act
    qm.nextTurn()

    // assert
    expect(qm.currentQuest).toBe(2)
    expect(qm.currentRejectedCount).toBe(0)
  })

  it('Vote_WithMoreRejection_Rejected', async () => {
    // arrange
    const tokens = [true, true, false, false, false]

    // act
    const success = qm.vote(tokens)

    // assert
    expect(success).toBe(false)
  })

  it('Vote_WithMoreApproval_Approved', async () => {
    // arrange
    const tokens = [true, true, true, false, false]

    // act
    const success = qm.vote(tokens)

    // assert
    expect(success).toBe(true)
  })

  it('Vote_EvenVote_Rejected', async () => {
    // arrange
    const tokens = [true, true, true, false, false, false]

    // act
    const success = qm.vote(tokens)

    // assert
    expect(success).toBe(false)
  })

  it('RejectTeam_LessThanMaxRejectedCount_QuestSuccess', async () => {
    // arrange
    qm.currentRejectedCount = 3

    // act
    const questFailed = qm.rejectTeam()

    // assert
    expect(questFailed).toBe(false)
  })

  it('RejectTeam_MoreThanMaxRejectedCount_QuestFailed', async () => {
    // arrange
    qm.currentRejectedCount = 4

    // act
    const questFailed = qm.rejectTeam()

    // assert
    expect(questFailed).toBe(true)
  })

  it('Embark_WithoutFailAttempt_QuestSuccess', async () => {
    // arrange
    const tokens = [true, true, true, true, true]

    // act
    const questSuccess = qm.embark(tokens)

    // assert
    expect(questSuccess).toBe(true)
  })

  it('Embark_WithoutFailAttempt_QuestSuccess', async () => {
    // arrange
    const tokens = [true, true, true, true, true]

    // act
    const questSuccess = qm.embark(tokens)

    // assert
    expect(questSuccess).toBe(true)
  })

  it('Embark_WithFailAttempt_QuestFailed', async () => {
    // arrange
    const tokens = [true, true, true, true, false]

    // act
    const questSuccess = qm.embark(tokens)

    // assert
    expect(questSuccess).toBe(false)
  })

  it('Embark_7PlayersMisson4With1FailAttempt_QuestSuccess', async () => {
    // arrange
    const player6 = new Player('player006', false)
    const player7 = new Player('player007', false)
    qm.players.push(player6)
    qm.players.push(player7)

    const tokens = [true, true, true, true, true, true, false]

    // act
    const questSuccess = qm.embark(tokens)

    // assert
    expect(questSuccess).toBe(false)
  })

  it('Embark_7PlayersMisson4With2FailAttempts_QuestFailed', async () => {
    // arrange
    const player6 = new Player('player006', false)
    const player7 = new Player('player007', false)
    qm.players.push(player6)
    qm.players.push(player7)

    const tokens = [true, true, true, true, true, true, false]

    // act
    const questSuccess = qm.embark(tokens)

    // assert
    expect(questSuccess).toBe(false)
  })

  it('Evaluate_QuestSuccess_QuestSuccessCountIncreased', async () => {
    // arrange
    qm.questSuccess = 0
    const isQuestSuccess = true

    // act
    qm.evaluate(isQuestSuccess)

    // assert
    expect(qm.questSuccess).toBe(1)
  })

  it('Evaluate_QuestFail_QuestFailedCountIncreased', async () => {
    // arrange
    qm.questFailed = 0
    const isQuestSuccess = false

    // act
    qm.evaluate(isQuestSuccess)

    // assert
    expect(qm.questFailed).toBe(1)
  })

  it('Endgame_GameNotYetFinishedWithMoreQuestSuccess_GoodWon', async () => {
    // arrange
    qm.currentQuest = 4
    qm.questSuccess = 3
    qm.questFailed = 1

    // act
    const [gameFinished, winner] = qm.endGame()

    // assert
    expect(gameFinished).toBe(false)
    expect(winner).toBe('good')
  })

  it('Endgame_GameNotYetFinishedWithMoreQuestFailed_EvilWon', async () => {
    // arrange
    qm.currentQuest = 4
    qm.questSuccess = 1
    qm.questFailed = 3

    // act
    const [gameFinished, winner] = qm.endGame()

    // assert
    expect(gameFinished).toBe(false)
    expect(winner).toBe('evil')
  })

  it('Endgame_EvenScore_NoWinnerYet', async () => {
    // arrange
    qm.currentQuest = 4
    qm.questSuccess = 2
    qm.questFailed = 2

    // act
    const [gameFinished, winner] = qm.endGame()

    // assert
    expect(gameFinished).toBe(false)
    expect(winner).toBe(undefined)
  })

  it('Endgame_GameFinishedWithMoreQuestSuccess_GoodWon', async () => {
    // arrange
    qm.currentQuest = 5
    qm.questSuccess = 3
    qm.questFailed = 2

    // act
    const [gameFinished, winner] = qm.endGame()

    // assert
    expect(gameFinished).toBe(true)
    expect(winner).toBe('good')
  })
})
