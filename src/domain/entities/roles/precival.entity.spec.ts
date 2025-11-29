import { Assassin } from './assassin.entity'
import { Merlin } from './merlin.entity'
import { Minion } from './minion.entity'
import { Mordred } from './mordred.entity'
import { Morgana } from './morgana.entity'
import { Oberon } from './oberon.entity'
import { Percival } from './percival.entity'
import { Servant } from './servant.entity'

describe('Percival', () => {
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

  it('Constructor_Faction_Good', async () => {
    // arrange
    // act
    // assert
    expect(percival.faction).toBe('good')
  })

  it('View_WithoutMorgana_OnlyMerlin', async () => {
    // arrange
    const roles = [merlin, percival, servant, assassin, minion, oberon]

    // act
    const viewed = percival.view(roles)

    // assert
    expect(viewed).toHaveLength(1)
    expect(viewed.some((x) => x instanceof Merlin)).toBe(true)
  })

  it('View_WithMorgana_MerlinAndMorgana', async () => {
    // arrange
    const roles = [merlin, percival, servant, assassin, minion, mordred, morgana, oberon]
    expect(roles.some((x) => x instanceof Morgana)).toBe(true)

    // act
    const viewed = percival.view(roles)

    // assert
    expect(viewed).toHaveLength(2)
    expect(viewed.some((x) => x instanceof Merlin || x instanceof Morgana)).toBe(true)
  })
})
