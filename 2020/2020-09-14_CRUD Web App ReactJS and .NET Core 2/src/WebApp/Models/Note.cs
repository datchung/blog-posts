using System;

namespace WebApp.Models
{
    public class Note
    {
        public Guid NoteId { get; set; }
        public DateTime CreatedDate { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
    }
}
