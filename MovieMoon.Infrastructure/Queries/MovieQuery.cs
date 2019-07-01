using Microsoft.Extensions.Options;
using MovieMoon.Domain.Contracts;
using MovieMoon.Domain.Models;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;

namespace MovieMoon.Infrastructure.Queries
{
    public class MovieQuery : IMovieQuery
    {
        private readonly HttpClient client;
        private readonly TMDbConfig config;

        public MovieQuery(IOptions<TMDbConfig> config)
        {
            client = new HttpClient();
            this.config = config.Value;
        }

        public async Task<ResultTMDb<Movie>> GetMovies(int page)
        {
            var url = $"{config.RootUrl}movie/upcoming?api_key={config.ApiKey}&language=en-US&page={page}";
            var responseString = await client.GetAsync(url);
            var result = await responseString.Content.ReadAsAsync<ResultTMDb<Movie>>();
            foreach (var movie in result.Results)
                movie.ResolveRootUrlImage(config.ImageUrl);
            return result;
        }

        public async Task<IEnumerable<Genre>> GetAllGenres()
        {
            var url = $"{config.RootUrl}genre/movie/list?api_key={config.ApiKey}&language=en-US";
            var responseString = await client.GetAsync(url);
            var result = await responseString.Content.ReadAsAsync<RootGenres>();
            return result.genres;
        }
    }
}
