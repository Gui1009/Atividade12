import React, { useState } from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';

import './App.css'; 
import { produtos as produtosIniciais } from './produtos';
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
    const novoId = produto.id || (produtos.length > 0 ? Math.max(...produtos.map(p => p.id)) + 1 : 1);
    setProdutos([...produtos, { ...produto, id: novoId }]);
  };

  const atualizarProduto = (produtoAtualizado) => {
    setProdutos(produtos.map(p => p.id === produtoAtualizado.id ? produtoAtualizado : p));
  };

  return (
    <div className="app">
      <div className="topo">
        <h1>Loja de Hardware</h1>
        
      </div>

     

      <Routes>
        <Route path="/" element={
          <>
            <div className="grid-produtos">
              {produtos.map((produto) => (
                <div key={produto.id} className="card-produto">
                  <img src={produto.imagem} alt={produto.nome} className="imagem-produto" />
                  <h3 className="nome-produto">{produto.nome}</h3>
                  <p><strong>R$ {produto.valor.toFixed(2)}</strong></p>
                  <p className="id-produto">ID: {produto.id}</p>
                  <button onClick={() => adicionarAoCarrinho(produto)}>Comprar</button>
                </div>
              ))}
            </div>
             <button className="botao-gerenciar" onClick={() => navigate('/home/produtos')}>
        Gerenciador de Produtos
      </button>
<button className="botao-carrinho" onClick={() => setMostrarCarrinho(true)}>Carrinho</button>
            {mostrarCarrinho && (
              <CarrinhoLateral
                itens={carrinho}
                onAdd={adicionarAoCarrinho}
                onRemove={removerDoCarrinho}
                total={total}
                onFinalizar={() => {
                  alert('Compra finalizada!');
                  setCarrinho([]);
                  setMostrarCarrinho(false);
                }}
                fecharCarrinho={() => setMostrarCarrinho(false)}
              />
            )}
          </>
        } />

        <Route path="/produtos" element={<ControleProduto produtos={produtos} setProdutos={setProdutos} />} />
        <Route path="/produtos/criar" element={<CriarProduto adicionarProduto={adicionarProduto} />} />
        <Route path="/produtos/ler" element={<LerProduto produtos={produtos} />} />
        <Route path="/produtos/editar" element={<EditarProduto produtos={produtos} atualizarProduto={atualizarProduto} />} />
        <Route path="/produtos/remover" element={<RemoverProduto produtos={produtos} setProdutos={setProdutos} />} />
      </Routes>
    </div>
  );
}

export default App;
