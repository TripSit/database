import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { User } from './entity/User';

createConnection()
  .then(async (connection) => {
      const user = new User();
      await connection.manager.save(user);
      const users = await connection.manager.find(User);
  })
  .catch(error => console.log(error));
