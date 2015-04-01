using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using BookService.Models;

namespace BookService.Controllers
{
    public class SearchAuthorController : ApiController
    {
        private BookServiceContext db = new BookServiceContext();

        [ResponseType(typeof(AuthorDTO))]
        // GET api/SearchAuthor
        public List<AuthorDTO> GetAuthors([FromUri]  string searchValue = null)
        {

            List<AuthorDTO> NewAuthors;

            if (searchValue == null)
            {
                // sök utan söksträng med pris intervall
                NewAuthors = (from a in db.Authors

                           select new AuthorDTO()
                           {
                               Id = a.Id,
                               Name = a.Name 
                           }).ToList();
            }

            else
            { 
                // Sökning på Förf-namn

                NewAuthors = (from a in db.Authors
                           where a.Name.Contains(searchValue)
                           select new AuthorDTO()
                           {
                               Id = a.Id,
                               Name = a.Name 
                           }).ToList();
            }
            return NewAuthors;
        }

    

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool AuthorExists(int id)
        {
            return db.Authors.Count(e => e.Id == id) > 0;
        }
    }
}