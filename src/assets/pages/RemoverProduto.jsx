import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function RemoverProduto() {
  const [id, setId] = useState("");
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!id) {
      alert("Por favor, informe um ID.");
      return;
    }

    try {
      const apiUrl = import.meta.env.VITE_API_URL;

      const response = await fetch(`${apiUrl}/api/produtos/deletar`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: Number(id) }), // Corrigido aqui
      });

      if (response.ok) {
        alert("Produto removido com sucesso!");
        navigate("/home/produtos/ler");
      } else if (response.status === 404) {
        alert("Produto não encontrado.");
      } else {
        const errorData = await response.json();
        alert(`Erro ao remover produto: ${errorData.erro || "Desconhecido"}`);
      }
    } catch (error) {
      console.error("Erro ao conectar com o servidor:", error);
      alert("Erro ao conectar com o servidor.");
    }
  };

  return (
    <div className="container">
      <h2>Remover Produto</h2>
      <div>
        <label>ID do Produto:</label>
        <input
          type="number"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
      </div>
      <br />
      <button onClick={handleDelete}>Remover Produto</button>
      <button onClick={() => navigate("/home/produtos")}>Voltar</button>
    </div>
  );
}

export default RemoverProduto;
