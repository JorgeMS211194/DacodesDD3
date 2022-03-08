const request = require("supertest");

const app = require("../");

  describe("POST Success /login", () => {
    test("Datos correctos", async () => {
      const response = await request(app)
        .post("/login")
        .send({
            token: "sdff34535dfgdg",
            username: "jorge",
            password: "1234"
        });

      expect(response.body.response).toBe("success");
      expect(response.statusCode).toBe(200);

    });
  });

  describe("POST Invalid Credentials /login", () => {
    test("Credenciales no válidas", async () => {
      const response = await request(app)
        .post("/login")
        .send({
            token: "sdff34535dfgdg",
            username: "jorge",
            password: "asdad"
        });

      expect(response.body.response).toBe("Invalid Credentials");
      expect(response.statusCode).toBe(200);

    });
  });

  describe("POST A token is required for authentication /login", () => {
    test("Error token no enviado", async () => {
      const response = await request(app)
        .post("/login")
        .send({
            username: "jorge",
            password: "1234"
        });

      expect(response.body.response).toBe("A token is required for authentication");
      expect(response.statusCode).toBe(403);
    });
  });