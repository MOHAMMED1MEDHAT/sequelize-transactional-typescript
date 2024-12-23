"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const post_model_1 = require("../models/post.model");
const src_1 = require("./../../../src");
let AppService = class AppService {
    constructor(repository) {
        this.repository = repository;
    }
    async createPost(fails = false) {
        return await this.testTransactionIsolated(fails);
    }
    async testTransactionIsolated(fails) {
        const post = await this.repository.createOne({
            message: 'halla walla 1',
        });
        await this.createHalla(fails);
        return post.dataValues;
    }
    async createHalla(fails) {
        await this.repository.createOne({
            message: 'halla walla 2',
        });
        if (fails)
            throw new Error('error occurred while creating posts');
    }
};
exports.AppService = AppService;
__decorate([
    (0, src_1.Transactional)({
        isolationLevel: 'READ COMMITTED',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean]),
    __metadata("design:returntype", Promise)
], AppService.prototype, "createPost", null);
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(post_model_1.RepositoryTokens.PostRepository)),
    __metadata("design:paramtypes", [Object])
], AppService);
//# sourceMappingURL=app.service.js.map