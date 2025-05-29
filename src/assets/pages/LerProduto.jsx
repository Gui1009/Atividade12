
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function LerProduto({ produtos }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const produto = produtos.find((p) => p.id === parseInt(id));

  if (!produto) {
    return <p>Produto não encontrado.</p>;
  }

  return (
    <div className="container">
      <h2>Detalhes do Produto</h2>
      <p><strong>Nome:</strong> {produto.nome}</p>
      <p><strong>Valor:</strong> R$ {parseFloat(produto.valor).toFixed(2)}</p>
      <img src={produto.imagem} alt={produto.nome} width="200" />
      <br />
      <button onClick={() => navigate("/produtos")}>Voltar</button>
    </div>
  );
}

export default LerProduto;