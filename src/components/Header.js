import React from 'react';
import { Link } from 'react-router-dom';

import { getUser } from '../services/userAPI';
import Loading from './Loading';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      loading: true,
    };
  }

  componentDidMount() {
    this.showHeader();
  }

  showHeader = async () => {
    const user = await getUser();
    this.setState({
      user: user.name,
      loading: false,
    });
  }

  render() {
    const { loading, user } = this.state;
    return (
      <header data-testid="header-component">
        <div className="header-user">
          <div className="user-name">
            <img src="../src/img/logo.svg" alt="" />
            { loading ? <Loading />
              : <h2 data-testid="header-user-name">{ user }</h2> }
          </div>
        </div>

        <div className="header-nav-bar">
          <div className="nav-item">
            <Link data-testid="link-to-search" to="/search">Search</Link>
          </div>
          <div className="nav-item">
            <Link data-testid="link-to-favorites" to="/favorites">Favorites</Link>
          </div>
          <div className="nav-item">
            <Link data-testid="link-to-profile" to="/profile">Profile</Link>
          </div>
        </div>

      </header>
    );
  }
}
