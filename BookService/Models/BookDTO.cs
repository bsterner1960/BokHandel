using System.Collections.Generic;
namespace BookService.Models
{
    public class BookDTO
    {

        public int Id { get; set; }
        public string Title { get; set; }
        public int Year { get; set; }
        public decimal Price { get; set; }

        public List<Author> Authors;
        public List<Genre> Genres;
    }
}