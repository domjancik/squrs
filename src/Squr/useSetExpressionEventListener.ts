import { useEffect } from "react";
import { eval as evalExpr, parse } from "expression-eval";
import { SetExpressionEventDetail } from "./events/SetExpressionEventDetail";
import ContentProps from "./ContentProps";

function useSetExpressionEventListener(setExpression: (expr: string) => void, variables: ContentProps['variables'] = {}) {
  useEffect(() => {
    const listener = (e: Event) => {
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
}

export default useSetExpressionEventListener