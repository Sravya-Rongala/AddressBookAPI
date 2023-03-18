import { dataObj } from '../data/dataFile.js';
import { User } from '../model/user.js';

class UserServices {

   async addUserData(newUserData: User) {
      let jsonData = JSON.stringify(newUserData);
      return await dataObj.addContactData(jsonData);
   };

   editUserData(formData: User,userId: number) {
      let jsonData = JSON.stringify(formData)
      dataObj.updateContactData(jsonData,userId);
   };

   deleteUserData(userId: number) {
      dataObj.deleteContact(userId);
   };

   async getContactData() {
      return await dataObj.getContactData();
   }

   async getContactById(id:number){
      return await dataObj.getContactById(id);
   }

   async getFirstContactId() {
      var contactList = await dataObj.getContactData();
      return await contactList.length > 0 ? contactList[0].id : undefined;
   }

   async getMatchedContacts(searchInput: string) {
      var contactList = await dataObj.getMatchedContacts(searchInput);
      return await contactList;
   }

}

export let servicesObject = new UserServices();