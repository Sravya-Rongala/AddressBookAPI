using Dapper.Contrib.Extensions;
using AddressBookAPI.Domain.Models;
using AddressBookAPI.Infrastructure.Interfaces;
using AddressBookAPI.Infrastructure.Data;


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

        public ContactNoteModel GetContactNoteById(int id)
        {
            ContactNoteModel contact = _db.connection.Get<ContactNoteModel>(id);
            return contact;
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

    }
}
