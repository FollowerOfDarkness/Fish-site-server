import { UserRoles } from './user-roles.model';
import { User } from './../users/users.model';
import { Role } from './roles.model';
import { Module } from '@nestjs/common';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
	controllers: [RolesController],
	providers: [RolesService],
	imports: [
		SequelizeModule.forFeature([Role, User, UserRoles])
	],
	exports: [
		RolesService
	]
})
export class RolesModule { }
