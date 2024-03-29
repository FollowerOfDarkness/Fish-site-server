import { NestFactory } from "@nestjs/core"
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger"
import { AppModule } from "./app.module"



async function start() {
	const PORT = process.env.PORT || 3000
	const app = await NestFactory.create(AppModule)
	app.enableCors()
	const config = new DocumentBuilder()
		.setTitle("Work for backend")
		.setDescription("Some text")
		.setVersion('1.0.0')
		.addTag('Viktor')
		.build()

	const document = SwaggerModule.createDocument(app, config)
	SwaggerModule.setup('/api/docs', app, document)
	await app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
}

start()