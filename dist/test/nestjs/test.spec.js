"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const src_1 = require("./../../src");
const database_module_1 = require("./modules/database.module");
const app_service_1 = require("./services/app.service");
describe('NestJS', () => {
    let app;
    let service;
    beforeAll(async () => {
        await (0, src_1.initializeSequelizeWithTransactionalContext)();
        app = await testing_1.Test.createTestingModule({
            imports: [database_module_1.DatabaseModule],
            providers: [app_service_1.AppService],
        }).compile();
        service = app.get(app_service_1.AppService);
    });
    afterAll(async () => {
        await app.close();
    });
    it('Creates a post using service', async (done) => {
        const post = await service.createPost();
        expect(post.id).toBeGreaterThan(0);
        done();
    });
    it('Fails creating a post using service', async (done) => {
        try {
            const post = await service.createPost(true);
        }
        catch (e) {
            expect(e.message).toBe('error occurred while creating posts');
            done();
        }
    });
});
//# sourceMappingURL=test.spec.js.map