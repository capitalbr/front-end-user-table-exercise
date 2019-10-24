import {
  isValidPassword,
  hasNum,
  hasMinLength,
  hasUpperCase
} from "./PassValidate";

const validations = [
  hasNum,
  hasMinLength,
  hasUpperCase
]

describe('testing UserTable component', () => {

  it("returns false if password is not a string", () => {
    expect(isValidPassword({})).toEqual(false);
  });

  it("returns true if password is a string and no validations are passed in", () => {
    expect(isValidPassword("str")).toEqual(true);
  });

  it("checks if input includes number when hasNum is passed in", () => {
    expect(isValidPassword("abc", [ hasNum ])).toEqual(false);
    expect(isValidPassword("a3b", [ hasNum ])).toEqual(true);
  });

  it("checks if input length is atleast 8 when hasMinLength is passed in", () => {
    expect(isValidPassword("12345678", [ hasMinLength ])).toEqual(true);
    expect(isValidPassword("1234567", [ hasMinLength ])).toEqual(false);
    expect(isValidPassword("123456789", [ hasMinLength ])).toEqual(true);
  });

  it("checks if input includes an uppercase letter when hasUpperCase is passed in", () => {
    expect(isValidPassword("1a/!$&*", [ hasUpperCase ])).toEqual(false);
    expect(isValidPassword("aBcdefg", [ hasUpperCase ])).toEqual(true);
  });

  it("ensures password passes every validation passed in", () => {
    expect(isValidPassword("A?*!a678", validations)).toEqual(true);
    expect(isValidPassword("A?*!a67", validations)).toEqual(false);
  });

  it("ensures password passes the amount of validations specified in amtToPass", () => {
    expect(isValidPassword("A?*!a678", validations, 3)).toEqual(true);
    expect(isValidPassword("A2", validations, 2)).toEqual(true);
    expect(isValidPassword("A", validations, 1)).toEqual(true);
    expect(isValidPassword("a", validations, 0)).toEqual(true);
  });

  it("if amtToPass is greater than validation.length it still returns true if all validations pass", () => {
    expect(isValidPassword("A?*!a678", validations, 500)).toEqual(true);
    expect(isValidPassword("A?*!a67", validations, 500)).toEqual(false);
  });

});