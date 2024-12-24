import { Test, TestingModule } from '@nestjs/testing';
import {
  initializeSequelizeWithTransactionalContext,
  SequelizeModule,
} from './../../src';
import { Post } from './models/post.model';
import { DatabaseModule } from './modules/database.module';
import { AppService } from './services/app.service';

describe('NestJS', () => {
  let app: TestingModule;
  let service: AppService;
  beforeAll(async () => {
    await initializeSequelizeWithTransactionalContext({
      dialect: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: 'postgres',
      database: 'test',
      models: [Post],
      // logging: (sql) => console.log(sql),
      logging: false,
      sync: {
        force: true,
      },
    });
    app = await Test.createTestingModule({
      imports: [SequelizeModule.forRoot(), DatabaseModule],
      providers: [AppService],
    }).compile();
    service = app.get<AppService>(AppService);
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
    } catch (e) {
      expect(e.message).toBe('error occurred while creating posts');
      done();
    }
  });
});
