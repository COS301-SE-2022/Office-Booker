import { TestBed } from '@angular/core/testing';
import { Test } from '@nestjs/testing';
import { OfficeMakerService } from './office-maker.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../environments/environment';
import * as exp from 'constants';

describe('OfficeMakerService Unit Tests', () => {
  let service: OfficeMakerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [OfficeMakerService]
    });
    service = TestBed.inject(OfficeMakerService);
  });

  it('should call createDesk method', () => {
    service.createDesk = jest.fn();
    service.createDesk(1, 1, 1, 1, 1, false, 1);
    expect(service.createDesk).toHaveBeenCalledWith(1, 1, 1, 1, 1, false, 1);
  });

  it('should call getCompanies method', () => {
    service.getCompanies = jest.fn();
    service.getCompanies();
    expect(service.getCompanies).toHaveBeenCalled();
  });

  it('should call createWall method', () => {
    service.createWall = jest.fn();
    service.createWall(1, 1, 1, 1, 1);
    expect(service.createWall).toHaveBeenCalledWith(1, 1, 1, 1, 1);
  });

  it('should call getWallsByRoomId method', () => {
    service.getWallsByRoomId = jest.fn();
    service.getWallsByRoomId(5);
    expect(service.getWallsByRoomId).toHaveBeenCalledWith(5);
  });

  it('should call deleteDeskbyId method', () => {
    service.deleteDeskById = jest.fn();
    service.deleteDeskById(3);
    expect(service.deleteDeskById).toHaveBeenCalledWith(3);
  });

  it('should call deleteWallById method', () => {
    service.deleteWallById = jest.fn();
    service.deleteWallById(6);
    expect(service.deleteWallById).toHaveBeenCalledWith(6);
  });
});
