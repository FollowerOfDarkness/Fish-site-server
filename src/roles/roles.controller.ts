import { ValidationPipe } from './../pipes/validation.pipes';
import { CreateRoleDto } from './dto/create-role.dto';
import { RolesService } from './roles.service';
import { Controller, Post, Body, Get, Param, UsePipes } from '@nestjs/common';

@Controller('roles')
export class RolesController {
	constructor(private roleService: RolesService) { }
	@UsePipes(ValidationPipe)
	@Post()
	create(@Body() dto: CreateRoleDto) {
		return this.roleService.createRole(dto)
	}

	@Get('/:value')
	getByValue(@Param('value') value: string) {
		return this.roleService.getRoleByValue(value)
	}
}
