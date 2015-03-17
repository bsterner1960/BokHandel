using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;

namespace BookService.Models
{
    public class BookGenreConnection
    
    {
        public int Id { get; set; }
        [Required]

        // Foreign Key
        public int BookId { get; set; }
       // public Book Book { get; set; } 
       
        // Foreign Key
        public int GenreId { get; set; }
        //public Genre Genre { get; set; }  


    }
}