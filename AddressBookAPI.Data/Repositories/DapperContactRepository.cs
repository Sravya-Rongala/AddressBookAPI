using Dapper.Contrib.Extensions;
using AddressBookAPI.Domain.Models;
using AddressBookAPI.Infrastructure.Interfaces;
using AddressBookAPI.Infrastructure.Data;
using Microsoft.Data.SqlClient;
using Dapper;

namespace AddressBookAPI.Repositories
{
    public class DapperContactRepository : IContactRepository
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
            try
            {
                ContactModel contact = _db.connection.Get<ContactModel>(id);
                return contact;
            }
            catch 
            {
               ContactModel contactModel = null;
                return contactModel;
            }
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
        public IEnumerable<ContactModel> GetMatchedContacts(string searchString)
        { 
            string sql = "SELECT * FROM ContactDetails WHERE name LIKE @searchString OR email LIKE @searchString OR mobile LIKE @searchString";
            IEnumerable<ContactModel> results = _db.connection.Query<ContactModel>(sql, new { searchString= "%" + searchString + "%" });
            return results;
        }

    }
}
