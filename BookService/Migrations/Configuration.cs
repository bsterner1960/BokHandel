namespace BookService.Migrations
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;
    using BookService.Models;

    internal sealed class Configuration : DbMigrationsConfiguration<BookService.Models.BookServiceContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(BookService.Models.BookServiceContext context)
        {
            context.Authors.AddOrUpdate(x => x.Id,
                new Author() { Id = 1, Name = "Jane Austen" },
                new Author() { Id = 2, Name = "Charles Dickens" },
                new Author() { Id = 3, Name = "Miguel de Cervantes" },
                new Author() { Id = 4, Name = "Thomas" }
                );

            context.Genres.AddOrUpdate(x => x.Id,
                new Genre() { Id = 1, Name = "Comedy of manners"},
                new Genre() { Id = 2, Name = "Gothic parody" },
                new Genre() { Id = 3, Name = "Bildungsroman" },
                new Genre() { Id = 4, Name = "Picaresque" },
                new Genre() { Id = 5, Name = "Educational"},
                new Genre() { Id = 6, Name = "Drama", Description = "Ett läsdrama är ett litterärt verk i dramatisk form, men som anses olämpligt att uppföras på scenen, utan i stället är tänkt att läsas. Begreppet läsdrama har sitt ursprung i romantikens litteratur då man gärna blandade genrer. Dramer som ursprungligen skrevs som läsdramer har med senare teknik och estetik gjorts spelbara på teatern. Exempel på detta är Carl Jonas Love Almqvists Drottningens juvelsmycke och Amorina. Ett drama som ofta omtalats som läsdrama är Johann Wolfgang von Goethes Faust, speciellt del två. Goethe misslyckades själv sätta upp Faust (del ett) på hovteatern i Weimar och tvivlade därför på att det var möjligt. Men redan under hans livstid gjordes uppsättningar på andra teatrar. 1819 uppfördes scener ur dramat på lustslottet Monbijou i Berlin. Föreställningen regisserades av greve Carl von Brühl och huvudrollen spelades av Pius Alexander Wolff som studerat den för Goethe själv. 1829 skedde urpremiären av del ett i sin helhet på hovteatern i Braunschweig i regi av August Klingemann. Denna föreställning turnerade i Tyskland och en version av den uppfördes i Weimar i samband med Goethes 80-årsdag."},
                new Genre() { Id = 7, Name = "Comedy", Description = "Refers to any discourse or work generally intended to be humorous or to amuse by inducing laughter, especially in theatre, television, film and stand-up comedy. The origins of the term are found in Ancient Greece. In the Athenian democracy, the public opinion of voters was influenced by the political satire performed by the comic poets at the theaters. The theatrical genre of Greek comedy can be described as a dramatic performance which pits two groups or societies against each other in an amusing agon or conflict. Northrop Frye depicted these two opposing sides as a Society of Youth and a Society of the Old,.[2] A revised view characterizes the essential agon of comedy as a struggle between a relatively powerless youth and the societal conventions that pose obstacles to his hopes. In this struggle, the youth is understood to be constrained by his lack of social authority, and is left with little choice but to take recourse in ruses which engender very dramatic irony which provokes laughter.[3] Satire and political satire use comedy to portray persons or social institutions as ridiculous or corrupt, thus alienating their audience from the object of their humor. Parody subverts popular genres and forms, critiquing those forms without necessarily condemning them. Other forms of comedy include Screwball comedy, which derives its humor largely from bizarre, surprising (and improbable) situations or characters, and Black comedy, which is characterized by a form of humor that includes darker aspects of human behavior or human nature. Similarly scatological humor, sexual humor, and race humor create comedy by violating social conventions or taboos in comic ways. A comedy of manners typically takes as its subject a particular part of society (usually upper class society) and uses humor to parody or satirize the behavior and mannerisms of its members. Romantic comedy is a popular genre that depicts burgeoning romance in humorous terms and focuses on the foibles of those who are falling in love."}

                );

            context.Books.AddOrUpdate(x => x.Id,
                new Book()
                {
                    Id = 1,
                    Title = "Pride and Prejudice",
                    Year = 1813,
                    AuthorId = 1,
                    Price = 9.99M,
                    GenreId = 1
                },
                new Book()
                {
                    Id = 2,
                    Title = "Northanger Abbey",
                    Year = 1817,
                    AuthorId = 1,
                    Price = 12.95M,
                    GenreId = 2
                },
                new Book()
                {
                    Id = 3,
                    Title = "David Copperfield",
                    Year = 1850,
                    AuthorId = 2,
                    Price = 15,
                    GenreId = 3
                },
                new Book()
                {
                    Id = 4,
                    Title = "Don Quixote",
                    Year = 1617,
                    AuthorId = 3,
                    Price = 8.95M,
                    GenreId = 4
                },
                new Book()
                {
                    Id = 5,
                    Title = "The great adventure of C#",
                    Year = 2017,
                    AuthorId = 4,
                    Price = 5000,
                    GenreId = 5
                }
                );
            // Cookies!
        }
    }
}
