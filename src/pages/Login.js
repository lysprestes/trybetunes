import React from 'react';
import PropTypes from 'prop-types';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      loading: false,
    };
  }

  handleClick = () => {
    const { name } = this.state;
    const user = { name };
    this.setState({ loading: true });
    this.createUser(user);
  }

  createUser = async (user) => {
    await createUser(user);
    const { history } = this.props;
    history.push('search');
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  }

  disable = () => {
    const MIN_LENGTH = 3;
    const { name } = this.state;

    return (name.length < MIN_LENGTH);
  }

  showLogin = () => {
    const { name } = this.state;
    return (
      <div data-testid="page-login">
        <h1>Login</h1>
        <input
          data-testid="login-name-input"
          type="text"
          name="name"
          value={ name }
          onChange={ this.handleChange }
          placeholder="Nome"
        />
        <button
          data-testid="login-submit-button"
          type="submit"
          onClick={ this.handleClick }
          disabled={ this.disable() }
        >
          Entrar
        </button>
      </div>
    );
  }

  render() {
    const { loading } = this.state;
    return (
      loading ? <Loading /> : this.showLogin()
    );
  }
}

Login.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};
