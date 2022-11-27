import { BanUserDto } from './dto/ban-user.dto';
import { AddRoleDto } from './dto/add-role.dto';
import { RolesService } from './../roles/roles.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';

@Injectable()
export class UsersService {

	constructor(@InjectModel(User) private userRepository: typeof User,
		private roleService: RolesService) { }

	async createUser(dto: CreateUserDto) {
		const user = await this.userRepository.create(dto)
		//Подтягиваем роль перед тем как записать роль юсеру
		const role = await this.roleService.getRoleByValue('ADMIN')

		//set позволяет перезаписать какое-либо поле и сразу обновить его в БД
		await user.$set('roles', [role.id])
		user.roles = [role]
		return user
	}

	async getAllUsers() {
		//В методе параметром передали include all:true чтобы подтянуть все поля которые хоть как-то связаны с юсерами.
		const users = await this.userRepository.findAll({ include: { all: true } })
		return users
	}

	async getUserByEmail(email: string) {
		const user = await this.userRepository.findOne({ where: { email }, include: { all: true } })
		return user
	}

	async addRole(dto: AddRoleDto) {
		const user = await this.userRepository.findByPk(dto.userId)
		const role = await this.roleService.getRoleByValue(dto.value)
		if (role && user) {
			//Указываем что мы хотим нашему пользователю добавить поле role со значением role.id
			await user.$add('role', role.id)
			return dto
		}

		throw new HttpException("Пользователь или роль не найдены", HttpStatus.NOT_FOUND)
	}
	async ban(dto: BanUserDto) {
		const user = await this.userRepository.findByPk(dto.userId)
		user.banned = true
		user.banReason = dto.banReason
		await user.save()
		return user
	}
}
