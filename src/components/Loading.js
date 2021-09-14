import React from 'react';

export default class Loading extends React.Component {
  render() {
    return (
      <div className="loading" data-testid="loading">Carregando...</div>
    );
  }
}
