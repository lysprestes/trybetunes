import React from 'react';
import PropTypes from 'prop-types';

export default class MusicCard extends React.Component {
  render() {
    const { album: { previewUrl, trackName } } = this.props;
    return (
      <div>
        <h4>{ trackName }</h4>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
        </audio>
      </div>
    );
  }
}

MusicCard.propTypes = {
  album: PropTypes.shape({
    previewUrl: PropTypes.string,
    trackName: PropTypes.string,
    // trackId: PropTypes.number,
  }).isRequired,
};
