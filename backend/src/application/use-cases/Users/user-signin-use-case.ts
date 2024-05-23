import { SignInDTO } from "src/application/dto/SignInDTO";
import { IUserRepository } from "src/domain/repositories/IUserRepository";
import { compare } from "bcryptjs";

import { AppEnviroment } from "src/infra/config/enviroment";
import { UserEntity } from "src/domain/entities/User";

import jwt from "jsonwebtoken";

const generateToken = (data: string): string => {
  const expiresIn = "2d";
  return jwt.sign({ data }, AppEnviroment.JWT_SECRET, { expiresIn });
};

export class UserSignInUseCase {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async execute(dto: SignInDTO): Promise<{ user: UserEntity; token: string }> {
    const user = await this.userRepository.findByEmail(dto.email);

    if (!user) throw new Error("Usuario não encontrado");
    
    const match = await compare(dto.password, user.getPassword());

    if (!match) throw new Error("Senha incorreta");

    delete (user as any).password;

    const token = generateToken(JSON.stringify(user));

    return { user, token };
  }
}
