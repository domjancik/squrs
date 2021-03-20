import { ReactElement } from "react"
import ContentProps from "../ContentProps"
import { ExpressionHookFunction } from '../types'
import ExpressionContent from "./Expression/ExpressionContent"
import useExpressionWithSound from "./Expression/useExpressionWithSound"
import SequencerContent from "./Sequencer/SequencerContent"
import useExpressionSequencer from "./Sequencer/useExpressionSequencer"

type Instrument = {
    view: (props: ContentProps) => ReactElement,
    logic: ExpressionHookFunction
}

const INSTRUMENTS: { [name: string]: Instrument} = {
    gridseq: {
        view: SequencerContent,
        logic: useExpressionSequencer
    },
    expsyn: {
        view: ExpressionContent,
        logic: useExpressionWithSound
    }
}

export { INSTRUMENTS }