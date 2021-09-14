import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class CardArtist extends Component {
  render() {
    const { searchResult: { artistName, collectionId, collectionName } } = this.props;
    return (
      <div>
        <p>{artistName}</p>
        <p>{collectionName}</p>
        <Link
          to={ `/album/${collectionId}` }
          data-testid={ `link-to-album-${collectionId}` }
        >
          Link para album
        </Link>
      </div>
    );
  }
}

CardArtist.propTypes = {
  searchResult: PropTypes.shape({
    artistId: PropTypes.number,
    artistName: PropTypes.string,
    collectionId: PropTypes.number,
    collectionName: PropTypes.string,
    collectionPrice: PropTypes.number,
    artworkUrl100: PropTypes.string,
    releaseDate: PropTypes.string,
    trackCount: PropTypes.number,
  }).isRequired,
};
