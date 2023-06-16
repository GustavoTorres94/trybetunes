import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getUser } from '../../services/userAPI';

function Header() {
  const [user, setUser] = useState<string>('');
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const pickingName = async () => {
      setLoading(true);
      const getName = await getUser();
      const { name } = getName;
      setUser(name);
      setLoading(false);
    };
    pickingName();
  }, []);

  if (loading) {
    return <h1>Carregando...</h1>;
  }

  return (
    <div>
      <div data-testid="header-component">
        <nav>
          <NavLink to="/search" data-testid="link-to-search">Search</NavLink>
          <NavLink to="/favorites" data-testid="link-to-favorites">Favorites</NavLink>
          <NavLink to="/profile" data-testid="link-to-profile">Profile</NavLink>
        </nav>
      </div>
      <div>
        <p data-testid="header-user-name">{user}</p>
      </div>
    </div>
  );
}

export default Header;
