import { uuid } from 'uuidv4';
import User from '@modules/users/infra/typeorm/entities/User';
import IUsertTokenRepository from '@modules/users/repositories/IUsertTokenRepository';
import UserToken from '@modules/users/infra/typeorm/entities/UserToken';

class FakeUsertTokenRepository implements IUsertTokenRepository {
    private usersTokens: UserToken[] = [];

    public async generateToken(user_id: string): Promise<UserToken> {
        const userToken = new UserToken();

        Object.assign(userToken, {
            user_id,
            token: uuid(),
            created_at: new Date(),
            updated_at: new Date(),
        });

        this.usersTokens.push(userToken);

        return userToken;
    }

    public async findByToken(token: string): Promise<UserToken | undefined> {
        const userToken = this.usersTokens.find(
            findToken => findToken.token === token,
        );
        return userToken;
    }
}

export default FakeUsertTokenRepository;
