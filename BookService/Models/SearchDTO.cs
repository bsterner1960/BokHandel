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
 
//        int caseSwitch = 1;
//          switch (caseSwitch)
//          {
//    case 1:
//        Console.WriteLine("Case 1");
//        break;
//    case 2:
//        Console.WriteLine("Case 2");
//        break;
//    default:
//        Console.WriteLine("Default case");
//        break;
//}

        //if-try-switch-case. Author results, BookResults, else SearchAll.
        // i isbn search, bara ett visst antal siffror är tillåtna. Annars returnera "fel antal tecken"    
        
        //public static IQueryable searchFunction(string value, string authorTest)
        //{
        //    authorTest = new Author
        //    var question = from newbase in Author()
        //            where db.Name.Contains(value) || newbase.l_name.Contains(value)
        //            select newbase;
        //    return (value);
        //}
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