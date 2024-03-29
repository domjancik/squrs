/**
 * Sin function normalized to 0-1 cycle input, 0-1 return
 */
const normalizedSin = (x: number) => Math.sin(x * Math.PI * 2) / 2 + 0.5

/**
 * input is period
 */
// const timeSin = TODO

const normalizedTriangle = (x: number) =>
  x % 1 < 0.5 ? (x % 1) * 2 : 1 - ((x % 1) - 0.5) * 2

const normalizedSquare = (x: number, phase: number = 0.5) =>
  x % 1 > phase ? 1 : 0

const invert = (x: number) => 1 - x

const lerp = (from: number, to: number, alpha: number = 0.5) =>
  from * invert(alpha) + to * alpha

const normalizedStep = (position: number, ...steps: number[]) => {
  const len = steps.length
  const pos = Math.floor(position * len) % len
  return steps[pos]
}

export {
  normalizedSin,
  normalizedTriangle,
  normalizedSquare,
  invert,
  lerp,
  normalizedStep,
}
