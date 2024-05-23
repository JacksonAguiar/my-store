import { UserEntity } from "src/domain/entities/User";
import { UserDTO } from "src/application/dto/UserDTO";
import { IUserRepository } from "src/domain/repositories/IUserRepository";
import { hash } from "bcryptjs";

export class UserSignUpUseCase {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async execute(dto: UserDTO): Promise<void> {

    const pass = await hash(dto.password, 10);
    
    const user = new UserEntity(
      dto.name,
      dto.email,
      dto.isAdmin,
      pass
    );

    await this.userRepository.create(user);
  }
}
