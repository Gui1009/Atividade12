import { useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";

const CriarProduto = () => {
  const [id, setId] = useState("");
  const [nome, setNome] = useState("");
  const [valor, setValor] = useState("");
  const [imagem, setImagem] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!id || !nome || !valor || !imagem) {
      alert("Preencha todos os campos.");
      return;
    }

   const novoProduto = {
  id: parseInt(id),
  nome,
  valor: parseFloat(valor),
  imagem,
};

    try {
    const response = await fetch("http://localhost:3000/api/produtos/criar", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(novoProduto),
});

      if (response.ok) {
        alert("Produto adicionado com sucesso!");
        navigate("/home/produtos/ler");
      } else {
        const erro = await response.json();
        alert(`Erro ao adicionar produto: ${erro.erro || "Erro desconhecido"}`);
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      alert("Erro ao conectar com o servidor.");
    }
  };

  return (
    <div className="container">
      <h1>Adicionar Produto</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>ID:</label>
          <input
            type="number"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </div>
        <div>
          <label>Nome:</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </div>
        <div>
          <label>Valor (R$):</label>
          <input
            type="number"
            step="1.00"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
          />
        </div>
        <div>
          <label>URL da Imagem:</label>
          <input
            type="text"
            value={imagem}
            onChange={(e) => setImagem(e.target.value)}
          />
        </div>
        <button type="submit">Adicionar</button>
      </form>
      <button onClick={() => navigate("/home/produtos")}>Voltar</button>
    </div>
  );
};

export default CriarProduto;
