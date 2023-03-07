var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { servicesObject } from './servicesModule/userServices.js';
import { eventListeners } from './main.js';
export var tagId;
class operations {
    constructor() {
        this.createContact();
        this.getFirstContactId();
    }
    getFirstContactId() {
        return __awaiter(this, void 0, void 0, function* () {
            tagId = yield servicesObject.getFirstContactId().then(data => { return data; });
            var userData = yield servicesObject.getContactById(tagId);
            this.displayUserData(userData, tagId);
        });
    }
    createContact() {
        return __awaiter(this, void 0, void 0, function* () {
            var userData = yield servicesObject.getContactData();
            for (const item of userData) {
                yield this.addUserDataInTable(item.id);
                this.addBackground(tagId);
            }
        });
    }
    addUserDataInList() {
        return __awaiter(this, void 0, void 0, function* () {
            var formData = this.getUserDataFromForm(0);
            var userId = yield servicesObject.addUserData(formData);
            console.log(userId);
            if (userId != 0) {
                this.removeBackground(tagId);
                tagId = userId;
                this.addUserDataInTable(tagId);
                yield servicesObject.getContactById(tagId).then((userData) => {
                    this.displayUserData(userData, tagId);
                });
                this.addBackground(tagId);
            }
        });
    }
    addUserDataInTable(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield servicesObject.getContactById(id)
                .then((userData) => {
                var div = document.createElement('div');
                div.id = id;
                var name = document.createElement('p');
                name.textContent = userData.name;
                var email = document.createElement('p');
                email.textContent = userData.email;
                var mobile = document.createElement('p');
                mobile.textContent = userData.mobile;
                div.appendChild(name);
                div.appendChild(email);
                div.appendChild(mobile);
                var element = document.getElementsByClassName('contact-details')[0];
                element.appendChild(div);
                div.style.borderBottom = "1px solid darkgrey";
                div.addEventListener('click', this.displayDataOnClick);
            });
        });
    }
    addBackground(tagId) {
        document.getElementById(tagId.toString()).style.backgroundColor = '#00b7ff30';
    }
    displayDataOnClick() {
        return __awaiter(this, void 0, void 0, function* () {
            var userId = parseInt(this.id);
            var userData = yield servicesObject.getContactById(userId);
            operationsObject.removeBackground(tagId);
            tagId = userId;
            operationsObject.addBackground(tagId);
            operationsObject.displayUserData(userData, userId);
        });
    }
    displayUserData(userData, userId) {
        var name = document.getElementById('person-bio-name');
        name.textContent = userData.name;
        var email = document.getElementById('person-bio-email');
        email.textContent = "Email: " + userData.email;
        var mobile = document.getElementById('person-bio-mobile');
        mobile.textContent = "Mobile: " + userData.mobile;
        var landline = document.getElementById('person-bio-landline');
        landline.textContent = "Landline: " + userData.landline;
        var website = document.getElementById('person-bio-website');
        website.textContent = "Website: " + userData.website;
        var address = document.getElementById('person-bio-address');
        address.textContent = "Address:  " + userData.address;
        tagId = userId;
    }
    displayValuesInForm(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield servicesObject.getContactById(userId)
                .then((userData) => {
                var name = document.getElementsByClassName('form-name')[0];
                name.value = userData.name;
                var email = document.getElementsByClassName('form-email')[0];
                email.value = userData.email;
                var mobile = document.getElementsByClassName('form-mobile')[0];
                mobile.value = userData.mobile;
                var landline = document.getElementsByClassName('form-landline')[0];
                landline.value = userData.landline;
                var website = document.getElementsByClassName('form-website')[0];
                website.value = userData.website;
                var address = document.getElementsByClassName('form-address')[0];
                address.value = userData.address;
            });
        });
    }
    displayUserDataInTable(userData, tagId) {
        var divTag = document.getElementById(tagId.toString());
        divTag.firstChild.textContent = userData.name;
        divTag.children[1].textContent = userData.email;
        divTag.lastChild.textContent = userData.mobile;
    }
    deleteUserDataInTable(tagId) {
        var divTag = document.getElementById(tagId.toString());
        divTag.remove();
    }
    getUserDataFromForm(userId) {
        var name = document.getElementsByClassName('form-name')[0].value;
        var email = document.getElementsByClassName('form-email')[0].value;
        var mobile = document.getElementsByClassName('form-mobile')[0].value;
        var landline = document.getElementsByClassName('form-landline')[0].value;
        var website = document.getElementsByClassName('form-website')[0].value;
        var address = document.getElementsByClassName('form-address')[0].value;
        var formData = { id: userId, name: name, email: email, mobile: mobile, landline: landline, website: website, address: address };
        return formData;
    }
    removeBackground(tagId) {
        document.getElementById(tagId.toString()).style.backgroundColor = 'white';
    }
}
export let operationsObject = new operations();
let eventListenersObj = new eventListeners();
