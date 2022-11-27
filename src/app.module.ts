import { Post } from './posts/posts.model';
import { UserRoles } from './roles/user-roles.model';
import { Role } from './roles/roles.model';

import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { SequelizeModule } from '@nestjs/sequelize'
import { User } from "./users/users.model";
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { FilesModule } from './files/files.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';

@Module({
	controllers: [],
	providers: [],
	imports: [
		ConfigModule.forRoot({
			envFilePath: `.${process.env.NODE_ENV}.env`
		}),
		ServeStaticModule.forRoot({
			rootPath: path.resolve(__dirname, 'static'),
		}),
		SequelizeModule.forRoot({
			dialect: 'mysql',
			host: process.env.MYSQL_HOST,
			port: Number(process.env.MYSQL_PORT),
			username: process.env.MYSQL_NAME,
			// password: 'root',
			database: process.env.MYSQL_DB,
			models: [User, Role, UserRoles, Post],
			autoLoadModels: true,
		}),
		UsersModule,
		RolesModule,
		AuthModule,
		PostsModule,
		FilesModule,
	],
})
export class AppModule {



}