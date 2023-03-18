import { User } from '../scripts/model/user.js';
import { servicesObject } from './servicesModule/userServices.js';
import { EventListeners } from './main.js';

export var tagId: number;
export var isFormValid: boolean = true;

var emailRegexp = /^([a-zA-Z0-9\.\ -_$#!^&*]+)@([a-zA-Z0-9]+)\.([a-z]+)(.[a-z]+)?$/;
var contactRegexp = /^[6 9][0-9]{9}$/;
var mandatoryFields = ["name", "email", "mobile"];

class ContactOperations {

    constructor() {
        this.createContactTable();
        this.getFirstContactId();
    }

    async getFirstContactId() {
        tagId = await servicesObject.getFirstContactId().then(data => { return data; });
        var userData = await servicesObject.getContactById(tagId);
        this.displayContactData(userData, tagId);
    }

    async createContactTable() {
        var userData: any = await servicesObject.getContactData();
        for (const item of userData) {
            await this.addContactDataInTable(item.id);
            this.addBackground(tagId);
        }
    }

    async addContactDataInList() {
        var formData = this.getContactDataFromForm(0);
        isFormValid = true;
        mandatoryFields.forEach(
            element => {
                isFormValid = this.formValidation(element) && isFormValid;
            }
        )
        if (isFormValid) {
            var userId = await servicesObject.addUserData(formData);
            if (userId != 0) {
                this.removeBackground(tagId);
                tagId = userId;
                this.addContactDataInTable(tagId);
                await servicesObject.getContactById(tagId).then((userData) => {
                    this.displayContactData(userData, tagId);
                });
                this.addBackground(tagId);
            }
        }
    }

    async addContactDataInTable(id: number) {
        await servicesObject.getContactById(id)
            .then((userData) => {
                var div: any = document.createElement('div');
                div.id = id;
                var name: any = document.createElement('p');
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
                div.style.border = "1px solid darkgrey";
                div.addEventListener('click', this.displayDataOnClick);
            });
    }

    addBackground(tagId: number) {
        document.getElementById(tagId.toString()).style.backgroundColor = '#00b7ff30';
    }

    async displayDataOnClick(this: HTMLElement) {
        var userId = parseInt(this.id);
        var userData = await servicesObject.getContactById(userId);
        operationsObject.removeBackground(tagId);
        tagId = userId;
        operationsObject.addBackground(tagId);
        operationsObject.displayContactData(userData, userId);
    }

    displayContactData(userData: User, userId: number) {
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

    async displayValuesInForm(userId: number) {
        await servicesObject.getContactById(userId)
            .then((userData) => {
                var name = document.getElementsByClassName('form-name')[0] as HTMLInputElement;
                name.value = userData.name;
                var email = document.getElementsByClassName('form-email')[0] as HTMLInputElement;
                email.value = userData.email;
                var mobile = document.getElementsByClassName('form-mobile')[0] as HTMLInputElement;
                mobile.value = userData.mobile;
                var landline = document.getElementsByClassName('form-landline')[0] as HTMLInputElement;
                landline.value = userData.landline;
                var website = document.getElementsByClassName('form-website')[0] as HTMLInputElement;
                website.value = userData.website;
                var address = document.getElementsByClassName('form-address')[0] as HTMLInputElement;
                address.value = userData.address;
            })
    }

    displayContactDataInTable(userData: User, tagId: number) {
        var divTag = document.getElementById(tagId.toString()) as HTMLElement;
        divTag.firstChild.textContent = userData.name;
        divTag.children[1].textContent = userData.email;
        divTag.lastChild.textContent = userData.mobile;
    }

    deleteContactInTable(tagId: number) {
        var divTag = document.getElementById(tagId.toString()) as HTMLElement;
        divTag.remove();
    }

    getContactDataFromForm(userId: number) {
        var name = (<HTMLInputElement>document.getElementsByClassName('form-name')[0]).value;
        var email = (<HTMLInputElement>document.getElementsByClassName('form-email')[0]).value;
        var mobile = (<HTMLInputElement>document.getElementsByClassName('form-mobile')[0]).value;
        var landline = (<HTMLInputElement>document.getElementsByClassName('form-landline')[0]).value;
        var website = (<HTMLInputElement>document.getElementsByClassName('form-website')[0]).value;
        var address = (<HTMLTextAreaElement>document.getElementsByClassName('form-address')[0]).value;
        var description = (<HTMLTextAreaElement>document.getElementsByClassName('form-description')[0]).value;
        var formData = { id: userId, name: name, email: email, mobile: mobile, landline: landline, website: website, address: address,description: description };
        return formData;
    }

    formValidation(inputData: string) {
        var value = (<HTMLInputElement>document.getElementById(inputData)).value;
        if (!value) {
            this.setMandatoryFieldMessage(inputData, `${inputData} is required`)
        }
        else if (inputData == "email" && !(emailRegexp.test(value.trim()))) {
            this.setMandatoryFieldMessage(inputData, "Email is invalid");
        }
        else if (inputData == "mobile" && !(contactRegexp.test(value.trim()))) {
            this.setMandatoryFieldMessage(inputData, "Mobile is invalid");
        }
        else {
            this.setMandatoryFieldMessage(inputData, " *")
            return true;
        }
        return false;
    }

    setMandatoryFieldMessage(fieldName: string,message: string) {
        (<HTMLSpanElement> document.getElementById(`${fieldName}-mandatory`)).innerHTML=message;
    }

    removeBackground(tagId: number) {
        document.getElementById(tagId.toString()).style.backgroundColor = 'white';
    }

}

export let operationsObject = new ContactOperations();
let eventListenersObj = new EventListeners();

