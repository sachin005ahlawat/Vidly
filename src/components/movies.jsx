import React, { Component } from 'react';
import ListGroup from './common/listGroup';
import Pagination from './common/pagination';
import {getMovies} from '../services/fakeMovieService';
import {getGenres} from '../services/fakeGenreService';
import {paginate} from '../utils/paginate';
import MoviesTable from './moviesTable';
import SearchBox from  './common/search';
import {Link} from 'react-router-dom';
import _ from'lodash';


class Movies extends Component {
    state = { 
        movies:[],
        genres:[],
        pageSize:4,
        currentPage:1,
        sortColumn:{path:'title',order:'asc'},
        searchQuery:"",
        selectedGenre:null
     }

     //this method is called when an instance of this component is rendered in DOM;
     componentDidMount(){
       const genres = [{_id:'',name:"All Genres"},...getGenres()]
       this.setState({movies:getMovies(),genres});
     }

     handleDelete = movie => {
        const movies = this.state.movies.filter( m => m._id !== movie._id);
        this.setState({movies});
     }
     handleLike = movie => {
      const movies=[...this.state.movies];
      const index  = movies.indexOf(movie);
      movies[index]={...movies[index]};
      movies[index].liked=!movies[index].liked;
      this.setState({movies});
      // console.log(movie);
     }

     handlePageChange=page=>{
      this.setState({currentPage:page});
     }

     handleGenreSelect= genre => {
       this.setState({selectedGenre:genre,searchQuery:"",currentPage:1});
     }
     handleSearch=query=>{
        this.setState({searchQuery:query,selectedGenre:null,currentPage:1});
     }

     handleSort=sortColumn=>{
      this.setState({sortColumn});
     }

     getPagedData = () => {

      const {
        currentPage,
        pageSize,
        movies: allMovies,
        selectedGenre,
        sortColumn,
        searchQuery
      } = this.state;

      let filtered=allMovies;
      if(searchQuery)
        filtered=allMovies.filter(m =>m.title.toLowerCase().startsWith(searchQuery.toLowerCase()));
      else if(selectedGenre && selectedGenre._id)
          filtered=allMovies.filter((m) => m.genre._id === selectedGenre._id);

      const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

      const movies = paginate(sorted, currentPage, pageSize);

      return {totalCount:filtered.length , data:movies};
     }

    render() { 
        const {length:count}=this.state.movies;
        const {currentPage,pageSize,sortColumn,searchQuery}=this.state;

        if(count===0) return <p>There are no movies in the database!</p>;

        const {totalCount ,data:movies}=this.getPagedData();

        return (
          <div className="row">
            <div className="col-3">
              <ListGroup
                items={this.state.genres}
                selectedItem={this.state.selectedGenre}
                onItemSelect={this.handleGenreSelect}
              ></ListGroup>
            </div>
            <div className="col">
              <Link
                to="/movies/new"
                className="btn btn-primary"
                style={{ marginBottom: 20 }}
              >
                New Movie
              </Link>
              <p>There are {totalCount} movies in the database</p>
              <SearchBox value={searchQuery} onChange={this.handleSearch}></SearchBox>
              <MoviesTable
                movies={movies}
                sortColumn={sortColumn}
                onLike={this.handleLike}
                onDelete={this.handleDelete}
                onSort={this.handleSort}
              ></MoviesTable>
              <Pagination
                itemsCount={totalCount}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={this.handlePageChange}
              ></Pagination>
            </div>
          </div>
        );
    }
}
 
export default Movies;