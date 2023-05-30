import supertest from "supertest";
import { expect } from "chai";

const request = supertest("http://localhost:8080");

const newProduct = {
  title: "Caléndula",
  description: "flor",
  category: "Anuales",
  stock: 2,
  price: 300,
  thumbnails: [],
  status: true,
  code: "cal3",
  owner: "LucasAdmin",
};

const owner = { email: "valeriapaulinalustres@yahoo.com.ar" };

const mockedAddProduct = { newProduct, owner };

describe("Probando rutas de products", function () {
  it("Probar método GET /api/products", async function () {
    const response = await request.get("/api/products");
    // console.log(response._body.response.products)
    expect(response._body.response.products).to.not.have.lengthOf(0);
  });

  it("Probar método POST /api/products", async function () {
    const response = await request.post("/api/products").send(mockedAddProduct);
    console.log(response._body);
    expect(response._body.response.message).to.equal(
      "Producto creado con éxito"
    );
  });
});
