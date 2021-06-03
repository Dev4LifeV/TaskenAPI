import { Table, Model, Column, DataType } from 'sequelize-typescript';

@Table
export class Produto extends Model<Produto> {

    @Column({
        type: DataType.STRING(60),
        allowNull: false
    })
    nomeProduto: string;

    @Column({
        type: DataType.STRING(60),
        allowNull: false
    })
    fabricante: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    quantidade: number;

    @Column({
        type: DataType.DECIMAL(9, 2),
        allowNull: false
    })
    valor: number;
}