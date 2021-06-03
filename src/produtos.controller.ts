import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { Produto } from './produto.model';
import { ProdutosService } from './produtos.service';

@Controller('produtos')
export class ProdutosController {

    constructor(private produtosService: ProdutosService) {

    }

    @Get()
    async obterTodosProdutos() {
        return this.produtosService.obterTodosProdutos();
    }

    @Get('/id/:id')
    async obterUmProduto(@Param() params) {
        return this.produtosService.obterUmProduto(params.id)
    }

    @Get('/semEstoque')
    async obterSemEstoque() {
        return this.produtosService.obterSemEstoque();
    }

    @Get('/maiorEstoque')
    async obterMaiorEstoque() {
        return this.produtosService.obterMaiorEstoque();
    }

   @Get('/menorEstoque')
    async obterMenorEstoque() {
        return this.produtosService.obterMenorEstoque();
    }

    @Get('/quantidade')
    async obterQuantidadeProdutosRegistrados() {
        return {"produtosRegistrados": await this.produtosService.obterQuantidadeProdutosRegistrados()}
    }

    @Post()
    async criarProduto(@Body() produto: Produto) {
        return this.produtosService.criarProduto(produto);
    }

    @Put()
    async alterarProduto(@Body() produto: Produto) {
        return this.produtosService.alterarProduto(produto);
    }

    @Delete(':id')
    async apagarProduto(@Param() params) {
        this.produtosService.apagarProduto(params.id);
    }

}