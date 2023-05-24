import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

test("should render the calculator page", () => {
  render(<App />);

  const header = screen.getByRole("heading", { level: 1 });

  expect(header).toHaveTextContent("Calculator");
});

test("Result should default to '0'", async () => {
  render(<App />);

  const result = screen.getByRole("status");

  expect(result.textContent).toBe("0");
});

test("clicking all number buttons should display '1234567890'", async () => {
  const user = userEvent.setup();
  render(<App />);

  await user.click(screen.getByRole("button", { name: "1" }));
  await user.click(screen.getByRole("button", { name: "2" }));
  await user.click(screen.getByRole("button", { name: "3" }));
  await user.click(screen.getByRole("button", { name: "4" }));
  await user.click(screen.getByRole("button", { name: "5" }));
  await user.click(screen.getByRole("button", { name: "6" }));
  await user.click(screen.getByRole("button", { name: "7" }));
  await user.click(screen.getByRole("button", { name: "8" }));
  await user.click(screen.getByRole("button", { name: "9" }));
  await user.click(screen.getByRole("button", { name: "0" }));

  expect(screen.getByRole("status").textContent).toBe("1234567890");
});

test("0 should be removed from the start of integers", async () => {
  const user = userEvent.setup();
  render(<App />);

  expect(screen.getByRole("status").textContent).toBe("0");

  await user.click(screen.getByRole("button", { name: "1" }));

  expect(screen.getByRole("status").textContent).toBe("1");
});

test("-0 should be removed from the start of integers", async () => {
  const user = userEvent.setup();
  render(<App />);

  await user.click(screen.getByRole("button", { name: "+/-" }));

  expect(screen.getByRole("status").textContent).toBe("-0");

  await user.click(screen.getByRole("button", { name: "1" }));

  expect(screen.getByRole("status").textContent).toBe("-1");
});

test("multiple 0 should not be allowed at the start of integers", async () => {
  const user = userEvent.setup();
  render(<App />);

  await user.click(screen.getByRole("button", { name: "0" }));
  await user.click(screen.getByRole("button", { name: "0" }));
  await user.click(screen.getByRole("button", { name: "1" }));

  expect(screen.getByRole("status").textContent).toBe("1");
});

test("multiple 0 should not be allowed at the start of negative integers", async () => {
  const user = userEvent.setup();
  render(<App />);

  await user.click(screen.getByRole("button", { name: "+/-" }));

  expect(screen.getByRole("status").textContent).toBe("-0");

  await user.click(screen.getByRole("button", { name: "0" }));
  await user.click(screen.getByRole("button", { name: "0" }));
  await user.click(screen.getByRole("button", { name: "1" }));

  expect(screen.getByRole("status").textContent).toBe("-1");
});

test("a decimal point can be added", async () => {
  const user = userEvent.setup();
  render(<App />);

  await user.click(screen.getByRole("button", { name: "0" }));
  await user.click(screen.getByRole("button", { name: "." }));
  await user.click(screen.getByRole("button", { name: "0" }));
  await user.click(screen.getByRole("button", { name: "1" }));

  expect(screen.getByRole("status").textContent).toBe("0.01");
});

test("only one decimal point can be added", async () => {
  const user = userEvent.setup();
  render(<App />);

  await user.click(screen.getByRole("button", { name: "0" }));
  await user.click(screen.getByRole("button", { name: "." }));
  await user.click(screen.getByRole("button", { name: "0" }));
  await user.click(screen.getByRole("button", { name: "." }));
  await user.click(screen.getByRole("button", { name: "1" }));

  expect(screen.getByRole("status").textContent).toBe("0.01");
});

test("positive numbers can be made negative", async () => {
  const user = userEvent.setup();
  render(<App />);

  await user.click(screen.getByRole("button", { name: "+/-" }));

  expect(screen.getByRole("status").textContent).toBe("-0");
});

