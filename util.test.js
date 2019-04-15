const { generateText } = require("./util");

test("should output name and age", () => {
  const text = generateText("Chris", 30);
  expect(text).toBe("Chris (30 years old)");
  const text2 = generateText("Lacey", 36);
  expect(text2).toBe("Lacey (36 years old)");
});

test("should output data-less text", () => {
  const text = generateText("", null);
  expect(text).toBe(" (null years old)");
});
/*
test("should generate a valid text output", () => {
  const text = checkAndGenerate("Chris", 30);
  expect(text).toBe("Chris (30 years old)");
});
*/
