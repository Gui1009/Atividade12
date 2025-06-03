import React from 'react';
import { useNavigate } from 'react-router-dom';


function ControleProduto() {
  const navigate = useNavigate();

  return (
    <div className="controle-container">
      <h1 className="controle-titulo">Editor</h1>

      <div className="controle-botoes">
        <button onClick={() => navigate('/home/produtos/criar')} className="botao-controle">
          Criar Produto
        </button>
        <button onClick={() => navigate("/home/produtos/ler")} className="botao-controle">
          Ler Produtos
        </button>
        <button onClick={() => navigate("/home/produtos/editar")} className="botao-controle">
          Editar Produto
        </button>
        <button onClick={() => navigate("/home/produtos/remover")} className="botao-controle">
          Remover Produto
        </button>
        <button onClick={() => navigate('/home')} className="botao-controle">
          Voltar
        </button>
      </div>
    </div>
  );
}

export default ControleProduto;