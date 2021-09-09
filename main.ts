import express from 'express';

import middleware from './middleware/Default';
import './models/DB';


import ContainerRoute from './routes/Container';
import AccountRoute from './routes/Accounts';

const Server = express();

Server.use(middleware.Parser);

Server.use('/compiler', ContainerRoute);
Server.use('/account', AccountRoute);

Server.listen(80, () => {
    console.log("Algorithm server online");
})