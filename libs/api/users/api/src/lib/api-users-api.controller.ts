import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
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

    @Get("/")
    async getUsers() {
        return await this.userService.getUsers();
    }

    @Get("/:userId")
    async getUserById(@Param('userId') userId: number) {
        return await this.userService.getUserById(userId);
    }

    @Get("/company/:companyId")
    async getUsersByCompanyId(@Param('companyId') companyId: number) {
        return await this.userService.getUsersByCompanyId(companyId);
    }

    @Post("/:email")
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
        });
    }

    @Delete("/:userId")
    async deleteUser(@Param('userId') userId: number) {
        return await this.userService.deleteUser(userId);
    }

}
