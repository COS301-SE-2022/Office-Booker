import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '@office-booker/api/shared/services/prisma/data-access';
import { ApiUsersRepositoryDataAccessService } from '@office-booker/api/users/repository/data-access';
import { ApiUsersApiController } from './api-users-api.controller';
import { MailService } from '@office-booker/api/mail';
import { MailModule } from '@office-booker/api/mail';
import { ConfigModule, ConfigService } from '@nestjs/config';


describe('ApiUsersApiController Unit Tests', () => {
  let controller: ApiUsersApiController;
  let service: ApiUsersRepositoryDataAccessService;

  beforeAll(async () => {
    const ApiServiceProvider = {
      provide: ApiUsersRepositoryDataAccessService,
      useFactory: () => ({
        getUsers: jest.fn(() => []),
        getUserById: jest.fn(() => ({})),
        getUsersByCompanyId: jest.fn(() => []),
        createUser: jest.fn(() => ({})),
        updateUser: jest.fn(() => ({})),
        deleteUser: jest.fn(() => ({})),
      })
    }
    const app: TestingModule = await Test.createTestingModule({
      imports: [MailService, MailModule, ConfigModule.forRoot({
        isGlobal: true,
      })],
      controllers: [ApiUsersApiController],
      providers: [ApiUsersRepositoryDataAccessService, ApiServiceProvider, PrismaService, MailService, ConfigService],
    }).compile();
    controller = app.get<ApiUsersApiController>(ApiUsersApiController);
    service = app.get<ApiUsersRepositoryDataAccessService>(ApiUsersRepositoryDataAccessService);
  });

  it("calling getUsers method", () => {
    controller.getUsers();
    expect(service.getUsers).toHaveBeenCalled();
  })

  it("calling getUserById method", () => {
    const userId = 1;
    controller.getUserById(userId);
    expect(service.getUserById).toHaveBeenCalledWith(Number(userId));
  })

  it("calling getUsersByCompanyId method", () => {
    const companyId = 1;
    controller.getUsersByCompanyId(companyId);
    expect(service.getUsersByCompanyId).toHaveBeenCalledWith(Number(companyId));
  })

  it("calling createUser method", () => {
    const postData = {
      name: 'ying',
      companyId: 2,
      email: 'email',
      admin: false,
      guest: false
    }
    controller.createUser(postData);
    expect(service.createUser).toHaveBeenCalledWith({
      name: 'ying',
      company: {
        connect: {
          id: 2,
        }
      },
      email: 'email',
      guest: false,
      admin: false,
      currentRating: 5,
      ratingsReceived: 1,
    });
  })

  it("calling deleteUser method", () => {
    const userId = 1;
    controller.deleteUser(userId);
    expect(service.deleteUser).toHaveBeenCalledWith(Number(userId));
  })
});

describe('ApiUsersApiController Integration Tests', () => {
  let controller: ApiUsersApiController;
  let service: ApiUsersRepositoryDataAccessService;
  let id: number;

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [MailService, MailModule, ConfigModule.forRoot({
        isGlobal: true,
      })],
      controllers: [ApiUsersApiController],
      providers: [ApiUsersRepositoryDataAccessService, PrismaService, MailService, ConfigService],
    }).compile();
    controller = app.get<ApiUsersApiController>(ApiUsersApiController);
    service = app.get<ApiUsersRepositoryDataAccessService>(ApiUsersRepositoryDataAccessService);
  });

  it("calling getUsers method", async () => {
    const res = await controller.getUsers();
    expect(res.length).toBeGreaterThan(0);
  })

  it("calling getUserById method", async () => {
    const res = await controller.getUserById(5);
    expect(res).toEqual({
      id: 5,
      name: 'User 1',
      email: 'user1@gmail.com',
      companyId: 4,
      admin: false,
      guest: false,
      currentRating: 5,
      ratingsReceived: 1
    });
  })

  it("calling getUsersByCompanyId method", async () => {
    const res = await controller.getUsersByCompanyId(4);
    expect(res).toContain([
      {
        id: 5,
        name: 'User 1',
        email: 'user1@gmail.com',
        companyId: 4,
        admin: false,
        guest: false,
        currentRating: 5,
        ratingsReceived: 1
      },
      {
        id: 6,
        name: 'User 2',
        email: 'user2@gmail.com',
        companyId: 4,
        admin: false,
        guest: false,
        currentRating: 10,
        ratingsReceived: 3
      },
    ]);
  })

  it("calling createUser method", async () => {
    const postData = {
      name: 'Test User',
      companyId: 4,
      email: 'email',
      admin: false,
      guest: false
    }
    const res = await controller.createUser(postData);
    expect(res.name).toEqual('Test User');
    expect(res.email).toEqual('email');
    expect(res.companyId).toEqual(4);
    id = res.id
  })

  it("calling deleteUser method", async () => {
    await controller.deleteUser(id);
    const res = await controller.getUserById(id);
    expect(res).toBe(null);
  })
});