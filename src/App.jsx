import React, { useState } from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';

import { produtos as produtosIniciais } from './produt'; 
import CarrinhoLateral from './assets/CarrinhoLateral'; 
import ControleProduto from './assets/pages/ControleProduto';
import CriarProduto from './assets/pages/CriarProduto';
import EditarProduto from './assets/pages/EditarProduto';
import RemoverProduto from './assets/pages/RemoverProduto';
import LerProduto from './assets/pages/LerProduto';

function App() {
  const [produtos, setProdutos] = useState(produtosIniciais);
  const [carrinho, setCarrinho] = useState([]);
  const [mostrarCarrinho, setMostrarCarrinho] = useState(false);
  const navigate = useNavigate();

  const adicionarAoCarrinho = (produto) => {
    const existe = carrinho.find((item) => item.nome === produto.nome);
    if (existe) {
      setCarrinho(carrinho.map(item =>
        item.nome === produto.nome ? { ...item, quantidade: item.quantidade + 1 } : item
      ));
    } else {
      setCarrinho([...carrinho, { ...produto, quantidade: 1 }]);
    }
    setMostrarCarrinho(true);
  };

  const removerDoCarrinho = (produto) => {
    const existe = carrinho.find((item) => item.nome === produto.nome);
    if (existe.quantidade === 1) {
      setCarrinho(carrinho.filter((item) => item.nome !== produto.nome));
    } else {
      setCarrinho(carrinho.map(item =>
        item.nome === produto.nome ? { ...item, quantidade: item.quantidade - 1 } : item
      ));
    }
  };

  const total = carrinho.reduce((soma, item) => soma + item.valor * item.quantidade, 0);

  const adicionarProduto = (produto) => {
    const novoId = produtos.length > 0 ? produtos[produtos.length - 1].id + 1 : 1;
    setProdutos([...produtos, { ...produto, id: novoId }]);
  };

  const atualizarProduto = (produtoAtualizado) => {
    setProdutos(produtos.map(p => p.id === produtoAtualizado.id ? produtoAtualizado : p));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Loja de Hardware</h1>
      <button onClick={() => navigate('/produtos')} style={{ marginBottom: '20px',  }}>
        Menu de Criação
      </button>

      <Routes>
        <Route path="/" element={
          <>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
              {produtos.map((produto) => (
                <div key={produto.id} style={{ border: '1px solid #ccc', padding: '10px', width: '200px' }}>
                  <img src={produto.imagem} alt={produto.nome} width="100%" />
                  <h3 style={{ fontSize: '16px' }}>{produto.nome}</h3>
                  <p><strong>R$ {produto.valor.toFixed(2)}</strong></p>
                  <button onClick={() => adicionarAoCarrinho(produto)}>Comprar</button>
                </div>
              ))}
            </div>

            {mostrarCarrinho && (
              <CarrinhoLateral
                itens={carrinho}
                onAdd={adicionarAoCarrinho}
                onRemove={removerDoCarrinho}
                total={total}
                onFinalizar={() => {
                  alert('Compra finalizada!');
                  setCarrinho([]);
                }}
              />
            )}
          </>
        } />

        <Route path="/produtos" element={<ControleProduto produtos={produtos} setProdutos={setProdutos} />} />
        <Route path="/produtos/criar" element={<CriarProduto adicionarProduto={adicionarProduto} />} />
        <Route path="/produtos/ler/:id" element={<LerProduto produtos={produtos} />} />
        <Route path="/produtos/editar/:id" element={<EditarProduto produtos={produtos} atualizarProduto={atualizarProduto} />} />
        <Route path="/produtos/remover/:id" element={<RemoverProduto produtos={produtos} setProdutos={setProdutos} />} />

      </Routes>
    </div>
  );
}

export default App;