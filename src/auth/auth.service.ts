import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

type AuthInput = { email: string; password: string };
type SignInData = { userId: number; email: string; name: string };
type AuthResult = {
  accessToken: string;
  userId: number;
  email: string;
  name: string;
};

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(body: {
    user_name: string;
    user_email: string;
    user_department: string;
    user_password: string;
    userlevel_id: number;
    user_profilePic: Buffer;
  }) {
    const user = await this.usersService.createUserwithBalance(body);
    return { message: 'User created successfully' };
  }

  async updateUser(
    id: number,
    body: {
      user_name?: string;
      user_email?: string;
      user_department?: string;
      user_password?: string;
      userlevel_id?: number;
      user_profilePic?: Buffer;
    },
  ) {
    const user = await this.usersService.updateUser(id, body);
    return { message: 'User updated successfully' };
  }

  async deleteUser(id: number) {
    return this.usersService.deleteUser(id);
  }

  async findUserById(id: number) {
    return this.usersService.findUserById(id);
  }

  async authenticate(input: AuthInput): Promise<AuthResult> {
    const user = await this.validateUser(input);

    if (!user) {
      throw new UnauthorizedException();
    }
    return this.signIn(user);
  }

  async validateUser(input: AuthInput): Promise<SignInData | null> {
    const user = await this.usersService.findUserByEmail(input.email);

    const password = input.password;
    const storedHash = user.user_password;
    const isMatch = await bcrypt.compare(password, storedHash);

    if (user && isMatch) {
      await this.usersService.updateLastLogin(user.user_id, {
        last_login: new Date(),
      });
      return {
        userId: user.user_id,
        email: user.user_email,
        name: user.user_name,
      };
    }
    return null;
  }

  async signIn(user: SignInData): Promise<AuthResult> {
    const tokenPayload = {
      sub: user.userId,
      email: user.email,
      name: user.name,
    };

    const accessToken = await this.jwtService.signAsync(tokenPayload);

    return {
      accessToken,
      email: user.email,
      userId: user.userId,
      name: user.name,
    };
  }
}
