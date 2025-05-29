import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CriarProduto = ({ adicionarProduto }) => {
  const [nome, setNome] = useState("");
  const [valor, setValor] = useState("");
  const [imagem, setImagem] = useState("");
  const navigate = useNavigate();
  

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nome || !valor || !imagem) {
      alert("Preencha todos os campos.");
      return;
    }

    const novoProduto = {
      nome,
      valor: parseFloat(valor),
      imagem,
    };

    adicionarProduto(novoProduto);
    navigate("/produtos");
  };

  return (
    <div className="container">
      <h1 className="add">Adicionar Produto</h1>
      <form onSubmit={handleSubmit} className="A">
        <div>
          <label className="nome">Nome:</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="B"
          />
        </div>
        <div>
          <label className="preco">Valor (R$):</label>
          <input
            type="number"
            step="0.01"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            className="B"
          />
        </div>
        <div>
          <label className="imagem">URL da Imagem:</label>
          <input
            type="text"
            value={imagem}
            onChange={(e) => setImagem(e.target.value)}
            className="B"
          />
        </div>
        <button
          type="submit"
          className="button"
        >
          Adicionar
        </button>
      </form>
      <button onClick={() => navigate("/produtos")}>Voltar</button>
    </div>
  );
};

export default CriarProduto;