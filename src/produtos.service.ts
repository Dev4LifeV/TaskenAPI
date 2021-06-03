import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Produto } from './produto.model';

@Injectable()
export class ProdutosService {
    constructor(
        /** Aqui é onde injetamos o model @Produto */
        @InjectModel(Produto)
        /** Finalmente, definimos a sua utilização */
        private produtoModel: typeof Produto
    ) {}

    /** @obterTodos Retorna todos os produtos do banco de dados*/
    async obterTodosProdutos() {
        return await this.produtoModel.findAll();
    }

    /** @obterUm Retorna o produto baseado no ID do banco de dados*/ 
    async obterUmProduto(id: number) {
        return this.produtoModel.findByPk(id);
    } 

    /** @criar Cria um novo produto no banco de dados somente se todos os atributos forem definidos corretamente */
    async criarProduto(produto: Produto) {
        if(produto.nomeProduto == undefined ||
            produto.quantidade == undefined ||
            produto.valor == undefined ||
            produto.fabricante == undefined) {
                throw new HttpException('Os dados enviados do produto são inválidos', HttpStatus.FORBIDDEN);
            } else {
                this.produtoModel.create(produto);
            }
    }

    /** @alterar edita um produto no banco de dados somente se todos os atributos forem definidos corretamente */
    async alterarProduto(produto: Produto) {
        if(produto.id == undefined ||
            produto.nomeProduto == undefined ||
            produto.quantidade == undefined ||
            produto.valor == undefined ||
            produto.fabricante == undefined) {
                throw new HttpException('Os dados enviados do produto são inválidos', HttpStatus.FORBIDDEN);
            } else {
                return this.produtoModel.update(produto, {
                    where: {
                        id: produto.id
                    },
                } 
        );
    }
}

    /** @apagar Apaga um produto baseado pelo seu ID */
    async apagarProduto(id: number) {
        const produto: Produto = await this.obterUmProduto(id);
        produto.destroy();
    }

    /** @obterQuantidadeProdutosRegistrados Retorna a quantidade de produtos registrados  */
    async obterQuantidadeProdutosRegistrados() {
        return this.produtoModel.count()
    }

    /** @obterSemEstoque Retorna os produtos que possuem estoque igual ou menor a cinco */
    async obterSemEstoque() {
        return this.produtoModel.findAndCountAll(
            {
                where: {
                    quantidade: '<= 5'
                }
            }
        )
    }

    /** @obterMenorEstoque Retorna o produto que possui o menor estoque */
    async obterMenorEstoque() {
        const quantidade = await this.produtoModel.min('quantidade');
        return this.produtoModel.findOne(
            {
                where: {
                    quantidade: quantidade,
                },
            }
        );
    }

    /** @obterMaiorEstoque Retorna o produto que possui o maior estoque */
    async obterMaiorEstoque() {
        const quantidade = await this.produtoModel.max('quantidade');
        return this.produtoModel.findOne(
            {
                where: {
                    quantidade: quantidade,
                },
            }
        );
    }
}