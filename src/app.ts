import * as express from 'express';
import { myDataSource } from './app-data-source';
import { commandeRouter } from './routes/commandeRouter';
import { restaurantRouter } from './routes/restaurantRouter';
//import { JwtPayload } from 'jsonwebtoken';
// establish database connection
myDataSource
    .initialize()
    .then(() => {
        console.log('Data Source has been initialized!');
    })
    .catch((err) => {
        console.error('Error during Data Source initialization:', err);
    });

// create and setup express app
const app = express();
app.use(express.json());

// register routes
app.use('/api/restaurant', restaurantRouter);
app.use('/api/commande', commandeRouter);
app.use('/*', (req, res) => {
    res.status(404).json({
        status: 'FAIL',
        message: "Ce nom de domaine n'existe pas",
        data: null,
    });
});
// start express server
app.listen(3000);
