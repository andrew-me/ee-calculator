import { useState } from "react";
import styles from "./App.module.css";
import logo from "./equal-experts-logo.png";

type CalculatorNumber =
  | "0"
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9";

type Operator = "+" | "-" | "*" | "/";

type ExpressionItem = number | Operator;

function App() {
  const maxNumLength = 14;
  const [numStr, setNumStr] = useState("");
  const [expressionItems, setExpressionItems] = useState<ExpressionItem[]>([]);

  const lastExpressionItem = expressionItems[expressionItems.length - 1];
  const lastNumber = expressionItems
    .filter((item) => typeof item === "number")
    .reverse()[0];
  const isLastAnOperator = typeof lastExpressionItem === "string";
  const isLastANumber = typeof lastExpressionItem === "number";

  const display: string = numStr.length
    ? numStr
    : lastNumber !== undefined
    ? lastNumber.toString()
    : "0";

  function handleNumber(newNumber: CalculatorNumber) {
    if (numStr.length === maxNumLength) {
      return;
    }

    if (isLastANumber) {
      setExpressionItems([]);
    }

    if (numStr === "" || numStr === "0") {
      setNumStr(newNumber);
    } else if (numStr === "-0") {
      setNumStr("-" + newNumber);
    } else {
      setNumStr(numStr + newNumber);
    }
  }

  function handlePoint() {
    if (numStr.length === maxNumLength) {
      return;
    }

    if (numStr.includes(".")) {
      return;
    }

    if (isLastANumber) {
      setExpressionItems([]);
    }

    setNumStr((numStr === "" ? "0" : numStr) + ".");
  }

  function handleSign() {
    const isNegative = numStr[0] === "-";

    if (!isNegative && numStr.length === maxNumLength) {
      return;
    }

    if (isLastANumber) {
      setExpressionItems([]);
    }

    if (isNegative) {
      setNumStr(numStr.slice(1));
    } else {
      setNumStr("-" + (numStr === "" ? "0" : numStr));
    }
  }

  function handleOperator(newOperator: Operator) {
    if (numStr === "") {
      if (expressionItems.length === 0) {
        setExpressionItems([0, newOperator]);
      } else if (isLastAnOperator) {
        setExpressionItems([...expressionItems.slice(0, -1), newOperator]);
      } else {
        setExpressionItems([...expressionItems, newOperator]);
      }
    } else {
      setExpressionItems([...expressionItems, Number(numStr), newOperator]);
      setNumStr("");
    }
  }

  function handleEquals() {
    if (numStr !== "") {
      const number = Number(numStr);

      if (Number.isNaN(number)) {
        reset();
        return;
      }

      const evaluated: number = eval([...expressionItems, number].join(""));
      const result = Number(evaluated.toFixed(5));

      if (result.toString().length > maxNumLength) {
        reset();
        return;
      }

      setNumStr("");
      setExpressionItems([result]);
    }
  }

  function reset() {
    setNumStr("");
    setExpressionItems([]);
  }

  return (
    <div className={styles.app}>
      <h1 className="sr-only">Calculator</h1>
      <div className={styles.calculator}>
        <div className={styles.header}>
          <img className={styles.logo} src={logo} alt="Equal Experts Logo" />
        </div>
        <div className={styles.main}>
          <div role="status" className={styles.display}>
            {display}
          </div>
          <div className={styles.columns}>
            <div className={styles.col1}>
              <div className={styles.reset}>
                <Button onClick={reset}>AC</Button>
              </div>

              <div className={styles.numbers}>
                <Button onClick={handlePoint}>.</Button>
                <Button onClick={handleSign}>+/-</Button>
                <Button onClick={() => handleNumber("0")}>0</Button>
                <Button onClick={() => handleNumber("1")}>1</Button>
                <Button onClick={() => handleNumber("2")}>2</Button>
                <Button onClick={() => handleNumber("3")}>3</Button>
                <Button onClick={() => handleNumber("4")}>4</Button>
                <Button onClick={() => handleNumber("5")}>5</Button>
                <Button onClick={() => handleNumber("6")}>6</Button>
                <Button onClick={() => handleNumber("7")}>7</Button>
                <Button onClick={() => handleNumber("8")}>8</Button>
                <Button onClick={() => handleNumber("9")}>9</Button>
              </div>
            </div>
            <div className={styles.col2}>
              <div className={styles.operators}>
                <Button
                  onClick={() => handleOperator("/")}
                  pressed={lastExpressionItem === "/"}
                >
                  /
                </Button>
                <Button
                  onClick={() => handleOperator("*")}
                  pressed={lastExpressionItem === "*"}
                >
                  *
                </Button>
                <Button
                  onClick={() => handleOperator("-")}
                  pressed={lastExpressionItem === "-"}
                >
                  -
                </Button>
                <Button
                  onClick={() => handleOperator("+")}
                  pressed={lastExpressionItem === "+"}
                >
                  +
                </Button>
                <Button onClick={handleEquals}>=</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Button({
  pressed,
  onClick,
  children,
}: {
  pressed?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button className={styles.button} onClick={onClick} aria-pressed={pressed}>
      {children}
    </button>
  );
}

export default App;
