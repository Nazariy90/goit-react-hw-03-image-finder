import { Component } from 'react';
import ImageGallery from './imageGallery/ImageGallery';
import Searchbar from './searchbar/Searchbar';
import { getImages, PER_PAGE } from '../network/api';
import Button from './button/Button';
import Loader from './loader/Loader';
import css from './App.module.css';

export class App extends Component {
  state = {
    loading: false,
    page: 1,
    searchValue: '',
    hits: [],
    totalHits: 0,
  };

  async componentDidUpdate(prevProps, prevState) {
    if (!this.state.searchValue) {
      this.setState({
        hits: [],
        totalHits: 0,
      });
      return;
    }

    if (
      prevState.searchValue !== this.state.searchValue ||
      prevState.page !== this.state.page
    ) {
      try {
        this.setState({ loading: true });
        const images = await getImages({
          page: this.state.page,
          searchValue: this.state.searchValue,
        });

        if (this.state.searchValue === prevState.searchValue) {
          this.setState(prevValue => {
            return {
              hits: [...prevValue.hits, ...images.hits],
            };
          });
          return;
        }

        this.setState({
          hits: images.hits,
          totalHits: images.totalHits,
        });
      } catch (error) {
        console.log(error);
      } finally {
        this.setState({ loading: false });
      }
    }
  }

  handleLoadMore = () => {
    this.setState(prev => {
      return {
        page: prev.page + 1,
      };
    });
  };

  handleSearch = value => {
    this.setState({
      page: 1,
      searchValue: value,
    });
  };

  render() {
    const hasMoreImages =
      this.state.totalHits > 0 &&
      this.state.page * PER_PAGE < this.state.totalHits;

    return (
      <div className={css.AppContainer}>
        <Searchbar onSearch={this.handleSearch} />
        <ImageGallery hits={this.state.hits} />

        {this.state.loading && <Loader />}

        {hasMoreImages && !this.state.loading && (
          <Button onloadMore={this.handleLoadMore} />
        )}
      </div>
    );
  }
}