test("negative numbers can be made positive", async () => {
  const user = userEvent.setup();
  render(<App />);

  await user.click(screen.getByRole("button", { name: "+/-" }));

  expect(screen.getByRole("status").textContent).toBe("-0");

  await user.click(screen.getByRole("button", { name: "+/-" }));

  expect(screen.getByRole("status").textContent).toBe("0");
});

test("numbers can be toggled +/- after being added", async () => {
  const user = userEvent.setup();
  render(<App />);

  await user.click(screen.getByRole("button", { name: "1" }));
  await user.click(screen.getByRole("button", { name: "2" }));

  expect(screen.getByRole("status").textContent).toBe("12");

  await user.click(screen.getByRole("button", { name: "+/-" }));

  expect(screen.getByRole("status").textContent).toBe("-12");

  await user.click(screen.getByRole("button", { name: "+/-" }));

  expect(screen.getByRole("status").textContent).toBe("12");
});

test("clicking operator buttons activates them", async () => {
  const user = userEvent.setup();
  render(<App />);

  expect(screen.getByRole("button", { name: "+" })).toHaveAttribute(
    "aria-pressed",
    "false"
  );

  await user.click(screen.getByRole("button", { name: "+" }));

  expect(screen.getByRole("button", { name: "+" })).toHaveAttribute(
    "aria-pressed",
    "true"
  );

  await user.click(screen.getByRole("button", { name: "-" }));

  expect(screen.getByRole("button", { name: "+" })).toHaveAttribute(
    "aria-pressed",
    "false"
  );

  expect(screen.getByRole("button", { name: "-" })).toHaveAttribute(
    "aria-pressed",
    "true"
  );
});

test("a new number can be created after clicking '+'", async () => {
  const user = userEvent.setup();
  render(<App />);

  await user.click(screen.getByRole("button", { name: "1" }));
  await user.click(screen.getByRole("button", { name: "+" }));

  expect(screen.getByRole("status").textContent).toBe("1");

  await user.click(screen.getByRole("button", { name: "2" }));

  expect(screen.getByRole("status").textContent).toBe("2");
});

test("a new number can be created after clicking '='", async () => {
  const user = userEvent.setup();
  render(<App />);

  await user.click(screen.getByRole("button", { name: "1" }));
  await user.click(screen.getByRole("button", { name: "+" }));
  await user.click(screen.getByRole("button", { name: "1" }));
  await user.click(screen.getByRole("button", { name: "=" }));

  expect(screen.getByRole("status").textContent).toBe("2");

  await user.click(screen.getByRole("button", { name: "1" }));
  await user.click(screen.getByRole("button", { name: "=" }));

  expect(screen.getByRole("status").textContent).toBe("1");
});

test("clicking '.' is handled after clicking +", async () => {
  const user = userEvent.setup();
  render(<App />);

  await user.click(screen.getByRole("button", { name: "1" }));
  await user.click(screen.getByRole("button", { name: "+" }));

  expect(screen.getByRole("status").textContent).toBe("1");

  await user.click(screen.getByRole("button", { name: "." }));

  expect(screen.getByRole("status").textContent).toBe("0.");
});

test("clicking '.' is handled after clicking =", async () => {
  const user = userEvent.setup();
  render(<App />);

  await user.click(screen.getByRole("button", { name: "1" }));
  await user.click(screen.getByRole("button", { name: "+" }));
  await user.click(screen.getByRole("button", { name: "1" }));
  await user.click(screen.getByRole("button", { name: "=" }));

  expect(screen.getByRole("status").textContent).toBe("2");

  await user.click(screen.getByRole("button", { name: "." }));

  expect(screen.getByRole("status").textContent).toBe("0.");
});

