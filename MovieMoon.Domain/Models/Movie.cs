using System.Collections.Generic;
using System.Linq;

namespace MovieMoon.Domain.Models
{
    public class Movie
    {
        public int Vote_count { get; set; }
        public int Id { get; set; }
        public bool Video { get; set; }
        public double Vote_average { get; set; }
        public string Title { get; set; }
        public double Popularity { get; set; }
        public string Poster_path { get; set; }
        public string Original_language { get; set; }
        public string Original_title { get; set; }
        public ICollection<int> Genre_ids { get; set; }
        public string Backdrop_path { get; set; }
        public bool Adult { get; set; }
        public string Overview { get; set; }
        public string Release_date { get; set; }
        public string MainGenre { get; set; }

        public void ResolveGenre(IEnumerable<Genre> genres)
        {
            if (Genre_ids.Any() && genres.Any(k => k.Id == Genre_ids.First()))
                MainGenre = genres.First(k => k.Id == Genre_ids.First()).Name;
        }

        public void ResolveRootUrlImage(string rootUrl)
        {
            if (string.IsNullOrEmpty(rootUrl))
                return;

            if (!string.IsNullOrEmpty(Backdrop_path))
                Backdrop_path = string.Concat(rootUrl, Backdrop_path);

            if (!string.IsNullOrEmpty(Poster_path))
                Poster_path = string.Concat(rootUrl, Poster_path);
        }
    }
}
