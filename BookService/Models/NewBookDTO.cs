using System.Collections.Generic;
namespace BookService.Models
{
    public class NewBookDTO
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int Year { get; set; }
        public decimal Price { get; set; }
        public int StockBalance { get; set; }
        public string ISBN { get; set; }

        public List<int> AuthorIds { get; set; }
        public List<int> GenreIds { get; set; }

    }
}