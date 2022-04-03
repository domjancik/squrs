/**
 *
 *       * ******* *
 *       *         *
 *       *   .5    *
 *       *         *
 *       * ******* *
 *
 */

//useAnimationFrame((time) => {setDimmer(state => (state + time / 1000) % 1)})

// TODO multiple preset animations
// TODO beat sync
// TODO rounded corners
// TODO expression evaluation
// TODO saving expression as preset
// TODO persisting presets
// TODO live sync of presets / selection (fbase realtime db?)
// TODO support 2x not just 2*x
// TODO input bg on focus
// TODO shared globals (exposed to users)
// TODO graph display
// TODO deterministic noise functions
// TODO splittable squrs
// TODO keyboard func ~ key.a / key('a') / variable for few special keys / gamepad
// TODO ...

/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { eval as evalExpr, parse } from "expression-eval";

import React, { ReactElement, useEffect, useState } from "react";
import EmptySqur from "./EmptySqur";
import ExpressionContent from "./instruments/Expression/ExpressionContent";
import SqurProps from "./SqurProps";
import useExpressionWithSound from "./instruments/Expression/useExpressionWithSound";
import setExpression from "./events/setExpression";
import { SetExpressionEventDetail } from "./events/SetExpressionEventDetail";
import { INSTRUMENTS } from "./instruments";
import useFlipside from "./flipside/useFlipside";
import Button from "../Button/Button";

// const COLOR = '#72dec2'
// const COLOR_RGB = '114, 222, 194'
// const COLOR_RGB = '255, 0, 255'
const COLOR_RGB = "170, 187, 204";

// const com = (a: any[]) => a.map(e => e.toString()).join(',')

// const dim = (val: number) => {
//     const v = val * 255
//     return {background: `rgb(${com([v, v, v])})`}
// }

const trns = (a: number) => ({ background: `rgba(${COLOR_RGB}, ${a})` });
const black = (a: number) => ({ background: `rgba(0,0,0, ${a})` });

// TODO toggle type information

// const handleTouch = <T extends unknown>(set: React.Dispatch<T>, off: T, on: T): {[key: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>]: Function} => ({
const handleTouch = <T extends unknown>(
  current: T,
  set: React.Dispatch<T>,
  off: T,
  on: T
) => ({
  // onTouchStart: () => set(on),
  onTouchStart: () => (current === on ? set(off) : set(on)),
  // onTouchStart: () => console.log(on),
  // onClick: () => console.log(on),
  // onTouchEnd: () => set(off),
  // onTouchEnd: () => console.log(off),
});

const safeInvoke = <T extends unknown>(f?: () => T) => (f ? f() : undefined);

const cloneToAll = (element: HTMLElement, expression: string) => {
  setExpression(expression, undefined, element);
};

const cloneToColumn = (
  element: HTMLElement,
  expression: string,
  column: number
) => {
  setExpression(expression, `x === ${column}`, element);
};

function useExternalIfDefined<T>(
  init: T,
  external?: T,
  setExternal?: (value: T) => void
): [T, (value: T) => void] {
  const [internal, setInternal] = useState(init);
  const value = external ?? internal;
  const setValue = setExternal ?? setInternal;

  return [value, setValue];
}

const cssFlipButton = css`
  width: calc(100% - 1.3em);
  position: absolute;
  bottom: 0.9em;
  left: 0.6em;
  font-size: 0.25em;
`

function Squr({
  init,
  side = 100,
  expression: expressionExternal,
  setExpression: setExpressionExternal,
  variables = {},
  contentComponent,
  useExpressionHook: useExpressionHookExternal,
  logic: logicExternal,
  setLogic: setLogicExternal,
  view: viewExternal,
  setView: setViewExternal,
}: SqurProps): ReactElement {
  const [expression, setExpression] = useExternalIfDefined(
    "0",
    expressionExternal,
    setExpressionExternal
  );
  const [logic, setLogic] = useExternalIfDefined(
    "expsyn",
    logicExternal,
    setLogicExternal
  );
  const [view, setView] = useExternalIfDefined(
    "expsyn",
    viewExternal,
    setViewExternal
  );

  const { logic: useLogic } = INSTRUMENTS[logic];
  const { view: View } = INSTRUMENTS[view];

  const BaseComponent = contentComponent ?? View;
  const {ContentComponent, handleFlip} = useFlipside(BaseComponent)

  // TODO useTouch
  const useExpressionHook = useExpressionHookExternal ?? useLogic;

  const {
    res: resBase,
    error,
    extra,
  } = useExpressionHook(expression, setExpression, variables);
  const [touching, setTouching] = useState(1);

  const res = resBase;
  const fontColor = res * touching < 0.5 ? "#abc" : "#444";
  const palette = res * touching > 0 ? trns(res) : black(-res);

  useEffect(() => {
    const listener = (e: Event) => {
      // TODO condition evaluation
      const setExpressionEvent = e as CustomEvent<SetExpressionEventDetail>;

      const { condition, expression } = setExpressionEvent.detail;

      if (!condition || evalExpr(parse(condition), variables)) {
        setExpression(expression);
      }
    };
    window.addEventListener("setExpression", listener);

    return () => {
      window.removeEventListener("setExpression", listener);
    };
  }, [setExpression, variables]);

  // const handleContextMenu: React.MouseEventHandler<HTMLDivElement> = (e) => {
  // e.preventDefault()
  // TODO dispatch from current element -> forward ref on EmptySqur
  // cloneToAll(document.body, expression)
  // cloneToColumn(document.body, expression, variables.x)
  // }

  return (
    <EmptySqur
      palette={palette}
      side={side}
      {...handleTouch(touching, setTouching, 0, 1)}
    >
      <ContentComponent
        side={side}
        expression={expression}
        setExpression={setExpression}
        res={res}
        fontColor={fontColor}
        variables={variables}
        error={error}
        logic={logic}
        setLogic={setLogic}
        view={view}
        setView={setView}
        extra={extra}
      />
      <Button css={cssFlipButton} onClick={handleFlip}>flip</Button>
    </EmptySqur>
  );
}

export default Squr;
