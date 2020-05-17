import User from '@modules/users/infra/typeorm/entities/User';
import IUserRepostirotory from '@modules/users/repositories/IUserRepostirotory';
import { getRepository, Repository } from 'typeorm';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

// to implement all methods of repository(createm findOne, save ...) its only use extends Repository<Appointment>
// @EntityRepository(Appointment)

class UserRepository implements IUserRepostirotory {
    private ormRepository: Repository<User>;
    constructor() {
        this.ormRepository = getRepository(User);
    }

    public async findById(id: string): Promise<User | undefined> {
        return this.ormRepository.findOne(id);
    }

    public async findByEmail(email: string): Promise<User | undefined> {
        return this.ormRepository.findOne({ where: { email } });
    }

    public async save(user: User): Promise<User> {
        return this.ormRepository.save(user);
    }

    public async create(userData: ICreateUserDTO): Promise<User> {
        const user = this.ormRepository.create(userData);
        await this.ormRepository.save(user);
        return user;
    }
}

export default UserRepository;
