import UserToken from '@modules/users/infra/typeorm/entities/UserToken';
import IUsertTokenRepository from '@modules/users/repositories/IUsertTokenRepository';
import { getRepository, Repository } from 'typeorm';
import { uuid } from 'uuidv4';

class UserTokensRepository implements IUsertTokenRepository {
    private ormRepository: Repository<UserToken>;
    constructor() {
        this.ormRepository = getRepository(UserToken);
    }

    public async findByToken(token: string): Promise<UserToken | undefined> {
        const tokenUser = this.ormRepository.findOne({ where: { token } });
        return tokenUser;
    }

    public async generateToken(user_id: string): Promise<UserToken> {
        const userToken = this.ormRepository.create({ user_id, token: uuid() });

        await this.ormRepository.save(userToken);

        return userToken;
    }
}

export default UserTokensRepository;
