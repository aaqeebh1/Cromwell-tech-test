import { getPasswordErrors, isValidEmail } from "./AuthForm.jsx";

describe("Validation Helpers", () => {
  describe("isValidEmail", () => {
    test("should return true for valid email addresses", () => {
      expect(isValidEmail("test@example.com")).toBe(true);
      expect(isValidEmail("user.name+tag@example.co.uk")).toBe(true);
      expect(isValidEmail("firstname.lastname@subdomain.example.com")).toBe(
        true
      );
    });

    test("should return false for invalid email addresses", () => {
      expect(isValidEmail("plainaddress")).toBe(false);
      expect(isValidEmail("@missingusername.com")).toBe(false);
      expect(isValidEmail("username@.com")).toBe(false);
      expect(isValidEmail("username@domain.")).toBe(false); 
      expect(isValidEmail("username space@domain.com")).toBe(false);
    });
  });

  describe("getPasswordErrors", () => {
    test("should return an empty array for a valid password", () => {
      expect(getPasswordErrors("ValidP@ss1")).toEqual([]);
      expect(getPasswordErrors("AnotherV@lid123")).toEqual([]);
    });

    test("should return error for password less than 8 characters", () => {
      expect(getPasswordErrors("Shrt1@")).toContain(
        "Password must be at least 8 characters long."
      );
    });

    test("should return error for password missing an uppercase letter", () => {
      expect(getPasswordErrors("nouppercase1@")).toContain(
        "Password must contain at least one uppercase letter."
      );
    });

    test("should return error for password missing a lowercase letter", () => {
      expect(getPasswordErrors("NOLOWERCASE1@")).toContain(
        "Password must contain at least one lowercase letter."
      );
    });

    test("should return error for password missing a number", () => {
      expect(getPasswordErrors("NoNumberHere@A")).toContain(
        "Password must contain at least one number."
      );
    });

    test("should return error for password missing a special character", () => {
      expect(getPasswordErrors("NoSpecialChar1A")).toContain(
        "Password must contain at least one special character."
      );
    });

    test("should return multiple errors if multiple criteria are not met", () => {
      const errors = getPasswordErrors("short");
      expect(errors).toContain("Password must be at least 8 characters long.");
      expect(errors).toContain(
        "Password must contain at least one uppercase letter."
      );
      expect(errors).toContain("Password must contain at least one number.");
      expect(errors).toContain(
        "Password must contain at least one special character."
      );
    });
  });
});