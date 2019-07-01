using MovieMoon.Domain.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MovieMoon.Domain.Contracts
{
    public interface IMovieQuery
    {
        Task<ResultTMDb<Movie>> GetMovies(int page);
        Task<IEnumerable<Genre>> GetAllGenres();
    }
}
