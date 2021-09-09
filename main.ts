import express from 'express';

import middleware from './middleware/Default';

const Server = express();

Server.use(middleware.Parser);


