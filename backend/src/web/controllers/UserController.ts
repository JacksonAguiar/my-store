import { Request, Response } from "express";
import { UserDTO } from "src/application/dto/UserDTO";
import { MongoUserRepository } from "src/infra/persistence/repositories/MongoUserRepository";
import { SignInDTO } from "src/application/dto/SignInDTO";
import { UserSignInUseCase } from "src/application/use-cases/Users/user-signin-use-case";
import { UserSignUpUseCase } from "src/application/use-cases/Users/user-signup-use-case";

const userRepository = new MongoUserRepository();

export class UserController {
  async signUp(req: Request, res: Response): Promise<void> {
    try {
      const userSignUpUseCase = new UserSignUpUseCase(userRepository);
      const signUpDTO: UserDTO = req.body;

      await userSignUpUseCase.execute(signUpDTO);

      res.status(201).json("User created successfully");
    } catch (error: any) {
      res.status(500).json(error.message);
    }
  }

  async signIn(req: Request, res: Response): Promise<void> {
    try {
      const userSignInUseCase = new UserSignInUseCase(userRepository);
      const signInDTO: SignInDTO = req.body;

      var response = await userSignInUseCase.execute(signInDTO);
      res.status(200).json(response);

    } catch (error: any) {
      res.status(500).json(error.message);
    }
  }
}
