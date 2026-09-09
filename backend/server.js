const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const HOST = "0.0.0.0";

const DB_FILE = path.join(__dirname, "db.json");

// ================= DATABASE =================

function readDB() {
  try {
    if (!fs.existsSync(DB_FILE)) {
      return {
        users: [],
        products: [],
        orders: [],
        categories: [],
        reviews: [],
        payments: [],
        otps: []
      };
    }

    const data = fs.readFileSync(DB_FILE, "utf-8");

    return data ? JSON.parse(data) : {
      users: [],
      products: [],
      orders: [],
      categories: [],
      reviews: [],
      payments: [],
      otps: []
    };
  } catch (error) {
    console.error("Database Read Error:", error);

    return {
      users: [],
      products: [],
      orders: [],
      categories: [],
      reviews: [],
      payments: [],
      otps: []
    };
  }
}

function writeDB(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

// ================= HOME =================

app.get("/", (req, res) => {
  res.json({
    message: "GroceryGo Backend is running",
    status: "success"
  });
});

// ================= GENERIC GET =================

const collections = [
  "users",
  "products",
  "orders",
  "categories",
  "reviews",
  "payments",
  "otps"
];

collections.forEach((collection) => {
  app.get(`/${collection}`, (req, res) => {
    const db = readDB();

    let data = db[collection] || [];

    // Simple query support
    Object.keys(req.query).forEach((key) => {
      data = data.filter(
        (item) => String(item[key]) === String(req.query[key])
      );
    });

    res.json(data);
  });
});

// ================= GET SINGLE ITEM =================

collections.forEach((collection) => {
  app.get(`/${collection}/:id`, (req, res) => {
    const db = readDB();

    const item = (db[collection] || []).find(
      (item) => String(item.id) === String(req.params.id)
    );

    if (!item) {
      return res.status(404).json({
        message: `${collection} item not found`
      });
    }

    res.json(item);
  });
});

// ================= POST =================

collections.forEach((collection) => {
  app.post(`/${collection}`, (req, res) => {
    const db = readDB();

    if (!db[collection]) {
      db[collection] = [];
    }

    const newItem = {
      id: Date.now(),
      ...req.body
    };

    db[collection].push(newItem);

    writeDB(db);

    res.status(201).json(newItem);
  });
});

// ================= PATCH =================

collections.forEach((collection) => {
  app.patch(`/${collection}/:id`, (req, res) => {
    const db = readDB();

    const index = (db[collection] || []).findIndex(
      (item) => String(item.id) === String(req.params.id)
    );

    if (index === -1) {
      return res.status(404).json({
        message: `${collection} item not found`
      });
    }

    db[collection][index] = {
      ...db[collection][index],
      ...req.body
    };

    writeDB(db);

    res.json(db[collection][index]);
  });
});

// ================= PUT =================

collections.forEach((collection) => {
  app.put(`/${collection}/:id`, (req, res) => {
    const db = readDB();

    const index = (db[collection] || []).findIndex(
      (item) => String(item.id) === String(req.params.id)
    );

    if (index === -1) {
      return res.status(404).json({
        message: `${collection} item not found`
      });
    }

    db[collection][index] = {
      id: db[collection][index].id,
      ...req.body
    };

    writeDB(db);

    res.json(db[collection][index]);
  });
});

// ================= DELETE =================

collections.forEach((collection) => {
  app.delete(`/${collection}/:id`, (req, res) => {
    const db = readDB();

    const index = (db[collection] || []).findIndex(
      (item) => String(item.id) === String(req.params.id)
    );

    if (index === -1) {
      return res.status(404).json({
        message: `${collection} item not found`
      });
    }

    const deletedItem = db[collection].splice(index, 1)[0];

    writeDB(db);

    res.json({
      message: `${collection} item deleted`,
      item: deletedItem
    });
  });
});

// ================= ADMIN DASHBOARD =================

app.get("/api/admin/dashboard", (req, res) => {
  const db = readDB();

  const users = db.users || [];
  const products = db.products || [];
  const orders = db.orders || [];

  let totalRevenue = 0;

  orders.forEach((order) => {
    const amount =
      Number(order.totalAmount) ||
      Number(order.total) ||
      Number(order.amount) ||
      0;

    totalRevenue += amount;
  });

  res.json({
    totalUsers: users.length,
    totalProducts: products.length,
    totalOrders: orders.length,
    totalRevenue: totalRevenue
  });
});

// ================= HEALTH CHECK =================

app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    message: "GroceryGo API is working"
  });
});

// ================= 404 =================

app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
    route: req.originalUrl
  });
});

// ================= SERVER =================

app.listen(PORT, HOST, () => {
  console.log(`GroceryGo server running on ${HOST}:${PORT}`);
});