import React from "react";
import { mockReactRedux } from "mock-react-redux";
import { create, act } from "react-test-renderer";

import Welcome from "../src/components/Home/Welcome";

import "regenerator-runtime/runtime";
import "core-js/stable";
import "react-redux";

describe("Renderer Components", () => {
  beforeAll(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
    jest.spyOn(console, "warn").mockImplementation(() => {});
  });

  describe("Component of Home folder", () => {
    it("Welcome should correctly", () => {
      // Arrange
      const tag = <Welcome />;
      let root;
      let rootInstance;

      mockReactRedux().state({});

      // Act
      act(() => {
        root = create(tag);
      });

      rootInstance = root.root;

      // Assert
      expect(root.toJSON()).toMatchSnapshot();
      expect(rootInstance.findByType("div").children).toEqual(["Hola Mundo!"]);
    });
  });
});
