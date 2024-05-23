import { IUserRepository } from 'src/domain/repositories/IUserRepository';
import { UserEntity } from 'src/domain/entities/User';
import UserModel from '../schemas/UserSchema';

export class MongoUserRepository implements IUserRepository {
    async create(user: UserEntity): Promise<void> {
        const userModel = new UserModel({
            name: user.getName(),
            email: user.getEmail(),
            isAdmin: user.getIsAdmin(),
            password: user.getPassword()
        });
        await userModel.save();
    }

    async findByEmail(email: string): Promise<UserEntity | null> {
        const userModel = await UserModel.findOne({ email });
        if (!userModel) {
            return null;
        }
        return new UserEntity(
            userModel.name,
            userModel.email,
            userModel.isAdmin,
            userModel.password,
            userModel.id
        );
    }
    async findById(id: string): Promise<UserEntity | null> {
        const userModel = await UserModel.findById(id);
        if (!userModel) {
            return null;
        }
        return new UserEntity(
            userModel.name,
            userModel.email,
            userModel.isAdmin,
            userModel.password,
            userModel.id
        );
    }

}
