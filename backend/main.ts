import { app, startServer } from './cmd/server';
import { sequelize } from './config/db';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 5000;

startServer().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    sequelize.sync({ alter: true });
  });
});
