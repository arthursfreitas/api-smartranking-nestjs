import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JogadoresModule } from './jogadores/jogadores.module';
import { CategoriasModule } from './categorias/categorias.module';
import { DesafiosService } from './desafios/desafios.service';
import { DesafiosController } from './desafios/desafios.controller';
import { DesafiosModule } from './desafios/desafios.module';
import { DesafiosModule } from './desafios/desafios.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://admin:fiipk2RGsXrV5ela@cluster01.2fzhk.gcp.mongodb.net/smartranking',
      {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      },
    ),
    JogadoresModule,
    CategoriasModule,
    DesafiosModule,
  ],
  controllers: [DesafiosController],
  providers: [DesafiosService],
})
export class AppModule {}
