const app = require("./db");
const mongoose = require("mongoose");
const supertest = require("supertest");
const config = require("../config");
var jwt = require('jwt-simple');

var Person = require('../models/user.js');
var Coffee = require('../models/coffee.js');
var Cafeteria = require('../models/cafeteria.js');

beforeEach((done) => {
  mongoose.connect("mongodb+srv://adsoft:adsoft@cluster0.bgmmp.mongodb.net/UnitTesting?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => done());
});

afterEach((done) => {
  mongoose.connection.db.dropDatabase(() => {
    mongoose.connection.close(() => done())
  });
});

// AUTH ENDPOINTS

test("POST /auth/login", async () => {
  const user = await Person.create({firstName: 'Unit',
    lastName: 'Testing',
    email: 'unit@testing.com',
    password: '123456789'});
  
  const token = jwt.encode({ id: user.id }, config.TOKEN_SECRET);

  const data = {email: 'unit@testing.com', password: '123456789'};

  await supertest(app).post("/auth/login")
    .send(data)
    .expect(200)
    .then(async (response) => {
     // Check the response
     expect(response.body.token).toBe(token);

     // Check data in the database
     const post = await Person.findById(jwt.decode(response.body.token, config.TOKEN_SECRET).id);
     expect(post).toBeTruthy();
     expect(post.firstName).toBe(user.firstName);
     expect(post.lastName).toBe(user.lastName);
     expect(post.email).toBe(user.email);
  });
});

test("POST /auth/signup", async () => {
  const data = {firstName: 'Unit',
  lastName: 'Testing',
  email: 'unit@testing.com',
  password: '123456789'};

  await supertest(app).post("/auth/signup")
    .send(data)
    .expect(200)
    .then(async (response) => {
     // Check the response
     expect(response.body.token).toBeTruthy();

     // Check data in the database
     const post = await Person.findById(jwt.decode(response.body.token, config.TOKEN_SECRET).id);
     expect(post).toBeTruthy();
     expect(post.firstName).toBe(data.firstName);
     expect(post.lastName).toBe(data.lastName);
     expect(post.email).toBe(data.email);
  });
});

// USER ENDPOINTS

test("GET /users", async () => {
  
  const user = await Person.create({firstName: 'Unit',
  lastName: 'Testing',
  email: 'unit@testing.com',
  password: '123456789'});

  const token = jwt.encode({ id: user.id }, config.TOKEN_SECRET); 

  await supertest(app).get("/users")
    .set('Authorization', 'Bearer ' + token)
    .expect(200)
    .then((response) => {
      // Check type and length
      expect(Array.isArray(response.body.docs)).toBeTruthy();
      expect(response.body.docs.length).toEqual(1);

      // Check data
      expect(response.body.docs[0]._id).toBe(user.id);
      expect(response.body.docs[0].firstName).toBe(user.firstName);
      expect(response.body.docs[0].lastName).toBe(user.lastName);
      expect(response.body.docs[0].email).toBe(user.email);
    });
});

test("GET /coffee/page/:page", async () => {

  const user = await Person.create({firstName: 'Unit',
  lastName: 'Testing',
  email: 'unit@testing.com',
  password: '123456789'});

  const token = jwt.encode({ id: user.id }, config.TOKEN_SECRET); 

  await supertest(app).get("/users/page/1")
    .set('Authorization', 'Bearer ' + token)
    .expect(200)
    .then((response) => {
      // Check type and length
      expect(Array.isArray(response.body.docs)).toBeTruthy();
      expect(response.body.docs.length).toEqual(1);

      // Check data
      expect(response.body.docs[0]._id).toBe(user.id);
      expect(response.body.docs[0].firstName).toBe(user.firstName);
      expect(response.body.docs[0].lastName).toBe(user.lastName);
      expect(response.body.docs[0].email).toBe(user.email);
    });
});

test("GET /users/:id", async () => {

  const user = await Person.create({firstName: 'Unit',
  lastName: 'Testing',
  email: 'unit@testing.com',
  password: '123456789'});

  const token = jwt.encode({ id: user.id }, config.TOKEN_SECRET); 

  await supertest(app).get("/users/" + user.id)
    .set('Authorization', 'Bearer ' + token)
    .expect(200)
    .then((response) => {
      // Check data
      expect(response.body._id).toBe(user.id);
      expect(response.body.firstName).toBe(user.firstName);
      expect(response.body.lastName).toBe(user.lastName);
      expect(response.body.email).toBe(user.email);
    });
});

test("GET /profile", async () => {

  const user = await Person.create({firstName: 'Unit',
  lastName: 'Testing',
  email: 'unit@testing.com',
  password: '123456789'});

  const token = jwt.encode({ id: user.id }, config.TOKEN_SECRET); 

  await supertest(app).get("/profile")
    .set('Authorization', 'Bearer ' + token)
    .expect(200)
    .then((response) => {
      // Check data
      expect(response.body._id).toBe(user.id);
      expect(response.body.firstName).toBe(user.firstName);
      expect(response.body.lastName).toBe(user.lastName);
      expect(response.body.email).toBe(user.email);
    });
});

// COFEE ENDPOINTS

test("GET /coffee", async () => {
  const coffee = await Coffee.create(
      {
          "Aroma": 7.92,
          "aromaN": 0.5257142857,
          "Flavor": 7.83,
          "flavorN": 0.5434782609,
          "Aftertaste": 7.67,
          "aftertasteN": 0.502994012,
          "Acidity": 8,
          "acidityN": 0.6685714286,
          "Body": 7.67,
          "bodyN": 0.5283018868,
          "Balance": 7.75,
          "balanceN": 0.5786163522,
          "Moisture": 0.11,
          "moistureN": 0.7857142857,
          "altitude_mean_meters": 2000,
          "altitudeN": 0.01051203441,
          "Region": "Kenya"
      }
  );

  await supertest(app).get("/coffee")
    .expect(200)
    .then((response) => {
      // Check type and length
      expect(Array.isArray(response.body.docs)).toBeTruthy();
      expect(response.body.docs.length).toEqual(1);

      // Check data
      expect(response.body.docs[0]._id).toBe(coffee.id);
      expect(response.body.docs[0].Aroma).toBe(coffee.Aroma);
      expect(response.body.docs[0].aromaN).toBe(coffee.aromaN);
      expect(response.body.docs[0].Flavor).toBe(coffee.Flavor);
      expect(response.body.docs[0].flavorN).toBe(coffee.flavorN);
      expect(response.body.docs[0].Aftertaste).toBe(coffee.Aftertaste);
      expect(response.body.docs[0].aftertasteN).toBe(coffee.aftertasteN);
      expect(response.body.docs[0].Acidity).toBe(coffee.Acidity);
      expect(response.body.docs[0].acidityN).toBe(coffee.acidityN);
      expect(response.body.docs[0].Body).toBe(coffee.Body);
      expect(response.body.docs[0].bodyN).toBe(coffee.bodyN);
      expect(response.body.docs[0].Balance).toBe(coffee.Balance);
      expect(response.body.docs[0].balanceN).toBe(coffee.balanceN);
      expect(response.body.docs[0].Moisture).toBe(coffee.Moisture);
      expect(response.body.docs[0].moistureN).toBe(coffee.moistureN);
      expect(response.body.docs[0].altitude_mean_meters).toBe(coffee.altitude_mean_meters);
      expect(response.body.docs[0].altitudeN).toBe(coffee.altitudeN);
      expect(response.body.docs[0].Region).toBe(coffee.Region);
    });
});

test("GET /coffee/page/:page", async () => {

  const coffee = await Coffee.create(
      {
          "Aroma": 7.92,
          "aromaN": 0.5257142857,
          "Flavor": 7.83,
          "flavorN": 0.5434782609,
          "Aftertaste": 7.67,
          "aftertasteN": 0.502994012,
          "Acidity": 8,
          "acidityN": 0.6685714286,
          "Body": 7.67,
          "bodyN": 0.5283018868,
          "Balance": 7.75,
          "balanceN": 0.5786163522,
          "Moisture": 0.11,
          "moistureN": 0.7857142857,
          "altitude_mean_meters": 2000,
          "altitudeN": 0.01051203441,
          "Region": "Kenya"
      }
  );

  const user = await Person.create({firstName: 'Unit',
  lastName: 'Testing',
  email: 'unit@testing.com',
  password: '123456789'});

  const token = jwt.encode({ id: user.id }, config.TOKEN_SECRET); 

  await supertest(app).get("/coffee/page/1")
    .set('Authorization', 'Bearer ' + token)
    .expect(200)
    .then((response) => {
      // Check type and length
      expect(Array.isArray(response.body.docs)).toBeTruthy();
      expect(response.body.docs.length).toEqual(1);

      // Check data
      expect(response.body.docs[0]._id).toBe(coffee.id);
      expect(response.body.docs[0].Aroma).toBe(coffee.Aroma);
      expect(response.body.docs[0].aromaN).toBe(coffee.aromaN);
      expect(response.body.docs[0].Flavor).toBe(coffee.Flavor);
      expect(response.body.docs[0].flavorN).toBe(coffee.flavorN);
      expect(response.body.docs[0].Aftertaste).toBe(coffee.Aftertaste);
      expect(response.body.docs[0].aftertasteN).toBe(coffee.aftertasteN);
      expect(response.body.docs[0].Acidity).toBe(coffee.Acidity);
      expect(response.body.docs[0].acidityN).toBe(coffee.acidityN);
      expect(response.body.docs[0].Body).toBe(coffee.Body);
      expect(response.body.docs[0].bodyN).toBe(coffee.bodyN);
      expect(response.body.docs[0].Balance).toBe(coffee.Balance);
      expect(response.body.docs[0].balanceN).toBe(coffee.balanceN);
      expect(response.body.docs[0].Moisture).toBe(coffee.Moisture);
      expect(response.body.docs[0].moistureN).toBe(coffee.moistureN);
      expect(response.body.docs[0].altitude_mean_meters).toBe(coffee.altitude_mean_meters);
      expect(response.body.docs[0].altitudeN).toBe(coffee.altitudeN);
      expect(response.body.docs[0].Region).toBe(coffee.Region);
    });
});

test("GET /coffee/:id", async () => {

  const coffee = await Coffee.create(
      {
          "Aroma": 7.92,
          "aromaN": 0.5257142857,
          "Flavor": 7.83,
          "flavorN": 0.5434782609,
          "Aftertaste": 7.67,
          "aftertasteN": 0.502994012,
          "Acidity": 8,
          "acidityN": 0.6685714286,
          "Body": 7.67,
          "bodyN": 0.5283018868,
          "Balance": 7.75,
          "balanceN": 0.5786163522,
          "Moisture": 0.11,
          "moistureN": 0.7857142857,
          "altitude_mean_meters": 2000,
          "altitudeN": 0.01051203441,
          "Region": "Kenya"
      }
  );

  const user = await Person.create({firstName: 'Unit',
  lastName: 'Testing',
  email: 'unit@testing.com',
  password: '123456789'});

  const token = jwt.encode({ id: user.id }, config.TOKEN_SECRET); 

  await supertest(app).get("/coffee/" + coffee.id)
    .set('Authorization', 'Bearer ' + token)
    .expect(200)
    .then((response) => {
      // Check data
      expect(response.body._id).toBe(coffee.id);
      expect(response.body.Aroma).toBe(coffee.Aroma);
      expect(response.body.aromaN).toBe(coffee.aromaN);
      expect(response.body.Flavor).toBe(coffee.Flavor);
      expect(response.body.flavorN).toBe(coffee.flavorN);
      expect(response.body.Aftertaste).toBe(coffee.Aftertaste);
      expect(response.body.aftertasteN).toBe(coffee.aftertasteN);
      expect(response.body.Acidity).toBe(coffee.Acidity);
      expect(response.body.acidityN).toBe(coffee.acidityN);
      expect(response.body.Body).toBe(coffee.Body);
      expect(response.body.bodyN).toBe(coffee.bodyN);
      expect(response.body.Balance).toBe(coffee.Balance);
      expect(response.body.balanceN).toBe(coffee.balanceN);
      expect(response.body.Moisture).toBe(coffee.Moisture);
      expect(response.body.moistureN).toBe(coffee.moistureN);
      expect(response.body.altitude_mean_meters).toBe(coffee.altitude_mean_meters);
      expect(response.body.altitudeN).toBe(coffee.altitudeN);
      expect(response.body.Region).toBe(coffee.Region);
    });
});

// CAFETERIA

test("GET /cafeterias", async () => {
  const cafeteria = await Cafeteria.create(
      {
          "Nombre": "Cafe test",
      }
  );

  await supertest(app).get("/cafeterias")
    .expect(200)
    .then((response) => {
      // Check type and length
      expect(Array.isArray(response.body.cafeterias.docs)).toBeTruthy();
      expect(response.body.cafeterias.docs.length).toEqual(1);

      // Check data
      expect(response.body.cafeterias.docs[0].Nombre).toBe(cafeteria.Nombre);
    });
});

test("GET /cafeterias/page/:page", async () => {

  const cafeteria = await Cafeteria.create(
      {
        "Nombre": "Cafe test",
      }
  );

  await supertest(app).get("/cafeterias/page/1")
    .expect(200)
    .then((response) => {
      // Check type and length
      expect(Array.isArray(response.body.cafeterias.docs)).toBeTruthy();
      expect(response.body.cafeterias.docs.length).toEqual(1);

      // Check data
      expect(response.body.cafeterias.docs[0].Nombre).toBe(cafeteria.Nombre);
    });
});

test("GET /cafeterias/:id", async () => {

  const cafeteria = await Cafeteria.create(
      {
        "Nombre": "Cafe test",
      }
  );

  await supertest(app).get("/cafeterias/" + cafeteria.id)
    .expect(200)
    .then((response) => {
      // Check data
      expect(response.body.cafeteria._id).toBe(cafeteria.id);
      expect(response.body.cafeteria.Nombre).toBe(cafeteria.Nombre);
    });
});

// Favorite Coffee - graphql

test("POST /graphql", async () => {
  let data = {
      Aroma: 7.92,
      aromaN: 0.5257142857,
      Flavor: 7.83,
      flavorN: 0.5434782609,
      Aftertaste: 7.67,
      aftertasteN: 0.502994012,
      Acidity: 8,
      acidityN: 0.6685714286,
      Body: 7.67,
      bodyN: 0.5283018868,
      Balance: 7.75,
      balanceN: 0.5786163522,
      Moisture: 0.11,
      moistureN: 0.7857142857,
      altitude_mean_meters: 2000,
      altitudeN: 0.01051203441,
      userId: "6098934126149d6193fb519f",
      Region: "Kenya"
  }

  const mutation = {query: 'mutation{  addFavorite(Aroma: 7.92, aromaN: 0.5257142857, Flavor: 7.83, flavorN: 0.5434782609, Aftertaste: 7.67, aftertasteN: 0.502994012, Acidity: 8, acidityN: 0.6685714286, Body: 7.67, bodyN: 0.5283018868, Balance: 7.75, balanceN: 0.5786163522, Moisture: 0.11, moistureN: 0.7857142857, altitude_mean_meters: 2000, altitudeN: 0.01051203441, userId: "6098934126149d6193fb519f", Region: "Kenya"){    Aroma    aromaN    Flavor    flavorN    Aftertaste    aftertasteN    Acidity    acidityN    Body    bodyN    Balance    balanceN    Moisture    moistureN    altitude_mean_meters    altitudeN    userId    Region  }}'};

  const query = {query: "query {\n getFavorites(userId: \"6098934126149d6193fb519f\") {\n Aroma\n aromaN\n Flavor\n flavorN\n Aftertaste\n aftertasteN\n Acidity\n acidityN\n Body\n bodyN\n Balance\n balanceN\n Moisture\n moistureN\n altitude_mean_meters\n altitudeN\n userId\n Region\n }\n}\n"}

  await supertest(app).post("/graphql")
    .send(mutation)
    .expect(200)
    .then(async (response) => {
     // Check data in the database
     expect(response.body.data.addFavorite.userId).toBe(data.userId);
      expect(response.body.data.addFavorite.Aroma).toBe(data.Aroma);
      expect(response.body.data.addFavorite.aromaN).toBe(data.aromaN);
      expect(response.body.data.addFavorite.Flavor).toBe(data.Flavor);
      expect(response.body.data.addFavorite.flavorN).toBe(data.flavorN);
      expect(response.body.data.addFavorite.Aftertaste).toBe(data.Aftertaste);
      expect(response.body.data.addFavorite.aftertasteN).toBe(data.aftertasteN);
      expect(response.body.data.addFavorite.Acidity).toBe(data.Acidity);
      expect(response.body.data.addFavorite.acidityN).toBe(data.acidityN);
      expect(response.body.data.addFavorite.Body).toBe(data.Body);
      expect(response.body.data.addFavorite.bodyN).toBe(data.bodyN);
      expect(response.body.data.addFavorite.Balance).toBe(data.Balance);
      expect(response.body.data.addFavorite.balanceN).toBe(data.balanceN);
      expect(response.body.data.addFavorite.Moisture).toBe(data.Moisture);
      expect(response.body.data.addFavorite.moistureN).toBe(data.moistureN);
      expect(response.body.data.addFavorite.altitude_mean_meters).toBe(data.altitude_mean_meters);
      expect(response.body.data.addFavorite.altitudeN).toBe(data.altitudeN);
      expect(response.body.data.addFavorite.Region).toBe(data.Region);
     
  });

  await supertest(app).post("/graphql")
    .send(query)
    .expect(200)
    .then(async (response) => {
     // Check data in the database
      expect(Array.isArray(response.body.data.getFavorites)).toBeTruthy();
  });
});

