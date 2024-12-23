"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const console_1 = require("console");
const src_1 = require("./../../src");
const post_model_1 = require("./models/post.model");
const database_module_1 = require("./modules/database.module");
const app_service_1 = require("./services/app.service");
describe('NestJS', () => {
    let app;
    let service;
    beforeAll(async () => {
        await (0, src_1.initializeSequelizeWithTransactionalContext)({
            dialect: 'postgres',
            host: 'localhost',
            port: 5433,
            username: 'postgres',
            password: 'postgres',
            database: 'test',
            models: [post_model_1.Post],
            logging: false,
            sync: {
                force: true,
            },
        });
        app = await testing_1.Test.createTestingModule({
            imports: [database_module_1.DatabaseModule],
            providers: [app_service_1.AppService],
        }).compile();
        service = app.get(app_service_1.AppService);
    });
    afterAll(async () => {
        await app.close();
    });
    it('Fails creating a post using service', async (done) => {
        try {
            (0, console_1.log)('first', service.createPost.name);
            const post = await service.createPost(true);
        }
        catch (e) {
            expect(e.message).toBe('error occurred while creating posts');
            done();
        }
    });
});
//# sourceMappingURL=test.spec.js.map