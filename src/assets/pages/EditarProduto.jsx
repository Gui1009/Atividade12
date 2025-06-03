import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EditarProduto() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [produtoId, setProdutoId] = useState(id || "");
  const [nome, setNome] = useState("");
  const [valor, setValor] = useState("");
  const [imagem, setImagem] = useState("");
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL;

    if (!id) return;

    setCarregando(true);

    fetch(`${apiUrl}/api/produtos/ler`)
      .then((res) => res.json())
      .then((data) => {
        const produto = data.find((p) => p.id === Number(id));
        if (produto) {
          setProdutoId(produto.id);
          setNome(produto.nome);
          setValor(produto.valor);
          setImagem(produto.imagem || "");
        } else {
          alert("Produto não encontrado.");
          navigate("/home/produtos/ler");
        }
      })
      .catch((err) => {
        console.error("Erro ao carregar produto:", err);
        alert("Erro ao carregar produto.");
      })
      .finally(() => setCarregando(false));
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!produtoId || !nome || !valor) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }

    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await fetch(`${apiUrl}/api/produtos/atualizar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: Number(produtoId),
          nome,
          valor: parseFloat(valor),
          imagem,
        }),
      });

      if (response.ok) {
        alert("Produto atualizado com sucesso!");
        navigate("/home/produtos/ler");
      } else if (response.status === 404) {
        alert("Produto não encontrado.");
      } else if (response.status === 409) {
        alert("Conflito: verifique se o ID é válido.");
      } else {
        alert("Erro ao atualizar produto.");
      }
    } catch (error) {
      console.error("Erro ao atualizar:", error);
      alert("Erro na conexão com o servidor.");
    }
  };

  return (
    <div className="container">
      <h2>Editar Produto</h2>

      {carregando ? (
        <p>Carregando...</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label>ID:</label>
            <input
              type="number"
              value={produtoId}
              onChange={(e) => setProdutoId(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Nome:</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Valor (R$):</label>
            <input
              type="number"
              step="0.01"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Imagem (URL):</label>
            <input
              type="text"
              value={imagem}
              onChange={(e) => setImagem(e.target.value)}
            />
          </div>

          <button type="submit">Atualizar</button>
        </form>
      )}

      <button onClick={() => navigate("/home/produtos")}>Voltar</button>
    </div>
  );
}

export default EditarProduto;
