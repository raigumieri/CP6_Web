import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form'
import { ListaPedidos } from "../components/ListaPedidos";
import '../routes/InserirPedido.css';


export default function InserirPedido(){

        /* Montagem do 'Inserir Pedido' */
    
        const navigate = useNavigate();

        let novoId= ListaPedidos[ListaPedidos.length - 1].id + 1;

        const [pedido, setPedido] = useState({
            id:novoId,
            cep:'',
            nome: '',
            quantidade: '',
            valor: '',
        });

        const handleSubmit = (e) => {

            e.preventDefault();

            ListaPedidos.push(pedido);
            navigate('/pedido');
        };

        const handleChange = (e) => {
            e.preventDefault();

            const{ name, value } = e.target;

            setPedido({ ...pedido, [name]: value });
        };

        /*Montagem de Inserir CEP */
        /*Função que cria os metodos register e handleSubimit para chamar o form e validar */
        const {register,setValue, setFocus,} = useForm();

        function buscarCep(e){
            const cep = e.target.value.replace(/\D/g,'');
            fetch(`https://viacep.com.br/ws/${cep}/json/`)
              .then((res)=> res.json())
              .then((dados)=> {
                setValue('rua', dados.logradouro);
                setValue('bairro', dados.bairro);
                setValue('cidade', dados.localidade);
                setFocus('numero');
              });
          }

    return(
        <>
            <section className="sessao_pedido">
                <h1> Inserir Pedidos </h1>
                <form onSubmit={handleSubmit}>
                        <fieldset> 
                            <section>          
                                <p>
                                    <label htmlFor="idNome" id="nome"> Nome do Pedido </label>
                                    <input type="text" name="nome" id="idNome" value={pedido.nome} onChange={handleChange} />
                                </p>

                                <p>
                                    <label htmlFor="idDesc" id="descricao"> Quantidade do Pedido </label> 
                                    <input type="text" name="quantidade" id="idDesc" value={pedido.quantidade} onChange={handleChange} />
                                </p>

                                <p>
                                    <label htmlFor="idValor" id="valores"> Valor do Pedido </label> 
                                    <input type="text" name="valor" id="idValor" value={pedido.valor} onChange={handleChange} />
                                </p>
                            </section>

                            <section  className="bloco2"> 
                                <label> CEP: <input type="text" {...register('cep')} onBlur={buscarCep} value={pedido.cep} onChange={handleChange} /> </label>
                                <label> RUA: <input type="text" {...register('rua')}/> </label>
                                <label> BAIRRO: <input type="text" {...register('bairro')}/> </label>
                                <label> CIDADE: <input type="text" {...register('cidade')}/> </label> 
                                <label> NUMERO: <input type="text" {...register('numero')}/> </label>
                            </section>      
                        </fieldset>
                    <div className="button_cadastrar">
                        <button type="submit"> CADASTRAR </button>
                        <button type="reset"> Limpar </button>
                    </div>
                </form>
            </section>
        </>
    );
}