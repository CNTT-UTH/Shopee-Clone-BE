import { asClass, createContainer } from 'awilix';
import { UserService } from './services/users.service';
import { UserController } from './controllers/users.controller';
import { UserRepository } from './repository/user.repository';

const container = createContainer();

container.register({
     
     // USER MODULE:
     userRepository: asClass(UserRepository).singleton(),
     userService: asClass(UserService).singleton(),
     userController: asClass(UserController).singleton()

     
})

