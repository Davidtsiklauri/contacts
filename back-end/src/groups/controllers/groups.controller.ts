import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { GroupsService } from '../services/groups.service';
import { JwtAuthGuard } from 'src/auth/auth/jwt-auth.guard';

@Controller('groups')
export class GroupsController {
    constructor(private groupsService: GroupsService){}

    @UseGuards(JwtAuthGuard)
    @Post()
    createGroup(@Body() body: any, @Req() {user}){
        return this.groupsService
                   .createGroup({...body, user_id: user.userId});
    };
    
    @UseGuards(JwtAuthGuard)
    @Get('all')
    getAll(@Req() {user} ){
        if(user && user.userId) {
            const groups = this.groupsService
                              .getAllGroups(user.userId)
                              .then(data => data).catch(err => console.log(err));
            return groups;
        }
    };

}
