using AddressBookAPI.Domain.Models;
using Microsoft.EntityFrameworkCore;


namespace AddressBookAPI.Infrastructure.Data
{
    public class ContactDbContext : DbContext
    {
        public ContactDbContext(DbContextOptions<ContactDbContext> options) : base(options) { }
        public DbSet<ContactModel> ContactDetails  {get; set;} 
    }
}
 