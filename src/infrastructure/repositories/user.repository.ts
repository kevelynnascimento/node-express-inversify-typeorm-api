import { injectable } from 'inversify';
import { InsertResult, Repository, UpdateResult } from 'typeorm';
import { UserEntity } from '../../domain/entities/user.entity';
import { DatabaseConfig } from '../configs/database.config';
import { PaginationHelper, PaginationRequest } from '../helpers/pagination.helper';

@injectable()
export class UserRepository {
  private repository: Repository<UserEntity>;

  constructor() {
    this.repository = DatabaseConfig.getConnection().getRepository(UserEntity);
  }

  public async findAll(): Promise<UserEntity[]> {
    return this.repository.find();
  }

  public async findById(id: string): Promise<UserEntity> {
    return this.repository.findOneBy({ id });
  }

  async findAndCount(paginationRequest: PaginationRequest): Promise<[UserEntity[], number]> {
    const pagination = PaginationHelper.get(paginationRequest);

    const result = await this.repository.findAndCount({
      ...pagination,
      where: {}
    });

    return result;
  }

  public async findByUsername(username: string): Promise<UserEntity | null> {
    return this.repository.findOneBy({ username });
  }

  public async update(user: UserEntity): Promise<UpdateResult> {
    return this.repository.update({ id: user.id }, user);
  }

  public async insert(user: UserEntity): Promise<InsertResult> {
    return this.repository.insert(user);
  }

  public async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
