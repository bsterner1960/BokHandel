using System.Collections.Generic;
namespace BookService.Models
{
    public class BookDetailDTO
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int Year { get; set; }
        public decimal Price { get; set; }
        public int StockBalance { get; set; }
        public long ISBN { get; set; }


        public List<string> AuthorNames { get; set; }
        public List<string> GenreNames { get; set; }
    }
}