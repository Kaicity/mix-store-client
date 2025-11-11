import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { LikesModule } from '@/modules/likes/likes.module';
import { UsersModule } from '@/modules/users/users.module';
import { Module } from '@nestjs/common';

import { OrdersModule } from '@/modules/orders/orders.module';
import { ReviewsModule } from '@/modules/reviews/reviews.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/passport/jwt-auth.guard';
import { ProductsModule } from './modules/products/products.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { AgenciesModule } from './modules/agencies/agencies.module';

@Module({
  imports: [
    // Modules bussiness
    UsersModule,
    LikesModule,
    OrdersModule,
    ReviewsModule,
    AuthModule,
    ProductsModule,
    CategoriesModule,
    PaymentsModule,
    AgenciesModule,

    // Config root module
    ConfigModule.forRoot({ isGlobal: true }),

    // Mongo config db
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),

    // Mailer
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: 'smtp.gmail.com',
          port: 465,
          secure: true,
          // ignoreTLS: true,
          // secure: false,
          auth: {
            user: configService.get<string>('MAIL_USER'),
            pass: configService.get<string>('MAIL_PASSWORD'),
          },
        },
        defaults: {
          from: '"No Reply" <no-reply@localhost>',
        },
        // preview: true,
        template: {
          dir: process.cwd() + '/src/mail/templates/',
          adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