test("a new number can be created via '.' after clicking '='", async () => {
  const user = userEvent.setup();
  render(<App />);

  await user.click(screen.getByRole("button", { name: "1" }));
  await user.click(screen.getByRole("button", { name: "+" }));
  await user.click(screen.getByRole("button", { name: "1" }));
  await user.click(screen.getByRole("button", { name: "=" }));

  expect(screen.getByRole("status").textContent).toBe("2");

  await user.click(screen.getByRole("button", { name: "." }));
  await user.click(screen.getByRole("button", { name: "=" }));

  expect(screen.getByRole("status").textContent).toBe("0");
});

test("clicking '+/-' is handled after clicking +", async () => {
  const user = userEvent.setup();
  render(<App />);

  await user.click(screen.getByRole("button", { name: "1" }));
  await user.click(screen.getByRole("button", { name: "+" }));

  expect(screen.getByRole("status").textContent).toBe("1");

  await user.click(screen.getByRole("button", { name: "+/-" }));

  expect(screen.getByRole("status").textContent).toBe("-0");
});

test("a new number can be created via '+/-' after clicking '='", async () => {
  const user = userEvent.setup();
  render(<App />);

  await user.click(screen.getByRole("button", { name: "1" }));
  await user.click(screen.getByRole("button", { name: "+" }));
  await user.click(screen.getByRole("button", { name: "1" }));
  await user.click(screen.getByRole("button", { name: "=" }));

  expect(screen.getByRole("status").textContent).toBe("2");

  await user.click(screen.getByRole("button", { name: "+/-" }));

  expect(screen.getByRole("status").textContent).toBe("-0");

  await user.click(screen.getByRole("button", { name: "=" }));

  expect(screen.getByRole("status").textContent).toBe("0");
});

test("two numbers can be added", async () => {
  const user = userEvent.setup();
  render(<App />);

  await user.click(screen.getByRole("button", { name: "1" }));
  await user.click(screen.getByRole("button", { name: "+" }));
  await user.click(screen.getByRole("button", { name: "2" }));
  await user.click(screen.getByRole("button", { name: "=" }));

  expect(screen.getByRole("status").textContent).toBe("3");
});

test("two numbers can be subtracted", async () => {
  const user = userEvent.setup();
  render(<App />);

  await user.click(screen.getByRole("button", { name: "1" }));
  await user.click(screen.getByRole("button", { name: "-" }));
  await user.click(screen.getByRole("button", { name: "2" }));
  await user.click(screen.getByRole("button", { name: "=" }));

  expect(screen.getByRole("status").textContent).toBe("-1");
});

test("two numbers can be multiplied", async () => {
  const user = userEvent.setup();
  render(<App />);

  await user.click(screen.getByRole("button", { name: "3" }));
  await user.click(screen.getByRole("button", { name: "*" }));
  await user.click(screen.getByRole("button", { name: "4" }));
  await user.click(screen.getByRole("button", { name: "=" }));

  expect(screen.getByRole("status").textContent).toBe("12");
});

test("two numbers can be divided", async () => {
  const user = userEvent.setup();
  render(<App />);

  await user.click(screen.getByRole("button", { name: "6" }));
  await user.click(screen.getByRole("button", { name: "/" }));
  await user.click(screen.getByRole("button", { name: "3" }));
  await user.click(screen.getByRole("button", { name: "=" }));

  expect(screen.getByRole("status").textContent).toBe("2");
});

test("operators can be changed", async () => {
  const user = userEvent.setup();
  render(<App />);

  await user.click(screen.getByRole("button", { name: "6" }));
  await user.click(screen.getByRole("button", { name: "+" }));
  await user.click(screen.getByRole("button", { name: "/" }));
  await user.click(screen.getByRole("button", { name: "3" }));
  await user.click(screen.getByRole("button", { name: "=" }));

  expect(screen.getByRole("status").textContent).toBe("2");
});

