import express from 'express';

import middleware from './middleware/Default';
import './models/DB';


import ContainerRoute from './routes/Container';

const Server = express();

Server.use(middleware.Parser);

Server.use('/compiler', ContainerRoute);

Server.listen(80, () => {
    console.log("Algorithm server online");
})