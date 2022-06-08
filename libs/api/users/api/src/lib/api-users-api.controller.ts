import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiUsersRepositoryDataAccessService } from '@office-booker/api/users/repository/data-access';

class createUserDto {
    name: string;
    companyId: number;
    email: string;
}

class emailDto {
    email: string;
}

@Controller('users')
export class ApiUsersApiController {
    constructor(private userService: ApiUsersRepositoryDataAccessService) { }

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
    @Get("/company/:companyId")
    async getUsersByCompanyId(@Param('companyId') companyId: number) {
        return await this.userService.getUsersByCompanyId(companyId);
    }


    @UseGuards(AuthGuard('jwt'))
    @Post("/email")
    async getUserByEmail(@Body() emailDto: emailDto) {
        const { email } = emailDto;
        return await this.userService.getUserByEmail(email);
    }

    @Post('/')
    async createUser(@Body() postData: createUserDto) {
        const { name , companyId, email } = postData;
        return await this.userService.createUser({
            name: name,
            company: {
                connect: {
                    id: companyId,
                },
            },
            email: email,
            admin: false,
        });
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete("/:userId")
    async deleteUser(@Param('userId') userId: number) {
        return await this.userService.deleteUser(userId);
    }

}
