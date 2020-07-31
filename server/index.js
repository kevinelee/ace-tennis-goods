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
  const params = [req.session.cartId];
  const sql = `select "c"."cartItemId",
  "c"."price",
  "p"."productId",
  "p"."image",
  "p"."name",
  "p"."shortDescription"
from "cartItems" as "c"
join "products" as "p" using ("productId")
where "c"."cartId" = $1`;

  if (!req.session.cartId) {
    return res.send([]);
  }
  db.query(sql, params).then(result => {
    return res.send(result.rows);
  });
});

app.post('/api/cart', (req, res, next) => {
  if (req.body.productId > 0) {
    const productId = [Number(req.body.productId)];

    const sql = `select "price"
    from "products"
    where "productId" = $1`;

    const sql2 = `insert into "carts" ("cartId", "createdAt")
    values (default, default)
    returning "cartId"`;

    db.query(sql, productId)
      .then(result => {
        if (result.rows.length < 1) {
          throw new ClientError('no items in cart', 500);
        }
        if (req.session.cartId) {
          return {
            cartId: req.session.cartId,
            price: result.rows[0].price
          };
        } else {
          return db.query(sql2).then(successResult => {
            return {
              cartId: successResult.rows[0].cartId,
              price: result.rows[0].price
            };
          });
        }
      })
      .then(data => {
        req.session.cartId = data.cartId;
        // eslint-disable-next-line no-console
        console.log(req.session);
        const params = [data.cartId, Number(req.body.productId), data.price];

        const sql3 = `insert into "cartItems" ("cartId", "productId", "price")
        values ($1, $2, $3)
        returning "cartItemId"`;

        return db.query(sql3, params).then(result => {
          return result.rows[0];
        });
      })
      .then(result => {
        // eslint-disable-next-line no-console
        console.log(result);

        const params = [result.cartItemId];

        const sql4 = `select "c"."cartItemId",
        "c"."price",
        "p"."productId",
        "p"."image",
        "p"."name",
        "p"."shortDescription"
        from "cartItems" as "c"
        join "products" as "p" using ("productId")
        where "c"."cartItemId" = $1`;

        db.query(sql4, params).then(result => {
          return res.status(201).send(result.rows);
        });
      });
  } else {
    res.status(400).send({ error: 'error: item does not exist' });
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
