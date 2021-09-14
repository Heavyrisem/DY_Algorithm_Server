import express from 'express';

import middleware from './middleware/Default';
import cors from 'cors';

import './models/DB';


import ContainerRoute from './routes/Container';
import AccountRoute from './routes/Accounts';

const Server = express();

Server.use(cors());
Server.use(middleware.Parser);

Server.use('/compiler', ContainerRoute);
Server.use('/account', AccountRoute);

Server.listen(80, () => {
    console.log("Algorithm server online");
})