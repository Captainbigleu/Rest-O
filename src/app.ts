import * as express from 'express';
import { myDataSource } from './app-data-source';
import { commandeRouter } from './routes/commandeRouter';
import { menuRouter } from './routes/menuRouter';
import { restaurantRouter } from './routes/restaurantRouter';
import { userRouter } from './routes/userRouter';
import { EStatus, TApiResponse } from './types/TStatus';
import * as path from 'path';

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
app.use('/', express.static(path.join(__dirname, '../public')));

// register routes
app.use('/api/restaurant', restaurantRouter);
app.use('/api/commande', commandeRouter);
app.use('/api/user', userRouter);
app.use('/api/menu', menuRouter);
app.use('/*', (req, res) => {
    res.status(404).json({
        status: EStatus.FAILED,
        message: 'Aucune route associée',
        data: null,
    } as TApiResponse);
});
// start express server
app.listen(3000);
