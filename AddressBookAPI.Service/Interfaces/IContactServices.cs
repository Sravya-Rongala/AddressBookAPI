﻿using AddressBookAPI.Domain.Models;

namespace AddressBookAPI.Service.Interfaces
{
    public interface IContactServices
    {
        ContactModel GetContactById(int id);
        IEnumerable<ContactModel> GetAllContacts();

        int AddContactDetails(ContactModel contact);
        void UpdateContactDetails(ContactModel contact);
        void DeleteContact(int id);
        IEnumerable<ContactModel> GetMatchedContacts(string searchString);
    }
}
