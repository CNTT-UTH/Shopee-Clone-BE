import { Express } from 'express';
import homeRoutes from './home.routes';
import authRoutes from './auth.routes';
import userRoutes from './user.routes';
import shopRoutes from './shop.routes';
import cateRoutes from './category.routes';
import addressRoutes from './address.routes';
import productRoutes from './product.routes';

export const initWebRoutes = (app: Express) => {
    app.use('/api/v1/home', homeRoutes);
    app.use('/api/v1/auth', authRoutes);
    app.use('/api/v1/users', userRoutes);
    app.use('/api/v1/shops', shopRoutes);
    app.use('/api/v1/categories', cateRoutes);
    app.use('/api/v1/addresses', addressRoutes);
    app.use('/api/v1/products', productRoutes);
};
