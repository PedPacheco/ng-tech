import cors from 'cors';
import express from 'express';

import { verifyJwt } from './middleware/verifiedJwt/verifyJwt';
import { routes } from './server/routes/routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(verifyJwt)

app.listen(3333, () => {
  console.log("Server is running on PORT 3333");
});