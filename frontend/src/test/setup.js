import { expect, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import {
  toBeInTheDocument,
  toBeVisible,
  toHaveTextContent,
  toHaveClass,
  toHaveAttribute,
} from "@testing-library/jest-dom/matchers";


expect.extend({
  toBeInTheDocument,
  toBeVisible,
  toHaveTextContent,
  toHaveClass,
  toHaveAttribute,
});

afterEach(() => {
  cleanup();
});