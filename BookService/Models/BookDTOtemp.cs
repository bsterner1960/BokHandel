using System.Collections.Generic;
namespace BookService.Models
{
    public class BookDTOtemp
    {

        public int Id { get; set; }
        public string Title { get; set; }

        public ICollection<Author> Authors { get; set; }

    }
}