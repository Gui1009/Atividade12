import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import CarrinhoLateral from "../CarrinhoLateral";

const LerProduto = () => {
  const [produtos, setProdutos] = useState([]);
  const [itensCarrinho, setItensCarrinho] = useState([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const carregarProdutos = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/produtos/ler");
        if (!response.ok) {
          throw new Error("Erro na resposta do servidor: " + response.status);
        }
        const data = await response.json();
        setProdutos(data);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    };

    carregarProdutos();
  }, []);

  const atualizarTotal = (itens) => {
    const novoTotal = itens.reduce((acc, item) => acc + item.valor * item.quantidade, 0);
    setTotal(novoTotal);
  };

  const adicionarAoCarrinho = (produto) => {
    const existente = itensCarrinho.find((item) => item.id === produto.id);
    let novoCarrinho;
    if (existente) {
      novoCarrinho = itensCarrinho.map((item) =>
        item.id === produto.id ? { ...item, quantidade: item.quantidade + 1 } : item
      );
    } else {
      novoCarrinho = [...itensCarrinho, { ...produto, quantidade: 1 }];
    }
    setItensCarrinho(novoCarrinho);
    atualizarTotal(novoCarrinho);
  };

  const removerDoCarrinho = (produto) => {
    let novoCarrinho = itensCarrinho
      .map((item) =>
        item.id === produto.id ? { ...item, quantidade: item.quantidade - 1 } : item
      )
      .filter((item) => item.quantidade > 0);
    setItensCarrinho(novoCarrinho);
    atualizarTotal(novoCarrinho);
  };

  const finalizarCompra = () => {
    alert("Compra finalizada!");
    setItensCarrinho([]);
    setTotal(0);
  };

  const removerProduto = async (id) => {
    const confirm = window.confirm("Tem certeza que deseja remover este produto?");
    if (!confirm) return;

    try {
      const response = await fetch("http://localhost:3000/api/produtos/deletar", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        alert("Produto removido com sucesso!");
        setProdutos(produtos.filter((produto) => produto.id !== id));
      } else {
        alert("Erro ao remover produto.");
      }
    } catch (error) {
      console.error("Erro ao remover produto:", error);
      alert("Erro ao conectar com o servidor.");
    }
  };

  return (
    <div style={{ display: 'flex', gap: '30px' }}>
      <div style={{ flex: 2 }}>
        <h1>Lista de Produtos</h1>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          {produtos.map((produto) => (
            <div key={produto.id} style={{ border: '1px solid #ccc', padding: '10px', width: '200px' }}>
              <img src={produto.imagem} alt={produto.nome} width="100%" />
              <h3 style={{ fontSize: '16px' }}>{produto.nome}</h3>
              <p><strong>R$ {produto.valor.toFixed(2)}</strong></p>
              <p style={{ fontSize: '12px', color: '#888' }}>ID: {produto.id}</p>
              <button onClick={() => navigate(`/home/produtos/editar`)}>Editar</button>
              <button onClick={() => adicionarAoCarrinho(produto)}>Comprar</button>
              <button onClick={() => removerProduto(produto.id)} style={{ marginLeft: "5px" }}>
                Remover
              </button>
            </div>
          ))}
        </div>
        <button onClick={() => navigate("/home/produtos")} style={{ marginTop: "20px" }}>
          Voltar
        </button>
      </div>

      
      <div style={{ flex: 1 }}>
        <CarrinhoLateral
          itens={itensCarrinho}
          onAdd={adicionarAoCarrinho}
          onRemove={removerDoCarrinho}
          total={total}
          onFinalizar={finalizarCompra}
        />
      </div>
    </div>
  );
};

export default LerProduto;
