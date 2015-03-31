using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace BookService.Models
{
    public class Book
    {
        public int Id { get; set; }
        [Required]
        public string Title { get; set; }
        public string Description { get; set; }
        public int Year { get; set; }
        public decimal Price { get; set; }
        public int StockBalance { get; set; }
        public string ISBN { get; set; }

        public ICollection<Author> Authors { get; set; }

        public ICollection<Genre> Genres { get; set; }

        public Book()
        {
            Authors = new HashSet<Author>();
            Genres  = new HashSet<Genre>();
        }

     }
}
    
