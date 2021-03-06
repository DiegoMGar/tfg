import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/common';
import { ProductMongoModule } from '../../db/product-mongo/product-mongo.module';
import configuration from '../../config/configuration';
import { Mongoose } from 'mongoose';

describe('ProductController (e2e)', () => {
  let controller: ProductController;
  let connection: Mongoose;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          load: [configuration],
        }),
        HttpModule,
        ProductMongoModule,
      ],
      controllers: [ProductController],
      providers: [ProductService],
    }).compile();

    connection = module.get<'MONGODB_CONNECTION'>('MONGODB_CONNECTION') as any;
    controller = module.get<ProductController>(ProductController);
  });

  afterAll(async () => {
    await connection.connection.close();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
