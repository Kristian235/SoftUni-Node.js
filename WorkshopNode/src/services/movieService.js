const movies = [{
    _id: 1,
    title: 'afsa',
    genre: 'afsaf',
    director: 'fas',
    date: '2024',
    imageUrl: '',
    rating: '',
    description: ''
  }];

exports.getAll = () => {
  return movies.slice();
}

exports.getOne = (movieId) => {
  const movie =  movies.find(movie => movie._id == movieId);

  return movie;
}

exports.create = (movieData) => {
    
    movieData._id = movies[movies.length - 1]._id + 1;

    movies.push(movieData);
}