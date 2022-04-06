import * as Tone from 'tone'

interface ScaleWindow extends Window {
  sqursSetScale: (index: number) => void
  sqursListScales: () => void
}

declare let window: ScaleWindow

const C = 'C'
const D = 'D'
const E = 'E'
const Eb = 'Eb'
const F = 'F'
const G = 'G'
const A = 'A'
const Ab = 'Ab'
const B = 'B'
const Bb = 'Bb'
const Db = 'Db'
const Gb = 'Gb'

const SCALE_5_MAJOR_PENTATONIC = [C, D, E, G, A]
const SCALE_5_EGYPTIAN_SUSPENDED = [C, D, F, G, Bb]
const SCALE_5_BLUES_MINOR_MAN_GONG = [C, Eb, F, Ab, Bb]
const SCALE_5_BLUES_MAJOR_RITSUSEN = [C, D, F, G, A]
const SCALE_5_MINOR_PENTATONIC = [C, Eb, F, G, Bb]
const SCALE_4_TONEJS_SEQUENCER_EXAMPLE = [A, Db, E, Gb]

type ScaleItem = {
  title: string
  notes: string[]
}
const SCALES: ScaleItem[] = [
  {
    title: 'Major Pentatonic (5)',
    notes: SCALE_5_MAJOR_PENTATONIC,
  },
  {
    title: 'Egyptian Suspended (5)',
    notes: SCALE_5_EGYPTIAN_SUSPENDED,
  },
  {
    title: 'Blues Major Ritsusen (5)',
    notes: SCALE_5_BLUES_MAJOR_RITSUSEN,
  },
  {
    title: 'Blues Minor Man Gong (5)',
    notes: SCALE_5_BLUES_MINOR_MAN_GONG,
  },
  {
    title: 'Blues Minor Pentatonic (5)',
    notes: SCALE_5_MINOR_PENTATONIC,
  },
  {
    title: 'ToneJS Sequencer Example (4)',
    notes: SCALE_4_TONEJS_SEQUENCER_EXAMPLE,
  },
]

let notes = SCALE_5_BLUES_MAJOR_RITSUSEN

window.sqursSetScale = (index: number) => {
  const scale = SCALES[index % SCALES.length]
  console.log(`Changing to scale ${scale.title}`)
  notes = scale.notes
}

window.sqursListScales = () => {
  SCALES.forEach(({ title, notes }, index) =>
    console.log(`${index}: ${title} - ${notes}`)
  )
}

const getNote = (i: number) => {
  const note = notes[i % notes.length]
  const octave = Math.floor(i / notes.length)
  return `${note}${octave + 3}`
}

const getNoteFrequency = (i: number) => Tone.Frequency(getNote(i)).toFrequency()

export { getNote, getNoteFrequency }
