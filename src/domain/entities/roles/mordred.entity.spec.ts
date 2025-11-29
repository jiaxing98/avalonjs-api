import { Assassin } from './assassin.entity'
import { Merlin } from './merlin.entity'
import { Minion } from './minion.entity'
import { Mordred } from './mordred.entity'
import { Morgana } from './morgana.entity'
import { Oberon } from './oberon.entity'
import { Percival } from './percival.entity'
import { Servant } from './servant.entity'

describe('Mordred', () => {
  let merlin: Merlin
  let percival: Percival
  let servant: Servant

  let assassin: Assassin
  let minion: Minion
  let mordred: Mordred
  let morgana: Morgana
  let oberon: Oberon

  beforeEach(async () => {
    merlin = new Merlin()
    percival = new Percival()
    servant = new Servant()

    assassin = new Assassin()
    minion = new Minion()
    mordred = new Mordred()
    morgana = new Morgana()
    oberon = new Oberon()
  })

  it('Constructor_Faction_Evil', async () => {
    // arrange
    // act
    // assert
    expect(mordred.faction).toBe('evil')
  })

  it('View_WithoutOberon_AllRolesFromEvilFaction', async () => {
    // arrange
    const roles = [merlin, percival, servant, assassin, minion, mordred, morgana]
    // act
    const viewed = mordred.view(roles)

    // assert
    expect(viewed).toHaveLength(3)
    expect(viewed.every((x) => x.faction === 'evil')).toBe(true)
  })

  it('View_WithOberon_AllEvilRolesExcludedMordred', async () => {
    // arrange
    const roles = [merlin, percival, servant, assassin, minion, mordred, morgana, oberon]
    expect(roles.some((x) => x instanceof Oberon)).toBe(true)

    // act
    const viewed = mordred.view(roles)

    // assert
    expect(viewed).toHaveLength(3)
    expect(viewed.every((x) => x.faction === 'evil')).toBe(true)
  })
})
