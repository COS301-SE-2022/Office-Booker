import { TestBed } from '@angular/core/testing';
import { BookingServiceService } from './booking-service.service';
import { HttpClientModule } from '@angular/common/http';
describe('BookingServiceService Unit Tests', () => {
  let service: BookingServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [BookingServiceService]
    });
    service = TestBed.inject(BookingServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getAllRooms method', () => {
    service.getAllRooms = jest.fn();
    service.getAllRooms();
    expect(service.getAllRooms).toHaveBeenCalled();
  })

  it('should call getInvitesForBooking method', () => {
    service.getInvitesForBooking = jest.fn();
    service.getInvitesForBooking(1);
    expect(service.getInvitesForBooking).toHaveBeenLastCalledWith(1);
  });

  it('should call getRoomByID method', () => {
    service.getRoomByID = jest.fn();
    service.getRoomByID(5);
    expect(service.getRoomByID).toHaveBeenCalledWith(5);
  });

  it('should call getDesksByRoomId method', () => {
    service.getDesksByRoomId = jest.fn();
    service.getDesksByRoomId(10);
    expect(service.getDesksByRoomId).toHaveBeenCalledWith(10);
  });

  it('should call getAllDesks method', () => {
    service.getAllDesks = jest.fn();
    service.getAllDesks();
    expect(service.getAllDesks).toHaveBeenCalled();
  });

  it('should call getFacilitiesByDeskId method', () => {
    service.getFacilitiesByDeskId = jest.fn();
    service.getFacilitiesByDeskId(3);
    expect(service.getFacilitiesByDeskId).toHaveBeenCalledWith(3);
  })

});
