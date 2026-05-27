require('dotenv/config');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const routes = require('./routes/index.js');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const { initializeDb } = require('./models/index.js');

// const { isAuthenticated } = require('./utils/isAuthenticated');

const app = express();
const port = process.env.PORT || 4002;

// const accessLogStream = fs.createWriteStream(
//   path.join(__dirname, '../access.log'),
//   { flags: 'a' }
// );
app.use(cors());
app.use(helmet());
// app.use(morgan('combined', { stream: accessLogStream }));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

app.use('/teacher', routes.teacher);
app.use('/user', routes.user);
app.use('/admin', routes.admin);
app.use('/subject', routes.subject)
app.use('/class', routes.classname)
app.use('/classtype', routes.classtype)
app.use('/subtype', routes.subtype)


// app.use((req, res) => {
//   res.status(404).send('404: Page not found');
// });


const options = {
  failOnErrors: true,
  definition: {
    openapi: "3.0.0",
    info: {
      title: "chinxzy Express API with Swagger",
      version: "0.1.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "Chinxy",
        url: "https://devchi.netlify.app",
        email: "chinxzypoet@gmail.com",
      },
    },
    servers: [
      {
        url: `http://localhost:${port}`,

      },
    ],

  },
  apis: ["./src/routes/*.js"],
};

const specs = swaggerJSDoc(options);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
);

(async () => {
  try {
    await initializeDb();
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}!`);
    });
  } catch (err) {
    console.error('Failed to initialize database:', err);
    process.exit(1);
  }
})();

