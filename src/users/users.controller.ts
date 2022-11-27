import { ValidationPipe } from './../pipes/validation.pipes';
import { BanUserDto } from './dto/ban-user.dto';
import { AddRoleDto } from './dto/add-role.dto';
import { RolesGuard } from './../auth/roles.guard';
import { Roles } from './../auth/roles-auth.decorator';
import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { User } from './users.model';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Controller, Post, Body, Get, UseGuards, UsePipes } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('users')
export class UsersController {


	constructor(private usersService: UsersService) { }

	@ApiOperation({ summary: "Create users" })
	@ApiResponse({ status: 200, type: User })
	@UsePipes(ValidationPipe)
	@Post()
	create(@Body() userDto: CreateUserDto) {
		return this.usersService.createUser(userDto)
	}

	@ApiOperation({ summary: 'Получить всех пользователей' })
	@ApiResponse({ status: 200, type: [User] })
	@Roles("ADMIN")
	@UseGuards(RolesGuard)
	@Get()
	getAll() {
		return this.usersService.getAllUsers();
	}

	@ApiOperation({ summary: 'Выдать роль пользователю' })
	@ApiResponse({ status: 200 })
	@Roles("ADMIN")
	@UseGuards(RolesGuard)
	@Post('/role')
	addRole(@Body() dto: AddRoleDto) {
		return this.usersService.addRole(dto);
	}

	@ApiOperation({ summary: 'Забанить пользователя' })
	@ApiResponse({ status: 200 })
	@Roles("ADMIN")
	@UseGuards(RolesGuard)
	@Post('/ban')
	ban(@Body() dto: BanUserDto) {
		return this.usersService.ban(dto);
	}
}
