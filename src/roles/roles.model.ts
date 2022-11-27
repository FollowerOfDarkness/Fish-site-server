import { UserRoles } from './user-roles.model';
import { User } from './../users/users.model';
import { Model, Table, Column, DataType, BelongsToMany } from "sequelize-typescript";
import { ApiProperty } from '@nestjs/swagger'

interface RoleCreationAttrs {
	value: string
	description: string
}

@Table({
	tableName: 'roles'
})
export class Role extends Model<Role, RoleCreationAttrs> {
	@ApiProperty({ example: '1', description: 'Айди пользователя' })
	@Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
	id: number

	@ApiProperty({ example: 'ADMIN', description: 'Users role' })
	@Column({ type: DataType.STRING, unique: true, allowNull: false })
	value: string

	@ApiProperty({ example: 'Some description', description: 'description users role' })
	@Column({ type: DataType.STRING, allowNull: false })
	description: string

	//Устанавливаем связь таблиц "многим ко многим"
	@BelongsToMany(() => User, () => UserRoles)
	users: User[]
}