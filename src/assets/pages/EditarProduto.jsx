import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function EditarProduto({ produtos, atualizarProduto }) {
  const { id } = useParams();
  const produto = produtos.find((p) => p.id === parseInt(id));
  const [nome, setNome] = useState(produto?.nome || '');
  const [valor, setValor] = useState(produto?.valor || '');
  const navigate = useNavigate();

  useEffect(() => {
    if (!produto) navigate('/produtos');
  }, [produto, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    atualizarProduto({ id: parseInt(id), nome, valor: parseFloat(valor) });
    navigate('/produtos');
  };

  return (
    <div className="container">
      <h2>Editar Produto</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />
        <input type="number" value={valor} onChange={(e) => setValor(e.target.value)} required />
        <button type="submit">Atualizar</button>
      </form>
    </div>
  );
}

export default EditarProduto;