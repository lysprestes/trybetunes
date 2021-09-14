import React from 'react';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';
import CardArtist from '../components/CardArtist';

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      loading: false,
      searchResult: [],
      nameImput: '',
    };
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  }

  handleClick = async ({ target }) => {
    const { name } = this.state;
    this.setState({
      loading: true,
    });
    const artists = await searchAlbumsAPI(name);
    this.setState({
      name: '',
      searchResult: artists,
      loading: false,
      nameImput: name,
    });
    target.value = '';
  }

  buttonDisable = () => {
    const MIN_LENGTH = 2;
    const { name } = this.state;

    return (name.length < MIN_LENGTH);
  }

  searchArtist = () => {
    const { name } = this.state;
    return (
      <div>
        <input
          type="text"
          data-testid="search-artist-input"
          placeholder="Pesquisar artista"
          name="name"
          value={ name }
          onChange={ this.handleChange }
        />
        <button
          data-testid="search-artist-button"
          type="submit"
          disabled={ this.buttonDisable() }
          onClick={ this.handleClick }
        >
          Pesquisar
        </button>
      </div>
    );
  }

  render() {
    const { loading, searchResult, nameImput } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        { loading ? <Loading /> : this.searchArtist() }
        { nameImput && searchResult.length !== 0
          ? <p>{`Resultado de álbuns de: ${nameImput}`}</p>
          : <p>Nenhum álbum foi encontrado</p> }
        { searchResult.map((element) => (<CardArtist
          key={ element.artistId }
          searchResult={ element }
        />))}
      </div>
    );
  }
}
