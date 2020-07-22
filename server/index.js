require('dotenv/config');
const express = require('express');

const db = require('./database');
const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');
const sessionMiddleware = require('./session-middleware');

const app = express();

app.use(staticMiddleware);
app.use(sessionMiddleware);

app.use(express.json());

app.get('/api/health-check', (req, res, next) => {
  db.query("select 'successfully connected' as \"message\"")
    .then(result => res.json(result.rows[0]))
    .catch(err => next(err));
});

app.get('/api/products', (req, res, next) => {
  // productId, name, price, image, and shortDescription
  const sql = `
  select *
  from "products"`;

  db.query(sql)
    .then(result => {
      const array = result.rows;
      const map = array.map(product => {
        return {
          productId: product.productId,
          name: product.name,
          price: product.price,
          image: product.image,
          shortDescription: product.shortDescription
        };
      });
      res.send(map);
    })
    .catch(err => next(err));
});

app.get('/api/products/:productId', (req, res, next) => {
  const parameter = [req.params.productId];
  const sqlQuery = `
  select *
  from "products"
  where "productId" = $1`;

  db.query(sqlQuery, parameter).then(result => {
    res.send(result.rows[0]);
    if (!result.rows[0]) {
      next();
    }
  });
});

app.get('/api/cart', (req, res, next) => {
  res.send([]);
});

app.post('/api/cart', (req, res, next) => {
  // eslint-disable-next-line no-console
  console.log('body', req.body[2]);
  if (req.body > 0) {
    const params = [req.body];
    // eslint-disable-next-line no-console
    console.log(params);

    const sql = `select "price"
    from "products"
    where "productId" = $1`;

    const sql2 = `insert into "carts" ("cartId", "createdAt")
    values (default, default)
    returning "cartId"`;

    db.query(sql, params).then(result => {
      if (!result) {
        db.query(sql2).then(result => {
          res.send(result.rows);
        });
      }
    });
  } else {
    res.status(400).send({ error: 'item does not exist' });
  }
});

app.use('/api', (req, res, next) => {
  next(new ClientError(`cannot ${req.method} ${req.originalUrl}`, 404));
});

app.use((err, req, res, next) => {
  if (err instanceof ClientError) {
    res.status(err.status).json({ error: err.message });
  } else {
    console.error(err);
    res.status(500).json({
      error: 'an unexpected error occurred'
    });
  }
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port', process.env.PORT);
});