test("calculations can be chained", async () => {
  const user = userEvent.setup();
  render(<App />);

  await user.click(screen.getByRole("button", { name: "1" }));
  await user.click(screen.getByRole("button", { name: "+" }));
  await user.click(screen.getByRole("button", { name: "5" }));
  await user.click(screen.getByRole("button", { name: "-" }));
  await user.click(screen.getByRole("button", { name: "3" }));
  await user.click(screen.getByRole("button", { name: "*" }));
  await user.click(screen.getByRole("button", { name: "6" }));
  await user.click(screen.getByRole("button", { name: "/" }));
  await user.click(screen.getByRole("button", { name: "2" }));
  await user.click(screen.getByRole("button", { name: "=" }));

  expect(screen.getByRole("status").textContent).toBe("-3");
});

test("results can be chained", async () => {
  const user = userEvent.setup();
  render(<App />);

  await user.click(screen.getByRole("button", { name: "1" }));
  await user.click(screen.getByRole("button", { name: "+" }));
  await user.click(screen.getByRole("button", { name: "5" }));
  await user.click(screen.getByRole("button", { name: "=" }));
  await user.click(screen.getByRole("button", { name: "*" }));
  await user.click(screen.getByRole("button", { name: "6" }));
  await user.click(screen.getByRole("button", { name: "=" }));

  expect(screen.getByRole("status").textContent).toBe("36");
});

test("should reset when button 'AC' is clicked", async () => {
  const user = userEvent.setup();
  render(<App />);

  await user.click(screen.getByRole("button", { name: "1" }));
  await user.click(screen.getByRole("button", { name: "+" }));
  await user.click(screen.getByRole("button", { name: "5" }));
  await user.click(screen.getByRole("button", { name: "=" }));

  expect(screen.getByRole("status").textContent).toBe("6");

  await user.click(screen.getByRole("button", { name: "AC" }));

  expect(screen.getByRole("status").textContent).toBe("0");
});

test("equals can only be used if there is a final number", async () => {
  const user = userEvent.setup();
  render(<App />);

  await user.click(screen.getByRole("button", { name: "6" }));
  await user.click(screen.getByRole("button", { name: "/" }));
  await user.click(screen.getByRole("button", { name: "=" }));

  expect(screen.getByRole("status").textContent).toBe("6");
});

test("result stays the same with multiple =", async () => {
  const user = userEvent.setup();
  render(<App />);

  await user.click(screen.getByRole("button", { name: "6" }));
  await user.click(screen.getByRole("button", { name: "/" }));
  await user.click(screen.getByRole("button", { name: "3" }));
  await user.click(screen.getByRole("button", { name: "=" }));
  await user.click(screen.getByRole("button", { name: "=" }));

  expect(screen.getByRole("status").textContent).toBe("2");
});

test("number input after '=' resets", async () => {
  const user = userEvent.setup();
  render(<App />);

  await user.click(screen.getByRole("button", { name: "6" }));
  await user.click(screen.getByRole("button", { name: "/" }));
  await user.click(screen.getByRole("button", { name: "3" }));
  await user.click(screen.getByRole("button", { name: "=" }));

  expect(screen.getByRole("status").textContent).toBe("2");

  await user.click(screen.getByRole("button", { name: "1" }));

  expect(screen.getByRole("status").textContent).toBe("1");
});

test("can add after default 0", async () => {
  const user = userEvent.setup();
  render(<App />);

  expect(screen.getByRole("status").textContent).toBe("0");

  await user.click(screen.getByRole("button", { name: "+" }));
  await user.click(screen.getByRole("button", { name: "4" }));
  await user.click(screen.getByRole("button", { name: "=" }));

  expect(screen.getByRole("status").textContent).toBe("4");
});

test("can minus after default 0", async () => {
  const user = userEvent.setup();
  render(<App />);

  expect(screen.getByRole("status").textContent).toBe("0");

  await user.click(screen.getByRole("button", { name: "-" }));
  await user.click(screen.getByRole("button", { name: "4" }));
  await user.click(screen.getByRole("button", { name: "=" }));

  expect(screen.getByRole("status").textContent).toBe("-4");
});

