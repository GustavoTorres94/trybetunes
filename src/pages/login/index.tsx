import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../../services/userAPI';
import Loading from '../../components/loading';

function Login() {
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setValue(e.target.value);
  };

  const validateButton = () => value.length > 2;

  const handleClick = async () => {
    setLoading(true);
    await createUser({ name: value });
    setLoading(false);
    navigate('/search');
  };

  if (loading) {
    return <Loading />;
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
