import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '@office-booker/api/shared/services/prisma/data-access';
import { ApiUsersRepositoryDataAccessService } from '@office-booker/api/users/repository/data-access';
import { ApiUsersApiController } from './api-users-api.controller';


describe('ApiUsersApiController', () => {
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
      controllers: [ApiUsersApiController],
      providers: [ApiUsersRepositoryDataAccessService, ApiServiceProvider, PrismaService],
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
      admin: false
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

/*describe('ApiUsersApiController', () => {
  let controller: ApiUsersApiController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ApiUsersRepositoryDataAccessService, PrismaService],
      controllers: [ApiUsersApiController],
    }).compile();

    controller = module.get(ApiUsersApiController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});*/
