using Dapper.Contrib.Extensions;
using AddressBookAPI.Domain.Models;
using AddressBookAPI.Service.Interfaces;
using AddressBookAPI.Infrastructure.Data;
using Microsoft.Data.SqlClient;
using Dapper;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace AddressBookAPI.Repositories
{
    public class DapperContactRepository : IContactServices
    {

        private ContactDetailsContext _db;
        public DapperContactRepository(ContactDetailsContext db)
        {
            _db = db;
        }

        public IEnumerable<ContactModel> GetAllContacts()
        {
            return _db.connection.GetAll<ContactModel>();
        }


        public int AddContact(ContactModel contact)
        {
            return (int)_db.connection.Insert(contact);
        }
            
        public ContactModel GetContactById(int id)
        {
            ContactModel contact = _db.connection.Get<ContactModel>(id);
            return contact;
        }

        public void UpdateContact(ContactModel contact)
        {
            _db.connection.Update(contact);
        }

        public void DeleteContact(int Id)
        {
            ContactModel contact = this.GetContactById(Id);
            _db.connection.Delete(contact);
        }
        public IEnumerable<ContactModel> GetMatchedContacts(string inputString)
        { 
            string sql = "SELECT * FROM ContactDetails WHERE name LIKE @inputString OR email LIKE @inputString OR mobile LIKE @inputString";
            IEnumerable<ContactModel> results = _db.connection.Query<ContactModel>(sql, new { inputString= "%" + inputString + "%" });
            return results;
        }

    }
}
