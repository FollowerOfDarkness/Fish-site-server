import { Post } from './../posts/posts.model';
import { UserRoles } from './../roles/user-roles.model';
import { Role } from './../roles/roles.model';
import { Model, Table, Column, DataType, BelongsToMany, HasMany } from "sequelize-typescript";
import { ApiProperty } from '@nestjs/swagger'

interface UserCreationAttrs {
	email: string
	password: string
}

@Table({
	tableName: 'users'
})
export class User extends Model<User, UserCreationAttrs> {
	@ApiProperty({ example: '1', description: 'Айди пользователя' })
	@Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
	id: number

	@ApiProperty({ example: 'юсерСобакаИмейл', description: 'Почта' })
	@Column({ type: DataType.STRING, unique: true, allowNull: false })
	email: string

	@ApiProperty({ example: '1324325', description: 'Пароль пользователя' })
	@Column({ type: DataType.STRING, allowNull: false })
	password: string

	@ApiProperty({ example: 'true', description: 'Забанен или нет' })
	@Column({ type: DataType.BOOLEAN, defaultValue: false })
	banned: boolean

	@ApiProperty({ example: 'За хулиганство', description: 'Причина блокировки' })
	@Column({ type: DataType.BOOLEAN, allowNull: true })
	banReason: string

	//Устанавливаем связь таблиц "многим ко многим"
	@BelongsToMany(() => Role, () => UserRoles)
	roles: Role[]

	@HasMany(() => Post)
	posts: Post[]



}