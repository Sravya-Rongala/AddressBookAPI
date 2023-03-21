using Dapper.Contrib.Extensions;
using AddressBookAPI.Domain.Models;
using AddressBookAPI.Infrastructure.Interfaces;
using AddressBookAPI.Infrastructure.Data;
using Dapper;


namespace AddressBookAPI.Repositories
{
    public class DapperContactNoteRepository : IContactNoteRepository
    {

        private ContactDetailsContext _db;
        public DapperContactNoteRepository(ContactDetailsContext db)
        {
            _db = db;
        }

        public void AddContactNote(ContactNoteModel contact)
        {
             _db.connection.Insert(contact);
        }

        public int GetContactNoteIdByContactId(int contactId)
        { 
            var sql = "SELECT Id FROM ContactNote WHERE ContactId = @contactId";
            int Id = _db.connection.QueryFirstOrDefault<int>(sql, new { ContactId = contactId});
            return Id;
        }
        public ContactNoteModel GetContactNoteById(int id)
        {
            ContactNoteModel contact;
            try
            {
                contact = _db.connection.Get<ContactNoteModel>(id);
                return contact;
            }
            catch
            {
                contact= null;
                return contact;
            }
        }

        public void UpdateContactNote(ContactNoteModel contact)
        {
            _db.connection.Update(contact);
        }

        public void DeleteContactNote(int Id)
        {
            ContactNoteModel contact = this.GetContactNoteById(Id);
            _db.connection.Delete(contact);
        }

        public IEnumerable<ContactNoteModel> GetAllContactNotes()
        {
            return  _db.connection.GetAll<ContactNoteModel>();
        }

    }
}
