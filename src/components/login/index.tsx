import { useState } from 'react';
import { createUser } from '../../services/userAPI';

function Login() {
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setValue(e.target.value);
  };

  const validateButton = () => value.length > 2;

  const handleClick = async () => {
    setLoading(true);
    await createUser({ name: value });
    setLoading(false);
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div>
      <input
        data-testid="login-name-input"
        type="text"
        name="Usuario"
        id="login-input"
        onChange={ handleChange }
      />
      <button
        data-testid="login-submit-button"
        disabled={ !validateButton() }
        onClick={ handleClick }
      >
        Entrar
      </button>
    </div>
  );
}

export default Login;
