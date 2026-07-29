import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearDatabase();
});

describe("PATCH /api/v1/migrations", () => {
  describe("Anonymous user", () => {
    describe("Running pending migrations", () => {
      test("For the first time", async () => {
        const response = await fetch(
          "http://localhost:3000/api/v1/migrations",
          {
            method: "PATCH",
          },
        );

        const responseBody = await response.json();

        expect(response.status).toBe(405);
        expect(responseBody).toEqual({
          name: "MethodNotAllowed",
          message: "Método não permitido para este endpoint.",
          action:
            "Verifica se o método HTTP enviado é válido para este endpoint",
          status_code: 405,
        });
      });
    });
  });
});

describe("DELETE /api/v1/migrations", () => {
  describe("Anonymous user", () => {
    describe("Running pending migrations", () => {
      test("For the first time", async () => {
        const response = await fetch(
          "http://localhost:3000/api/v1/migrations",
          {
            method: "DELETE",
          },
        );

        const responseBody = await response.json();

        expect(response.status).toBe(405);
        expect(responseBody).toEqual({
          name: "MethodNotAllowed",
          message: "Método não permitido para este endpoint.",
          action:
            "Verifica se o método HTTP enviado é válido para este endpoint",
          status_code: 405,
        });
      });
    });
  });
});
