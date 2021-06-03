import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Produto } from './produto.model';
import { ProdutosController } from './produtos.controller';
import { ProdutosService } from './produtos.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    SequelizeModule.forRoot({
      dialect: 'mysql', // dialeto do banco de dados
      host: 'sql10.freemysqlhosting.net', // endereço do servidor do banco
      port: 3306, // porta do banco de dados
      username: process.env.USUARIO_BANCO_DADOS, // usuário do MySQL
      password: process.env.SENHA_BANCO_DADOS, // senha do usuário MySQL
      database: 'sql10416905', // nome do banco de dados
      autoLoadModels: true, // flag para definir se os modelos serão carregados automaticamente
      synchronize: true // flag para definir se os modelos serão sincronizados automaticamente
    }),

    /** Método @forFeature que definirá quais models que serão registrados no escopo atual*/
    /** Podemos injetar o @Produto dentro de ProdutosService*/ 
    SequelizeModule.forFeature([Produto])
  ],
  controllers: [AppController, ProdutosController],
  providers: [AppService, ProdutosService],
})
export class AppModule {}
