import 'dotenv/config';
import express from 'express';
import cors from 'cors'
import helmet from 'helmet';
import fs from 'fs';
import path from 'path';
import routes from './routes';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express'

// import { isAuthenticated } from './utils/isAuthenticated';

const app = express();

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
        url: "http://localhost:4002",

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

app.listen(4002, () => {
  console.log(`Example app listening on port 4002!`);
});

export default app;