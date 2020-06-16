import { Controller, Post, Body, Param, Get, UseGuards, Req } from '@nestjs/common';
import { GroupsService } from '../services/groups.service';
import { JwtAuthGuard } from 'src/auth/auth/jwt-auth.guard';

@Controller('groups')
export class GroupsController {
    constructor(private groupsService: GroupsService){}

    @UseGuards(JwtAuthGuard)
    @Post()
    createGroup(@Body() body: any){
        return this.groupsService.createGroup(body);
    };
    
    @UseGuards(JwtAuthGuard)
    @Get('all')
    getAll(@Req() {user_id} ){
        if(user_id) {
            return this.groupsService.getAllGroups(user_id);
        }
    };

}
