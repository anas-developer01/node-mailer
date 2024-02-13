import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailController } from './mail.controller';
import { MailService } from './mail.service';

@Module({
  imports: [MailerModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: async () => ({
      transport: {
        host: process.env.EMAIL_HOST,
        // port: config.get('EMAIL_PORT'),
        secure: false,
        auth: {
          user: process.env.EMAIL_USER,
          pass:process.env.EMAIL_PASSWORD,
        },
      },
      defaults: {
        from: 'adilmustafa006@gmail.com',
        to:"anasrasool702@gmail.com"
      },
      template: {
        // dir: join(__dirname, './templates'),
         dir: 'src/templates',
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true
        }
      }
    }),
    inject: [ConfigService]
  }), ConfigModule.forRoot()],
  controllers: [AppController, MailController],
  providers: [AppService, MailService],
})
export class AppModule {}
