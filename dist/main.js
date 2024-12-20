"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app/app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        methods: ['POST', 'GET', 'PUT', 'DELETE'],
        origin: [
            'http://localhost:3000',
            'http://127.0.0.1:3000',
            'https://staging.fanam-pay.fanamdigital.com',
        ],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true,
    });
    const globalPrefix = 'api';
    app.setGlobalPrefix(globalPrefix);
    const port = 3333;
    const swaggerConfig = new swagger_1.DocumentBuilder()
        .setTitle('Fanam Pay Passkey Service')
        .setDescription('Fanam pay Passkey Service is the way to ease your project authentication')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, swaggerConfig);
    swagger_1.SwaggerModule.setup('api/swagger', app, document);
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        exceptionFactory: (validationErrors = []) => {
            if (validationErrors.length) {
                return new common_1.BadRequestException({
                    status_code: 400,
                    status: 'Error',
                    message: 'Invalid request',
                    result: null,
                    error: validationErrors.map((error) => ({
                        field: error.property,
                        response: Object.values(error.constraints).join(', '),
                    }))[0],
                });
            }
        },
    }));
    await app.listen(port);
    common_1.Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
}
bootstrap();
//# sourceMappingURL=main.js.map