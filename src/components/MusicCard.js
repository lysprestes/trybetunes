import React from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { addSong, removeSong } from '../services/favoriteSongsAPI';

export default class MusicCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  handleChange = ({ target }) => {
    const { album } = this.props;
    const { checked } = target;
    return (checked) ? this.addingSong(album) : this.removingSong(album);
  }

  addingSong = async (album) => {
    this.setState({ loading: true });
    await addSong(album);
    this.setState({ loading: false });
  }

  removingSong = async (album) => {
    this.setState({ loading: true });
    await removeSong(album);
    this.setState({ loading: false });
  }

  render() {
    const { album: { previewUrl, trackName, trackId } } = this.props;
    const { loading } = this.state;
    return (
      <div>
        { loading ? <Loading /> : null }
        <h4>{ trackName }</h4>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
        </audio>
        <input
          onChange={ this.handleChange }
          type="checkbox"
          data-testid={ `checkbox-music-${trackId}` }
        />
      </div>
    );
  }
}

MusicCard.propTypes = {
  album: PropTypes.shape({
    previewUrl: PropTypes.string,
    trackName: PropTypes.string,
    trackId: PropTypes.number,
  }).isRequired,
};
