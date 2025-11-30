export function shuffle<T>(array: T[]): T[] {
  const result = [...array] // avoid mutating the original

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)) // random index
    ;[result[i], result[j]] = [result[j], result[i]] // swap
  }

  return result
}
