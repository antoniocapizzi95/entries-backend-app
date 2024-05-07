import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppService } from './app.service';
import { EntriesModule } from './entries/entries.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        uri: `mongodb://${config.get('MONGO_HOST')}:${config.get('MONGO_PORT')}/${config.get('MONGO_DBNAME')}`,
      }),
      inject: [ConfigService],
    }),
    EntriesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
