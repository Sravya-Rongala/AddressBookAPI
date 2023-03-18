using Dapper.Contrib.Extensions;
namespace AddressBookAPI.Domain.Models
{
    [Table("ContactNote")]
    public class ContactNoteModel
    {
        [Key]
        public int Id { get; set; } 
        public int ContactId { get; set; }

        public string? Note { get; set; }

    }
}
