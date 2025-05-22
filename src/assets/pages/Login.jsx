import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; 
import './login.css';

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth(); 

  const [usuarioOuEmail, setUsuarioOuEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    const usuarioSalvo = JSON.parse(localStorage.getItem('usuario'));

    if (!usuarioSalvo) {
      alert('Nenhuma conta foi criada ainda.');
      return;
    }

    const identificadorValido =
      usuarioOuEmail === usuarioSalvo.usuario || usuarioOuEmail === usuarioSalvo.email;

    if (identificadorValido && senha === usuarioSalvo.senha) {
      login(); 
      navigate('/home');
    } else {
      alert('Usuário/email ou senha inválidos.');
    }
  };

  return (
    <div className="container">
      <h1>TudoHard</h1>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Usuário ou Email"
          required
          onChange={(e) => setUsuarioOuEmail(e.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="Senha"
          required
          onChange={(e) => setSenha(e.target.value)}
        />
        <br />
        <button type="submit">Entrar</button>
        <p>
          Não tem uma conta? <a href="/criar">Crie uma agora</a>
        </p>
      </form>
    </div>
  );
}

export default Login;