test("can multiply after default 0", async () => {
  const user = userEvent.setup();
  render(<App />);

  expect(screen.getByRole("status").textContent).toBe("0");

  await user.click(screen.getByRole("button", { name: "*" }));
  await user.click(screen.getByRole("button", { name: "4" }));
  await user.click(screen.getByRole("button", { name: "=" }));

  expect(screen.getByRole("status").textContent).toBe("0");
});

test("can divide after default 0", async () => {
  const user = userEvent.setup();
  render(<App />);

  expect(screen.getByRole("status").textContent).toBe("0");

  await user.click(screen.getByRole("button", { name: "/" }));
  await user.click(screen.getByRole("button", { name: "4" }));
  await user.click(screen.getByRole("button", { name: "=" }));

  expect(screen.getByRole("status").textContent).toBe("0");
});

test("allows 14 character input", async () => {
  const user = userEvent.setup();
  render(<App />);

  await user.click(screen.getByRole("button", { name: "1" }));
  await user.click(screen.getByRole("button", { name: "2" }));
  await user.click(screen.getByRole("button", { name: "3" }));
  await user.click(screen.getByRole("button", { name: "4" }));
  await user.click(screen.getByRole("button", { name: "5" }));
  await user.click(screen.getByRole("button", { name: "6" }));
  await user.click(screen.getByRole("button", { name: "7" }));
  await user.click(screen.getByRole("button", { name: "8" }));
  await user.click(screen.getByRole("button", { name: "9" }));
  await user.click(screen.getByRole("button", { name: "0" }));
  await user.click(screen.getByRole("button", { name: "1" }));
  await user.click(screen.getByRole("button", { name: "2" }));
  await user.click(screen.getByRole("button", { name: "3" }));
  await user.click(screen.getByRole("button", { name: "4" }));

  expect(screen.getByRole("status").textContent).toBe("12345678901234");
});

test("does not allow 15 character number input", async () => {
  const user = userEvent.setup();
  render(<App />);

  await user.click(screen.getByRole("button", { name: "1" }));
  await user.click(screen.getByRole("button", { name: "2" }));
  await user.click(screen.getByRole("button", { name: "3" }));
  await user.click(screen.getByRole("button", { name: "4" }));
  await user.click(screen.getByRole("button", { name: "5" }));
  await user.click(screen.getByRole("button", { name: "6" }));
  await user.click(screen.getByRole("button", { name: "7" }));
  await user.click(screen.getByRole("button", { name: "8" }));
  await user.click(screen.getByRole("button", { name: "9" }));
  await user.click(screen.getByRole("button", { name: "0" }));
  await user.click(screen.getByRole("button", { name: "1" }));
  await user.click(screen.getByRole("button", { name: "2" }));
  await user.click(screen.getByRole("button", { name: "3" }));
  await user.click(screen.getByRole("button", { name: "4" }));
  await user.click(screen.getByRole("button", { name: "5" }));

  expect(screen.getByRole("status").textContent).toBe("12345678901234");
});

test("does not allow 15 character number input with decimal", async () => {
  const user = userEvent.setup();
  render(<App />);

  await user.click(screen.getByRole("button", { name: "1" }));
  await user.click(screen.getByRole("button", { name: "." }));
  await user.click(screen.getByRole("button", { name: "2" }));
  await user.click(screen.getByRole("button", { name: "3" }));
  await user.click(screen.getByRole("button", { name: "4" }));
  await user.click(screen.getByRole("button", { name: "5" }));
  await user.click(screen.getByRole("button", { name: "6" }));
  await user.click(screen.getByRole("button", { name: "7" }));
  await user.click(screen.getByRole("button", { name: "8" }));
  await user.click(screen.getByRole("button", { name: "9" }));
  await user.click(screen.getByRole("button", { name: "0" }));
  await user.click(screen.getByRole("button", { name: "1" }));
  await user.click(screen.getByRole("button", { name: "2" }));
  await user.click(screen.getByRole("button", { name: "3" }));
  await user.click(screen.getByRole("button", { name: "4" }));

  expect(screen.getByRole("status").textContent).toBe("1.234567890123");
});

