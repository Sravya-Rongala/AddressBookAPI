using AddressBookAPI.Domain.Models;

namespace AddressBookAPI.Infrastructure.Interfaces
{
    public interface IContactNoteRepository
    {
        ContactNoteModel GetContactNoteById(int id);
        void AddContactNote(ContactNoteModel contact);
        void UpdateContactNote(ContactNoteModel contact);
        void DeleteContactNote(int id);
        
    }
}
