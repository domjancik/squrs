import React from "react";
import Button from "../../Button/Button";
import ContentProps from "../ContentProps";
import { INSTRUMENTS } from "../instruments";

function InstrumentSelection({ setLogic, setView }: ContentProps) {
  const setLogicAndView = (instrumentName: string) => {
    setLogic && setLogic(instrumentName);
    setView && setView(instrumentName);
  };
  return Object.keys(INSTRUMENTS).map((instrumentName) => (
    <Button
      key={instrumentName}
      onClick={() => setLogicAndView(instrumentName)}
    >
      {instrumentName}
    </Button>
  ));
}

export default InstrumentSelection;
