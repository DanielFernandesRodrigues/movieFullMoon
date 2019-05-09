using System.Collections.Generic;

namespace MovieMoon.Domain.Models
{
    public class ResultTMDb<T>
    {
        public List<T> Results { get; set; }
        public int Page { get; set; }
        public int Total_results { get; set; }
        public Dates Dates { get; set; }
        public int Total_pages { get; set; }
    }

    public class RootGenres
    {
        public List<Genre> genres { get; set; }
    }
}
