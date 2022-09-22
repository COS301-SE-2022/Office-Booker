import { Test } from '@nestjs/testing';
import { PrismaService } from '@office-booker/api/shared/services/prisma/data-access';
import { ApiUsersRepositoryDataAccessService } from './api-users-repository-data-access.service';
import exp = require('constants');
import * as crypto from 'crypto';
import { ApiCompaniesRepositoryDataAccessService } from '@office-booker/api/companies/repository/data-access';

describe('ApiUsersRepositoryDataAccessService', () => {
  let service: ApiUsersRepositoryDataAccessService;
  let prisma;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ApiUsersRepositoryDataAccessService, PrismaService],
    }).compile();
    service = module.get<ApiUsersRepositoryDataAccessService>(ApiUsersRepositoryDataAccessService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  describe('getUsers', () => {
    it('should return an array of users', async () => {
      const users = [
        {
          id: 1,
          name: 'test',
          email: 'test@gmail.com',
          companyId: 2,
        },
        {
          id: 2,
          name: 'test2',
          email: 'tes2@gmail.com',
          companyId: 2,
        },
        {
          id: 3,
          name: 'test3',
          email: 'test3@gmail.com',
          companyId: 1,
        },
      ];
      prisma.employee.findMany = jest.fn().mockReturnValue(users);
      const result = await service.getUsers();
      expect(result).toEqual(users);
    });
  });

  describe('getUserById', () => {
    it('should return a user', async () => {
      const user = {
        name: 'test',
        email: 'test@gmail.com',
        id: 1,
        companyId: 2,
      };
      prisma.employee.findUnique = jest.fn().mockReturnValue(user);
      const result = await service.getUserById(1);
      expect(result).toEqual(user);
    });
  });

  describe('getUsersByCompanyId', () => {
    it('should return an array of users', async () => {
      const users = [
        {
          id: 1,
          name: 'test',
          email: 'test@gmail.com',
          companyId: 2,
        },
        {
          id: 2,
          name: 'test2',
          email: 'tes2@gmail.com',
          companyId: 2,
        },
        {
          id: 3,
          name: 'test3',
          email: 'test3@gmail.com',
          companyId: 1,
        },
      ];
      prisma.employee.findMany = jest.fn().mockReturnValue(users);
      const result = await service.getUsersByCompanyId(2);
      expect(result).toEqual(users);
    });
  });

  describe('createUser', () => {
    it('should create a user', async () => {
      const user = {
        name: 'test',
        company: null,
        Bookings: null,
        email: 'test',
        admin: false,
        guest: false,
        currentRating: 5,
        ratingsReceived: 1
      };
      prisma.employee.create = jest.fn().mockReturnValueOnce(user);
      expect(await service.createUser(user)).toEqual(user);
    });
  });

});


describe('ApiUsersRepositoryDataAccessService Integration Tests', () => {
  let service: ApiUsersRepositoryDataAccessService;
  let companyService: ApiCompaniesRepositoryDataAccessService;
  let prisma;
  let testCompany;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ApiUsersRepositoryDataAccessService, ApiCompaniesRepositoryDataAccessService, PrismaService],
    }).compile();

    service = module.get<ApiUsersRepositoryDataAccessService>(ApiUsersRepositoryDataAccessService);
    companyService = module.get<ApiCompaniesRepositoryDataAccessService>(ApiCompaniesRepositoryDataAccessService);
    prisma = module.get<PrismaService>(PrismaService);
    testCompany = await companyService.getCompanyById(1);
    
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });

  it('should get all users', async () => {
    const users = await service.getUsers();
    expect(users.length).toBeGreaterThan(0);
  });

  it('should get a user by id', async () => {
    const user = {
      name: 'Test User',
      company: {
        connect: {
            id: 4,
        },
      },
      Bookings: undefined,
      email: 'testuser1@gmail.com',
      admin: false,
      guest: false,
      currentRating: 5,
      ratingsReceived: 1
    };
    const result = await service.createUser(user);
    const foundUser = await service.getUserById(result.id);
    expect(foundUser).toEqual(result);
    await service.deleteUser(result.id);
  });

  it('should get a user by email', async () => {
    const user = {
      name: 'Test User',
      company: {
        connect: {
            id: 4,
        },
      },
      Bookings: undefined,
      email: 'testuser1@gmail.com',
      admin: false,
      guest: false,
      currentRating: 5,
      ratingsReceived: 1
    };
    const result = await service.createUser(user);
    const foundUser = await service.getUserByEmail(result.email);
    expect(foundUser).toEqual(result);
    await service.deleteUser(result.id);

  });

  it('should get all users by company id', async () => {
    const users = await service.getUsersByCompanyId(1);
    expect(users.length).toBeGreaterThan(0);
  });

  it('should create a user', async () => {
    const user = {
      name: 'test',
      company: {
        connect: {
            id: testCompany.id,
        },
      },
      Bookings: undefined,
      email: 'test',
      admin: false,
      guest: false,
      currentRating: 5,
      ratingsReceived: 1
    };
    const result = await service.createUser(user);
    
    expect(result.admin).toEqual(user.admin);
    expect(result.currentRating).toEqual(user.currentRating);
    expect(result.email).toEqual(user.email);
    expect(result.guest).toEqual(user.guest);
    expect(result.ratingsReceived).toEqual(user.ratingsReceived);
    expect(result.name).toEqual(user.name);

    await service.deleteUser(result.id);

  });

  it('should delete a user', async () => {
    const user = {
      name: 'test',
      company: {
        connect: {
            id: testCompany.id,
        },
      },
      Bookings: undefined,
      email: 'test',
      admin: false,
      guest: false,
      currentRating: 5,
      ratingsReceived: 1
    };
    const result = await service.createUser(user);
    const deletedUser = await service.deleteUser(result.id);
    expect(deletedUser).toEqual(result);
  });

  it('should get a users rating', async () => {
    const user = {
      name: 'test',
      company: {
        connect: {
            id: testCompany.id,
        },
      },
      Bookings: undefined,
      email: 'test',
      admin: false,
      guest: false,
      currentRating: 5,
      ratingsReceived: 1
    };
    const result = await service.createUser(user);
    const rating = await service.getUserRating(result.id);
    expect(rating.currentRating).toEqual(result.currentRating);
    await service.deleteUser(result.id);
  });

  it('should update a users rating', async () => {
    const user = {
      name: 'test',
      company: {
        connect: {
            id: testCompany.id,
        },
      },
      Bookings: undefined,
      email: 'test',
      admin: false,
      guest: false,
      currentRating: 5,
      ratingsReceived: 1
    };
    const result = await service.createUser(user);
    const updatedUser = await service.updateUserRating(result.id, 9 , 2);
    expect(updatedUser.currentRating).toEqual(9);
    await service.deleteUser(result.id);
  });




});