import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiUsersRepositoryDataAccessService } from '@office-booker/api/users/repository/data-access';
import { MailService } from '@office-booker/api/mail';

class CreateUserDto {
    name: string;
    companyId: number;
    email: string;
    guest: boolean;
}

class EmailDto {
    email: string;
}

class RatingDto {
    currentRating:   number;
    ratingsReceived: number;
}

class userDto {
    name: string;
}

@Controller('users')
export class ApiUsersApiController {
    constructor(private userService: ApiUsersRepositoryDataAccessService, private mailService: MailService) { }

    @UseGuards(AuthGuard('jwt'))
    @Get("/")
    async getUsers() {
        return this.userService.getUsers();
    }

    @UseGuards(AuthGuard('jwt'))
    @Get("/:userId")
    async getUserById(@Param('userId') userId: number) {
        return this.userService.getUserById(userId);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get("/companies/:companyId")
    async getUsersByCompanyId(@Param('companyId') companyId: number) {
        return this.userService.getUsersByCompanyId(companyId);
    }

    @Post("/email")
    async getUserByEmail(@Body() emailDto: EmailDto) {
        const { email } = emailDto;
        return this.userService.getUserByEmail(email);
    }

    @Post('/')
    async createUser(@Body() postData: CreateUserDto) {
        const { name , companyId, email, guest } = postData;

        this.mailService.sendUserConfirmation(email);
        return this.userService.createUser({
            name: name,
            company: {
                connect: {
                    id: companyId,
                },
            },
            email: email,
            admin: false,
            guest: guest,
            currentRating: 5,
            ratingsReceived: 1,
        });
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete("/:userId")
    async deleteUser(@Param('userId') userId: number) {
        return this.userService.deleteUser(userId);
    }

    @Get("/ratings/:userId")
    async getRatingsForUser(@Param('userId') userId: number) {
        return this.userService.getUserRating(userId);
    }

    @Put("/ratings/:userId")
    async updateRatingsForUser(@Param('userId') userId: number, @Body() ratingDto: RatingDto) {
        const { currentRating, ratingsReceived } = ratingDto;
        return this.userService.updateUserRating(userId, currentRating, ratingsReceived);
    }

    @UseGuards(AuthGuard('jwt'))
    @Put("/name/:userId")
    async changeUserName(@Param('userId') userId: number, @Body() postData: userDto) {
        const { name } = postData;
        return this.userService.changeUserName(userId, name);
    }
}
