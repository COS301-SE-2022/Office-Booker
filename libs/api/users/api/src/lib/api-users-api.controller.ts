import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiUsersRepositoryDataAccessService } from '@office-booker/api/users/repository/data-access';

class createUserDto {
    name: string;
    companyId: number;
}

@Controller('api-users-api')
export class ApiUsersApiController {
    constructor(private userService: ApiUsersRepositoryDataAccessService) {}

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

    @Post('/')
    async createUser(@Body() postData: createUserDto) {
        return await this.userService.createUser({
            name: postData.name,
            company: {
                connect: {
                    id: postData.companyId,
                },
            }
        });
    }

    @Delete("/:userId")
    async deleteUser(@Param('userId') userId: number) {
        return await this.userService.deleteUser(userId);
    }

}
