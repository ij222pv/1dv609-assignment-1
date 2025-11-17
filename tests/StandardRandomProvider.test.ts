import { beforeEach, describe, expect, test } from "@jest/globals";
import StandardRandomProvider from "../src/model/StandardRandomProvider";

describe("StandardRandomProvider", () => {
  let randomProvider: StandardRandomProvider;

  beforeEach(() => {
    randomProvider = new StandardRandomProvider();
  });

  describe("getRandomIntegerInRange", () => {
    // Because we cannot predict the return value we will only check that it is a number.
    // If we tested that the return value is in the range 1-5, that could create a flaky test.
    test("should return number", () => {
      const returnValue = randomProvider.getRandomIntegerInRange(1, 5);
      expect(typeof returnValue).toBe("number");
    });

    test("should return -1 when min and max are also -1", () => {
      const returnValue = randomProvider.getRandomIntegerInRange(-1, -1);
      expect(returnValue).toBe(-1);
    });

    test("should throw an exception when min greater than max", () => {
      expect(() => {
        randomProvider.getRandomIntegerInRange(2, 1);
      }).toThrow();
    });
  });
});
