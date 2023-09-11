import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import process from 'process';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BeneficiarioModule } from './beneficiario/beneficiario.module';
import { EspecialidadeModule } from './especialidade/especialidade.module';
import { ConsultasModule } from './consultas/consultas.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      port: 5432,
      username: 'user',
      password: 'pass',
      database: "DB",
      synchronize: false,
      autoLoadEntities: true
    }),
    BeneficiarioModule,
    EspecialidadeModule,
    ConsultasModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
