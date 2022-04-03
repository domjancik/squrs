import ContentProps from "../../ContentProps";
import { INSTRUMENTS } from "../../instruments";
import { MenuItem } from "./menu";

function useInstrumentMenuItem({ setView, setLogic }: ContentProps): MenuItem {
  const setLogicAndView = (instrumentName: string) => {
    setLogic && setLogic(instrumentName);
    setView && setView(instrumentName);
  };

  const instruments = Object.keys(INSTRUMENTS).map((instrumentName) => ({
    title: instrumentName,
    action: () => setLogicAndView(instrumentName),
  }));

  return {
    title: "Instruments",
    children: instruments
  }
}

export default useInstrumentMenuItem;
