
import { UserEntity } from 'src/domain/entities/User';

export interface IUserRepository {
    create(product: UserEntity): Promise<void>;
    findByEmail(email: string): Promise<UserEntity | null>;
    findById(id: string): Promise<UserEntity | null>;
}
