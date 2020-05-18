import { uuid } from 'uuidv4';
import User from '@modules/users/infra/typeorm/entities/User';
import IUserRepostirotory from '@modules/users/repositories/IUserRepostirotory';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

class FakeUserRepository implements IUserRepostirotory {
    private users: User[] = [];

    public async findById(id: string): Promise<User | undefined> {
        return this.users.find(user => user.id === id);
    }

    public async findByEmail(email: string): Promise<User | undefined> {
        return this.users.find(user => user.email === email);
    }

    public async save(user: User): Promise<User> {
        const findIndex = this.users.findIndex(findUser => user.id === findUser.id);
        this.users[findIndex] = user;
        return user;
    }

    public async create(userData: ICreateUserDTO): Promise<User> {
        const user = new User();

        Object.assign(user, { id: uuid() }, userData);

        this.users.push(user);

        return user;
    }
}

export default FakeUserRepository;
