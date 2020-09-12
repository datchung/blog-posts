using Microsoft.EntityFrameworkCore;
using System;

namespace WebApp.Models
{
    public class WebAppContext : DbContext
    {
        public DbSet<Note> Notes { get; set; }

        public WebAppContext(DbContextOptions<WebAppContext> options)
            : base(options)
        {
        }

        /// <summary>
        /// Seed data
        /// </summary>
        /// <param name="modelBuilder"></param>
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Note>().HasData(new[] {
                new Note {
                    NoteId = Guid.NewGuid(),
                    CreatedDate = DateTime.UtcNow,
                    Title = "Note 1",
                    Content = "Note 1 content here"
                },
                new Note {
                    NoteId = Guid.NewGuid(),
                    CreatedDate = DateTime.UtcNow.AddDays(-1),
                    Title = "Note 2",
                    Content = "Note 2 content here"
                }
            });
        }
    }
}
