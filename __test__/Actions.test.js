import React from "react";
import { mockReactRedux } from "mock-react-redux";
import { create, act } from "react-test-renderer";
import mockAxios from "jest-mock-axios";

import { getValidToken } from "../src/utils/actions";

import "regenerator-runtime/runtime";
import "core-js/stable";
import "react-redux";

describe("Configurations Actions testing", () => {
  beforeAll(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
    jest.spyOn(console, "warn").mockImplementation(() => {});
  });

  describe("Actions getTokenData()", () => {
    it("get data for token method", async () => {
      // Arrange
      const security = {
          User: "",
          Password: ""
      };
      const data = {
        error: "Ha ocurrido un error",
        data: {
          Token: "vhjbdbxczbuys<zgvedysuwe7tr643yubcdscliu<hc<a8wr7ew78rg",
        },
      };
      mockAxios.post.mockResolvedValueOnce(data);

      // Act
      const result = await getValidToken();

      // Assert
      expect(mockAxios.post).toHaveBeenCalledWith(
        `https://localhost:44389/api/token`,
        security
      );
      expect(result).not.toBeNull();
      expect(result.statusResponse).toBeTruthy();
      expect(result.token).toEqual(data.data.token);
    });
  });
});
