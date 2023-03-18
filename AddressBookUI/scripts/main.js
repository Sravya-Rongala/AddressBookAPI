var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { operationsObject, tagId } from "../scripts/index.js";
import { servicesObject } from '../scripts/servicesModule/userServices.js';
import { isFormValid } from "../scripts/index.js";
export class EventListeners {
    constructor() {
        var buttonValue = document.getElementById('submit-btn');
        //ADD
        document.getElementById('nav-add-btn').addEventListener('click', () => {
            var s = document.getElementById('user-details-form');
            s.reset();
            buttonValue.value = "Add";
            document.getElementById('popup-form').style.visibility = "visible";
            this.removeEventListenerForDiv();
        });
        //EDIT
        var editIcon = document.querySelector('.edit-icon');
        editIcon.addEventListener("click", () => {
            buttonValue.value = "Edit";
            operationsObject.displayValuesInForm(tagId);
            document.getElementById('popup-form').style.visibility = "visible";
            this.removeEventListenerForDiv();
        });
        //DELETE
        var deleteIcon = document.querySelector('.delete-icon');
        deleteIcon.addEventListener("click", () => __awaiter(this, void 0, void 0, function* () {
            operationsObject.deleteContactInTable(tagId);
            servicesObject.deleteUserData(tagId);
            var divTagId = document.getElementsByClassName('contact-details')[0];
            var id = divTagId.firstElementChild.id;
            var userData = yield servicesObject.getContactById(parseInt(id));
            document.getElementById(id).style.backgroundColor = '#00b7ff30';
            operationsObject.displayContactData(userData, parseInt(id));
        }));
        //SEARCH BAR 
        var searchBar = document.querySelector('.search-field');
        searchBar.addEventListener('input', () => __awaiter(this, void 0, void 0, function* () {
            var searchInput = searchBar.value;
            var element = document.getElementsByClassName('contact-details')[0];
            while (element.firstChild) {
                element.removeChild(element.firstChild);
            }
            if (searchInput.length == 0) {
                operationsObject.createContactTable();
            }
            else {
                var userData = yield servicesObject.getMatchedContacts(searchInput);
                userData.forEach(element => {
                    operationsObject.addContactDataInTable(element.id);
                });
            }
        }));
        //SUBMIT BUTTON
        buttonValue.addEventListener('click', (e) => __awaiter(this, void 0, void 0, function* () {
            var x = e.target;
            if (x.value == "Add" && isFormValid == true) {
                console.log(isFormValid);
                document.getElementById('popup-form').style.visibility = "hidden";
                this.addEventListenerForDiv();
                operationsObject.addContactDataInList();
            }
            if (x.value == "Edit") {
                document.getElementById('popup-form').style.visibility = "hidden";
                this.addEventListenerForDiv();
                var formData = operationsObject.getContactDataFromForm(tagId);
                servicesObject.editUserData(formData, tagId);
                var userData = yield servicesObject.getContactById(tagId);
                operationsObject.displayContactData(userData, tagId);
                operationsObject.displayContactDataInTable(userData, tagId);
            }
        }));
        //CANCEL BUTTON
        var buttonType = document.getElementById('cancel-btn');
        buttonType.addEventListener('click', () => {
            document.getElementById('popup-form').style.visibility = "hidden";
            this.addEventListenerForDiv();
        });
        // var noteIcon = document.querySelector('.notes-icon') as HTMLElement;
    }
    removeEventListenerForDiv() {
        var contactDetails = document.getElementById('contact-details');
        var childNodes = contactDetails.childNodes;
        for (var element = 0; element < childNodes.length; element++) {
            childNodes[element].removeEventListener('click', operationsObject.displayDataOnClick);
        }
    }
    addEventListenerForDiv() {
        var contactDetails = document.getElementById('contact-details');
        var childNodes = contactDetails.childNodes;
        for (var element = 0; element < childNodes.length; element++) {
            childNodes[element].addEventListener('click', operationsObject.displayDataOnClick);
        }
    }
}
