using MovieMoon.Domain.Contracts;
using MovieMoon.Domain.Models;
using System.Threading.Tasks;

namespace MovieMoon.Service.Queries
{
    public class MovieQueryService : IMovieQueryService
    {
        private readonly IMovieQuery query;
        public MovieQueryService(IMovieQuery query)
        {
            this.query = query;
        }

        public async Task<ResultTMDb<Movie>> GetMovies(int page)
        {
            var result = await query.GetMovies(page);
            var genres = await query.GetAllGenres();
            foreach (var movie in result.Results)
                movie.ResolveGenre(genres);
            return result;
        }
    }
}
