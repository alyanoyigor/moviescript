import { Service } from 'typedi';
import jwt from 'jsonwebtoken';
import { Document } from 'mongoose';
import { UserLogin, UserRegister, User } from '../types';
import UserModel from '../models/user.model';

const { JWT_SECRET } = process.env;

@Service()
class AuthService {
  constructor(private userModel: UserModel) {}

  public async loginUser(params: UserLogin) {
    const user = await this.userModel.findUserByEmail(params.email);
    if (!user) {
      throw new Error('User not found');
    }

    const isValid = await this.userModel.comparePassword(
      params.password,
      user.password
    );

    if (!isValid) {
      throw new Error('Invalid password');
    }

    const token = await this.generateToken(user);
    user.token = token;
    await user.save();

    return token;
  }

  public async registerUser(params: UserRegister) {
    const existedUser = await this.userModel.findUserByEmail(params.email);
    if (existedUser) {
      throw new Error('User already exists');
    }

    const hashedPassword = await this.userModel.hashPassword(params.password);
    return await this.userModel.createUser({
      name: params.name,
      email: params.email,
      password: hashedPassword,
      movies: [],
      categories: [],
    });
  }

  public async logoutUser(user: Document<unknown, any, User> & User) {
    user.token = '';
    await user.save();
    return user;
  }

  public verifyToken(token: string) {
    if (!JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined');
    }
    return jwt.verify(token, JWT_SECRET) as { id: string };
  }

  public findUserById(id: string) {
    return this.userModel.findUserById(id);
  }

  private async generateToken(user: User) {
    if (!JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined');
    }
    return await jwt.sign({ id: user._id }, JWT_SECRET, {
      expiresIn: '1h',
    });
  }
}

export default AuthService;
