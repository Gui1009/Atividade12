import React from 'react';
import { Link } from 'react-router-dom';

function ControleProduto({ produtos = [], setProdutos = () => {} }) {
  const handleDelete = (id) => {
    if (window.confirm('Deseja realmente remover este produto?')) {
      setProdutos(produtos.filter((p) => p.id !== id));
    }
  };

  return (
    <div className="container" style={{ padding: '20px' }}>
      <h1>Editor</h1>

      
      <div style={{ marginBottom: '20px' }}>
        <Link to="/produtos/criar">
          <button style={{ marginBottom: '10px' }}>Criar Produto</button>
        </Link>
        <br />
        <Link to="/produtos/ler">
          <button style={{ marginBottom: '10px' }}>Ler Produtos</button>
        </Link>
        <br />
        <Link to="/produtos/editar">
          <button style={{ marginBottom: '10px' }}>Editar Produto</button>
        </Link>
        <br />
        <Link to="/produtos/remover">
          <button style={{ marginBottom: '10px' }}>Remover Produto</button>
        </Link>
        <Link to="/home">
          <button style={{ marginBottom: '10px' }}>Voltar</button>
        </Link>
        
      </div>

      
      {produtos.length === 0 ? (
        <p>Nenhum produto cadastrado.</p>
      ) : (
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {produtos.map((p) => (
            <li key={p.id} style={{ marginBottom: '20px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
              <strong>{p.nome}</strong> - R$ {parseFloat(p.valor).toFixed(2)}
              <div style={{ marginTop: '10px' }}>
                <Link to={`/produtos/ler/${p.id}`}>
                  <button style={{ marginRight: '10px' }}>Ler</button>
                </Link>
                <Link to={`/produtos/editar/${p.id}`}>
                  <button style={{ marginRight: '10px' }}>Editar</button>
                </Link>
                <Link to={`/produtos/remover/${p.id}`}>
                  <button style={{ marginRight: '10px' }}>Remover</button>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ControleProduto;