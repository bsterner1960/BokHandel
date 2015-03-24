using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;
using Newtonsoft;

namespace BookService.Models
{
    
    public class SearchDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Value { get; set; }


        //public static IQueryable searchFunction(string value, string authorTest)
        //{
        //    authorTest = new Author
        //    var question = from newbase in Author()
        //            where db.Name.Contains(value) || newbase.l_name.Contains(value)
        //            select newbase;
        //    return (value);
        //}
        //söka enbart i bookdetails?
    //    USE 
    //    GO
        
    //    SELECT Name, ListPrice
    //    FROM Production.Product
    //    WHERE ListPrice = 80.99
    //    AND CONTAINS(Name, 'Mountain')
    //    GO
    //    //För exakt sökning:
    //{
       
    

    ////För fritext sökning:
    //    {
    //        USE AdventureWorks2012
    //        GO

    //        SELECT Title
    //        FROM Production.Document
    //        WHERE FREETEXT (Document, 'vital safety components')
    //        GO
    //    }
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
    //    //            3. Author
    }
}