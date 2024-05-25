import { inject, injectable } from 'inversify';
import { v4 as uuidv4 } from 'uuid';
import { UserRepository } from '../../infrastructure/repositories/user.repository';
import { AuthHelper } from '../../infrastructure/helpers/auth.helper';
import { HttpBadRequestError } from '../../infrastructure/middlewares/http-error.middleware';
import UserCreationRequest from '../dtos/user/requests/user-creation.request';
import UserCreationResponse from '../dtos/user/responses/user-creation.response';
import UserLoginRequest from '../dtos/user/requests/user-login.request';
import { PaginationResponse } from '../../infrastructure/helpers/pagination.helper';
import UserUpdateRequest from '../dtos/user/requests/user-update.request';
import UserFindingByIdResponse from '../dtos/user/responses/user-finding-by-id.response';
import UserFindingResponse from '../dtos/user/responses/user-finding.response';
import UserFindingPagedResponse from '../dtos/user/responses/user-finding-paged.response';
import UserFindingPagedRequest from '../dtos/user/requests/user-finding-paged.request';
import UserLoginResponse from '../dtos/user/responses/user-login.response';

@injectable()
export class UserService {
  constructor(
    @inject(UserRepository) private readonly userRepository: UserRepository,
  ) { }

  public async findById(id: string): Promise<UserFindingByIdResponse> {
    const user = await this.userRepository.findById(id);

    if (!user)
      throw new HttpBadRequestError('User was not found.');

    const { name, email, creationDate, updateDate, username, role } = user;

    const response = {
      name,
      email,
      creationDate,
      updateDate,
      username,
      role
    };

    return response;
  }

  public async findAll(): Promise<UserFindingResponse[]> {
    const users = await this.userRepository.findAll();

    const response = users.map(({
      id,
      name,
      email,
      creationDate,
      updateDate,
      username,
      role
    }) => ({
      id,
      name,
      email,
      creationDate,
      updateDate,
      username,
      role
    }));

    return response;
  }

  public async findPaged(request: UserFindingPagedRequest): Promise<PaginationResponse<UserFindingPagedResponse>> {
    const [users, count] = await this.userRepository.findAndCount(request);

    const rows = users.map(({
      id,
      name,
      email,
      creationDate,
      updateDate,
      username,
      role
    }) => ({
      id,
      name,
      email,
      creationDate,
      updateDate,
      username,
      role
    }));


    return {
      rows,
      count
    };
  }

  public async create(request: UserCreationRequest): Promise<UserCreationResponse> {
    const encryptedPassword = await AuthHelper.hashPassword(request.password);

    const user = {
      ...request,
      id: uuidv4(),
      creationDate: new Date(),
      updateDate: new Date(),
      password: encryptedPassword,
    };


    await this.userRepository.insert(user);

    const { id } = user;

    const response = {
      id,
    };

    return response;
  }

  public async update(id: string, request: UserUpdateRequest): Promise<void> {
    const encryptedPassword = await AuthHelper.hashPassword(request.password);

    const user = await this.userRepository.findById(id);

    if (!user)
      throw new HttpBadRequestError('User was not found.');

    user.name = request.name;
    user.email = request.email;
    user.username = request.username;
    user.role = request.role;
    user.password = encryptedPassword;
    user.updateDate = new Date();

    await this.userRepository.update(user);
  }

  public async login(request: UserLoginRequest): Promise<UserLoginResponse> {
    const { username, password } = request;

    const user = await this.userRepository.findByUsername(username);

    if (!user)
      throw new HttpBadRequestError('User was not found.');

    const isMatch = await AuthHelper.comparePassword(
      password,
      user.password,
    );

    if (!isMatch)
      throw new HttpBadRequestError('Password provided is not valid.');

    const jwtPayload = {
      username: user.username,
      email: user.email,
      role: user.role,
    };

    const token = await AuthHelper.generateToken(jwtPayload);

    const response = {
      token
    };

    return response;
  }
}
