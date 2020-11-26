import React, { Component } from 'react';
import axios from 'axios';

import './App.css';
import ImgList from './Components/ImgList';
import SearchForm from './Components/SearchForm';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      photos: [],
      isLoading: true,
      term: '',
      page: 1
    };
  }

  componentDidMount() {
    this.performSearch();
  }

  performSearch = (query = 'cat') => {
    axios
      .get(
        `https://api.unsplash.com/search/photos/?page=1&per_page=10&query=${query}&client_id=CYTRpmMW54vWQQz5HFzFFeaxX_cXZCPam-T0CDWBmWM`
      )
      .then(data => {
        this.setState({ photos: data.data.results, isLoading: false });
        this.setState({term: query});
      })
      .catch(err => {
        console.log('Error happened during fetching!', err);
      });
  };

  handleFetchMoreData = () => {
    axios
      .get(
        `https://api.unsplash.com/search/photos/?page=${this.state.page+1}&per_page=10&query=${this.state.term}&client_id=CYTRpmMW54vWQQz5HFzFFeaxX_cXZCPam-T0CDWBmWM`
      )
      .then(data => {
        this.setState({photos: [...this.state.photos,...data.data.results], isLoading: false});
        this.setState({page: this.state.page +1}); 
      })
      .catch(err => {
        console.log('Error happened during fetching!', err);
      });
    };

  render() {
    return (
      <div>
        <div className="main-header">
          <div className="inner">
            <h1 className="main-title">ImageSearch</h1>
            <SearchForm onSearch={this.performSearch} />
          </div>
        </div>
        <div className="main-content">
          {this.state.loadingState
            ? <p>Loading</p>
            : <ImgList data={this.state.photos} 
            fetchMoreData={this.handleFetchMoreData}
          />}
        </div>
      </div>
    );
  }
}