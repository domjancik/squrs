import { INSTRUMENTS } from "./instruments";

const DEFAULT_EXPRESSION = "sin(t)";
const DEFAULT_LOGIC = Object.keys(INSTRUMENTS)[0];
const DEFAULT_VIEW = Object.keys(INSTRUMENTS)[0];

const getSqurKey = (logic = "logic", view = "view") => `${logic}-${view}`;

export { DEFAULT_EXPRESSION, DEFAULT_LOGIC, DEFAULT_VIEW, getSqurKey };
