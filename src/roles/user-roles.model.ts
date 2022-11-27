import { Role } from './roles.model';
import { User } from '../users/users.model';
import { Model, Table, Column, DataType, BelongsToMany, ForeignKey } from "sequelize-typescript";
import { ApiProperty } from '@nestjs/swagger'



@Table({
	tableName: 'user_roles',
	createdAt: false,
	updatedAt: false
})
export class UserRoles extends Model<UserRoles> {

	@Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
	id: number

	//Указываем на какую таблицу ссылается данный ключ ForeignKey
	@ForeignKey(() => Role)
	@Column({ type: DataType.INTEGER })
	roleId: number

	//Указываем на какую таблицу ссылается данный ключ ForeignKey
	@ForeignKey(() => User)
	@Column({ type: DataType.INTEGER })
	userId: number

}