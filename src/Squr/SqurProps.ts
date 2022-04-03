import { ContentElement, ExpressionHookFunction } from "./types";

interface SqurProps {
  expression?: string;
  setExpression?: (val: string) => void;
  logic?: string;
  setLogic?: (val: string) => void;
  view?: string;
  setView?: (val: string) => void;
  side?: number | string;
  /**
   * Initial expression
   */
  init?: string;
  variables?: { [key: string]: number };
  contentComponent?: ContentElement;
  useExpressionHook?: ExpressionHookFunction;
}

export default SqurProps;
