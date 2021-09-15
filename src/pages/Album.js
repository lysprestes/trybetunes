import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusic from '../services/musicsAPI';

export default class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      album: [],
    };
  }

  componentDidMount() {
    this.searchMusic();
  }

  searchMusic = async () => {
    const { match: { params: { id } } } = this.props;
    const response = await getMusic(id);
    this.setState({
      album: response,
      name: response[0].artistName,
      albumName: response[0].collectionName,
    });
  }

  render() {
    const { album, name, albumName } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <h1 data-testid="album-name">{ albumName }</h1>
        <h2 data-testid="artist-name">{ name }</h2>
        { album.map((element, index) => (index !== 0
          ? (<MusicCard album={ element } key={ element.artistId } />) : null))}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,

};