test("does not allow 15 character negative number input", async () => {
  const user = userEvent.setup();
  render(<App />);

  await user.click(screen.getByRole("button", { name: "1" }));
  await user.click(screen.getByRole("button", { name: "2" }));
  await user.click(screen.getByRole("button", { name: "3" }));
  await user.click(screen.getByRole("button", { name: "4" }));
  await user.click(screen.getByRole("button", { name: "5" }));
  await user.click(screen.getByRole("button", { name: "6" }));
  await user.click(screen.getByRole("button", { name: "7" }));
  await user.click(screen.getByRole("button", { name: "8" }));
  await user.click(screen.getByRole("button", { name: "9" }));
  await user.click(screen.getByRole("button", { name: "0" }));
  await user.click(screen.getByRole("button", { name: "1" }));
  await user.click(screen.getByRole("button", { name: "2" }));
  await user.click(screen.getByRole("button", { name: "3" }));
  await user.click(screen.getByRole("button", { name: "4" }));
  await user.click(screen.getByRole("button", { name: "+/-" }));

  expect(screen.getByRole("status").textContent).toBe("12345678901234");
});

test("it does not allow results larger than 14 characters", async () => {
  const user = userEvent.setup();
  render(<App />);

  await user.click(screen.getByRole("button", { name: "1" }));
  await user.click(screen.getByRole("button", { name: "+" }));
  await user.click(screen.getByRole("button", { name: "9" }));
  await user.click(screen.getByRole("button", { name: "9" }));
  await user.click(screen.getByRole("button", { name: "9" }));
  await user.click(screen.getByRole("button", { name: "9" }));
  await user.click(screen.getByRole("button", { name: "9" }));
  await user.click(screen.getByRole("button", { name: "9" }));
  await user.click(screen.getByRole("button", { name: "9" }));
  await user.click(screen.getByRole("button", { name: "9" }));
  await user.click(screen.getByRole("button", { name: "9" }));
  await user.click(screen.getByRole("button", { name: "9" }));
  await user.click(screen.getByRole("button", { name: "9" }));
  await user.click(screen.getByRole("button", { name: "9" }));
  await user.click(screen.getByRole("button", { name: "9" }));
  await user.click(screen.getByRole("button", { name: "9" }));

  await user.click(screen.getByRole("button", { name: "=" }));

  expect(screen.getByRole("status").textContent).toBe("0");
});

test("results are limited to 5 decimal places", async () => {
  const user = userEvent.setup();
  render(<App />);

  await user.click(screen.getByRole("button", { name: "1" }));
  await user.click(screen.getByRole("button", { name: "/" }));
  await user.click(screen.getByRole("button", { name: "3" }));
  await user.click(screen.getByRole("button", { name: "=" }));

  expect(screen.getByRole("status").textContent).toBe("0.33333");
});

test("0.1 + 0.2 = 0.3 (avoiding javascript floating point error)", async () => {
  const user = userEvent.setup();
  render(<App />);

  await user.click(screen.getByRole("button", { name: "0" }));
  await user.click(screen.getByRole("button", { name: "." }));
  await user.click(screen.getByRole("button", { name: "1" }));
  await user.click(screen.getByRole("button", { name: "+" }));
  await user.click(screen.getByRole("button", { name: "0" }));
  await user.click(screen.getByRole("button", { name: "." }));
  await user.click(screen.getByRole("button", { name: "2" }));
  await user.click(screen.getByRole("button", { name: "=" }));

  expect(screen.getByRole("status").textContent).toBe("0.3");
});
