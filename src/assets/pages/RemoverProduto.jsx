import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function RemoverProduto({ produtos, setProdutos }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const produto = produtos.find((p) => p.id === parseInt(id));

  const handleDelete = () => {
    setProdutos(produtos.filter((p) => p.id !== parseInt(id)));
    navigate("/produtos");
  };

  if (!produto) {
    return <p>Produto não encontrado.</p>;
  }

  return (
    <div className="container">
      <h2>Remover Produto</h2>
      <p>Tem certeza que deseja remover o produto <strong>{produto.nome}</strong>?</p>
      <button onClick={handleDelete}>Sim, Remover</button>
      <button onClick={() => navigate("/produtos")}>Cancelar</button>
    </div>
  );
}

export default RemoverProduto;