using MovieMoon.Domain.Models;
using System.Threading.Tasks;

namespace MovieMoon.Domain.Contracts
{
    public interface IMovieQueryService
    {
        Task<ResultTMDb<Movie>> GetMovies(int page);
    }
}
