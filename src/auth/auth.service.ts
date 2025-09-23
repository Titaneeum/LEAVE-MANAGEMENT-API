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

  async register(body: { email: string; name: string; password: string }) {
    const user = await this.usersService.createUser(body);
    return { id: user.id, email: user.email, name: user.name };
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
    const storedHash = user && user.password;
    const isMatch = await bcrypt.compare(password, storedHash);

    if (user && isMatch) {
      return {
        userId: user.id,
        email: user.email,
        name: user.name,
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
