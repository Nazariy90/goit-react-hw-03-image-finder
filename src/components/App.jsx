import { Component } from 'react';
import PropTypes from 'prop-types';
import ImageGallery from './imageGallery/ImageGallery';
import Searchbar from './searchbar/Searchbar';
import { getImages, PER_PAGE } from '../network/api';
import Button from './button/Button';
import Loader from './loader/Loader';
import css from './App.module.css';

export class App extends Component {
  static propTypes = {
    loading: PropTypes.bool,
    page: PropTypes.number,
    searchValue: PropTypes.string,
    hits: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        webformatURL: PropTypes.string.isRequired,
        tags: PropTypes.string.isRequired,
      })
    ),
    totalHits: PropTypes.number,
  };

  state = {
    loading: false,
    page: 1,
    searchValue: '',
    hits: [],
    totalHits: 0,
  };

  handleLoadMore = async () => {
    this.setState({ loading: true });

    try {
      const images = await getImages({
        page: this.state.page + 1,
        searchValue: this.state.searchValue,
      });

      this.setState(prev => {
        return {
          page: prev.page + 1,
          hits: [...prev.hits, ...images.hits],
          totalHits: images.totalHits,
        };
      });
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ loading: false });
    }
  };

  handleSearch = async value => {
    if (!value) {
      this.setState({
        searchValue: value,
        hits: [],
        totalHits: 0,
      });
    } else {
      this.setState({ loading: true });

      try {
        const images = await getImages({
          page: 1,
          searchValue: value,
        });
        this.setState({
          page: 1,
          searchValue: value,
          hits: images.hits,
          totalHits: images.totalHits,
        });
      } catch (error) {
        console.log(error);
      } finally {
        this.setState({ loading: false });
      }
    }
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
