var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { dataObj } from '../data/dataFile.js';
class UserServices {
    addUserData(newUserData) {
        return __awaiter(this, void 0, void 0, function* () {
            let jsonData = JSON.stringify(newUserData);
            return yield dataObj.addContactData(jsonData);
        });
    }
    ;
    editUserData(formData, userId) {
        let jsonData = JSON.stringify(formData);
        dataObj.updateContactData(jsonData, userId);
    }
    ;
    deleteUserData(userId) {
        dataObj.deleteContact(userId);
    }
    ;
    getContactData() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield dataObj.getContactData();
        });
    }
    getContactById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield dataObj.getContactById(id);
        });
    }
    getFirstContactId() {
        return __awaiter(this, void 0, void 0, function* () {
            var contactList = yield dataObj.getContactData();
            return (yield contactList.length) > 0 ? contactList[0].id : undefined;
        });
    }
    getMatchedContacts(searchInput) {
        return __awaiter(this, void 0, void 0, function* () {
            var contactList = yield dataObj.getMatchedContacts(searchInput);
            return yield contactList;
        });
    }
}
export let servicesObject = new UserServices();
