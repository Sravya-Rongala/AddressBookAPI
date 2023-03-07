using Dapper.Contrib.Extensions;
using System.ComponentModel.DataAnnotations;
namespace AddressBookAPI.Domain.Models
{
    [Table("ContactDetails")]
    public class ContactModel
    {
        public int Id { get; set; }
        [Required(ErrorMessage = "Name is Required")]
        public string? Name { get; set; }
        [Required(ErrorMessage = "Email is Required")]
        [RegularExpression(@"^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$", ErrorMessage = "Email Is Invalid")]
        public string? Email { get; set; }
        [Required(ErrorMessage = "Mobile Number is Required")]
        [RegularExpression(@"^(\+91)?[6789]\d{9}$", ErrorMessage = "Mobile Number Is Invalid")]
        public string? Mobile { get; set; }
        public string? Landline { get; set; }

        public string? Website { get; set; }

        public string? Address { get; set; }

    }
}