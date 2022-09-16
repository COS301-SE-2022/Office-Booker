import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiUsersRepositoryDataAccessService } from '@office-booker/api/users/repository/data-access';
import { MailService } from '@office-booker/api/mail';

class createUserDto {
    name: string;
    companyId: number;
    email: string;
    guest: boolean;
}

class emailDto {
    email: string;
}

class ratingDto {
    currentRating:   number;
    ratingsReceived: number;
}

@Controller('users')
export class ApiUsersApiController {
    constructor(private userService: ApiUsersRepositoryDataAccessService, private mailService: MailService) { }

    @UseGuards(AuthGuard('jwt'))
    @Get("/")
    async getUsers() {
        return await this.userService.getUsers();
    }

    @UseGuards(AuthGuard('jwt'))
    @Get("/:userId")
    async getUserById(@Param('userId') userId: number) {
        return await this.userService.getUserById(userId);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get("/companies/:companyId")
    async getUsersByCompanyId(@Param('companyId') companyId: number) {
        return await this.userService.getUsersByCompanyId(companyId);
    }


    //@UseGuards(AuthGuard('jwt'))
    @Post("/email")
    async getUserByEmail(@Body() emailDto: emailDto) {
        const { email } = emailDto;
        return await this.userService.getUserByEmail(email);
    }

    @Post('/')
    async createUser(@Body() postData: createUserDto) {
        console.log("Im here");
        const { name , companyId, email, guest } = postData;
        this.mailService.sendUserConfirmation(email);
        return await this.userService.createUser({
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
        return await this.userService.deleteUser(userId);
    }

    @Get("/ratings/:userId")
    async getRatingsForUser(@Param('userId') userId: number) {
        return await this.userService.getUserRating(userId);
    }

    @Put("/ratings/:userId")
    async updateRatingsForUser(@Param('userId') userId: number, @Body() ratingDto: ratingDto) {
        const { currentRating, ratingsReceived } = ratingDto;
        return await this.userService.updateUserRating(userId, currentRating, ratingsReceived);
    }
}
