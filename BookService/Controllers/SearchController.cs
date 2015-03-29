using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using BookService.Models;
using System.IO;
using System.Diagnostics;
using System.Web;


namespace BookService.Controllers
{
    public class SearchController : ApiController
    {
        private BookServiceContext db = new BookServiceContext();

        // GET: Search/Books
        public IQueryable<Book> GetBooks([FromUri] int[] genreId = null, int priceFrom = 0, int priceTo = 0, string searchValue = "")
        {

            // Än så länge är denna koden enbart till för att testa så att frontend kan skicka in en bok sökning
            // 1. Att vi kan plocka ut samtliga Uri parametrar från frontend anropet
            // 2. Att vi kan skicka tillbaka en array av böcker till fronten
            // 3. Att fronten kan visa resultatet
            // Ingen söklogik är implementerad än, är alltså bara test för att se så att frontend och backend kan
            // prata med varandra :-).

            // Lite "leka" kod för att illustrera exempel på att hantera optional genreId
            String genreVärde = "";

            if (genreId.Length != 0)
            {
                // Bara lägg in samtliga genreId värden i en string, så kan vi t.ex printa den till debug.
                genreVärde = String.Join("; ", genreId);
            }
            else
            {
                // Ser till informera om att vi inte hittade några genreIds i våran Uri parameter lista 
                genreVärde = "Hittade inga genreIds";
            }

            // Exempel på hur man kan förbereda ett meddelande för att skickas tillbaka till frontend.
            // Vi printar resultatet till vår Visual Studio output console.
            string message = HttpUtility.HtmlEncode("\ngenreIds: " + genreVärde + "\npriceFrom: " + priceFrom + "\npriceTo: " + priceTo + "\nsearchValue: " + searchValue);
            Debug.Print("Debug från Search.Books. Så här ser ett urlEncodad svar ut där vi plockat ut våra Uri parametrar: " + message + "\n");

            // Skicka tillbaka ett resultat.
            // Detta skickar tillbaka samtliga böcker, bara så att vi kan testa 
            // att frontend tar emot en bok array på rätt sätt :-).
            return db.Books;

        }
        
        // GET api/Search
     
        //public List<SearchDTO> Books()
        //{
        //   string jonas = "testar från books";
        //    string searchString = "Hugo";
        //    Debug.WriteLine("från books");


           

        //    var bookSearch = from b in db.Books
        //                where b.Title.Contains(searchString)
        //                select new SearchDTO()
        //                {
        //                    Id = b.Id,
        //                    Title = b.Title,
        //                    Description = b.Description,
        //                    Year = b.Year,
        //                    Price = b.Price,
        //                    StockBalance = b.StockBalance   
        //                };
        //    List <SearchDTO> BookSearch2 = new List<SearchDTO>();
        //    foreach (var bs in bookSearch)
        //    {
        //        BookSearch2.Add(new SearchDTO()
        //        {
        //            Id = bs.Id,
        //            Title = bs.Title,
        //            Description = bs.Description,
        //            Year = bs.Year,
        //            Price = bs.Price,
        //            StockBalance = bs.StockBalance
        //        });
        //    }
        //    //if (bookSearch == null)
        //    //{
        //    //   return bookSearch;
        //    //}
        //    return BookSearch2;
        //}
        


   
        //public IQueryable<SearchDTO> GetSearchDTOes()
        //{
        //    return db.SearchDTOes;
        //}

        // GET api/Search/5
        //[ResponseType(typeof(SearchDTO))]
        //public async Task<IHttpActionResult> GetSearchDTO(int id)
        //{
        //    SearchDTO searchdto = await db.SearchDTOes.FindAsync(id);
        //    if (searchdto == null)
        //    {
        //        return NotFound();
        //    }

        //    return Ok(searchdto);
        //}
        // PUT api/Search/5

        //public async Task<IHttpActionResult> PutSearchDTO(int id, SearchDTO searchdto)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    if (id != searchdto.Id)
        //    {
        //        return BadRequest();
        //    }

        //    db.Entry(searchdto).State = EntityState.Modified;

        //    try
        //    {
        //        await db.SaveChangesAsync();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
                //if (!SearchDTOExists(id))
                //{
                //    return NotFound();
                //}
                //else
                //{
                //    throw;
                //}
                

        //    return StatusCode(HttpStatusCode.NoContent);
        //}

        // POST api/Search
        //[ResponseType(typeof(SearchDTO))]
        //public async Task<IHttpActionResult> PostSearchDTO(SearchDTO searchdto)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    db.SearchDTOes.Add(searchdto);
        //    await db.SaveChangesAsync();
        //    return CreatedAtRoute("DefaultApi", new { id = searchdto.Id }, searchdto);
        //}

        // DELETE api/Search/5
        //[ResponseType(typeof(SearchDTO))]
        //public async Task<IHttpActionResult> DeleteSearchDTO(int id)
        //{
        //    SearchDTO searchdto = await db.SearchDTOes.FindAsync(id);
        //    if (searchdto == null)
        //    {
        //        return NotFound();
        //    }
        //    db.SearchDTOes.Remove(searchdto);
        //    await db.SaveChangesAsync();
        //    return Ok(searchdto);
        //}

        //protected override void Dispose(bool disposing)
        //{
        //    if (disposing)
        //    {
        //        db.Dispose();
        //    }

        //    base.Dispose(disposing);
        //}
        //private bool SearchDTOExists(int id)
        //{
        //    return db.SearchDTOes.Count(e => e.Id == id) > 0;
        //}
           
        
    }
}