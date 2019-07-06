export interface UsuarioDTO {
    id: number;
    nome: string;
    email: string;
    senha: string;
}


export interface LoginDTO {
    email: string,
    senha: string
}


export interface ProdutoDTO {
    nome: string,
    descricao: string,
    data_entrada: Date,
    data_validade: Date,
    valor_compra: number,
    valor_venda: number,
    quantidade: number
}