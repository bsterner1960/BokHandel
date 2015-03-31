using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;
using Newtonsoft;
using System.Data;

namespace BookService.Models
{


    
    public class SearchDTO
    {

        public string searchType { get; set; }
        public string searchPhrase { get; set; }
        public List<BookDetailDTO> bookResult { get; set; }
        //public ICollection<Author> authorResult { get; set; }
        /*public string bookSearch { get; set; }
        public string genreSearch { get; set; }
        public string isbnSearch { get; set; }*/

        //söka enbart i bookdetails?
 
    //    //sökbart:
    //        //Author
    //        //ISBN
    //        //Book

    //    //Radiobuttons 0 Authors
    //    //             0 Book

    //    //Det ska vara exakt match på ordet.
    //    //Om man klickar på searchbutton så ska allt visas.
    //    //Prio order: 1. ISBN
    //    //            2. Book
          //            3. Author
    }
}