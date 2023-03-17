import { operationsObject, tagId } from "../scripts/index.js";
import { servicesObject } from '../scripts/servicesModule/userServices.js';
import { isFormValid } from "../scripts/index.js";

export class EventListeners {
    constructor() {
        var buttonValue = document.getElementById('submit-btn') as HTMLInputElement;

        //ADD
        document.getElementById('nav-add-btn').addEventListener('click', () => {
            var s = document.getElementById('user-details-form') as HTMLFormElement;
            s.reset();
            buttonValue.value = "Add";
            document.getElementById('popup-form').style.visibility = "visible";
            this.removeEventListenerForDiv();
        });

        //EDIT
        var editIcon: HTMLElement = document.querySelector('.edit-icon');
        editIcon.addEventListener("click", () => {
            buttonValue.value = "Edit";
            operationsObject.displayValuesInForm(tagId);
            document.getElementById('popup-form').style.visibility = "visible";
            this.removeEventListenerForDiv();
        });

        //DELETE
        var deleteIcon: HTMLElement = document.querySelector('.delete-icon');
        deleteIcon.addEventListener("click", async () => {
            operationsObject.deleteContactInTable(tagId);
            servicesObject.deleteUserData(tagId);
            var divTagId = document.getElementsByClassName('contact-details')[0] as HTMLElement;
            var id = divTagId.firstElementChild.id;
            var userData = await servicesObject.getContactById(parseInt(id));
            document.getElementById(id).style.backgroundColor = '#00b7ff30';
            operationsObject.displayContactData(userData, parseInt(id));
        });

        //SEARCH BAR 
        var searchBar: HTMLInputElement = document.querySelector('.search-field');
        searchBar.addEventListener('input', async () => {
            var searchInput = searchBar.value;
            var element = document.getElementsByClassName('contact-details')[0];
            while (element.firstChild) {
                element.removeChild(element.firstChild);
            }
            if (searchInput.length == 0) {
                operationsObject.createContactTable();
            }
            else {
                var userData = await servicesObject.getMatchedContacts(searchInput);

                userData.forEach(element => {
                    operationsObject.addContactDataInTable(element.id);
                });

            }
        });

        //SUBMIT BUTTON
        buttonValue.addEventListener('click', async (e) => {
            var x = e.target as HTMLInputElement;
            if (x.value == "Add" && isFormValid == true) {
                console.log(isFormValid)
                document.getElementById('popup-form').style.visibility = "hidden";
                this.addEventListenerForDiv();
                operationsObject.addContactDataInList();
            }
            if (x.value == "Edit") {
                document.getElementById('popup-form').style.visibility = "hidden";
                this.addEventListenerForDiv();
                var formData = operationsObject.getContactDataFromForm(tagId);
                servicesObject.editUserData(formData, tagId);
                var userData = await servicesObject.getContactById(tagId);
                operationsObject.displayContactData(userData, tagId);
                operationsObject.displayContactDataInTable(userData, tagId);
            }
        });

        //CANCEL BUTTON
        var buttonType = document.getElementById('cancel-btn') as HTMLInputElement;
        buttonType.addEventListener('click', () => {
            document.getElementById('popup-form').style.visibility = "hidden";
            this.addEventListenerForDiv();
        });
    }

    removeEventListenerForDiv() {
        var contactDetails = document.getElementById('contact-details') as HTMLElement;
        var childNodes = contactDetails.childNodes;
        for (var element = 0; element < childNodes.length; element++) {
            childNodes[element].removeEventListener('click', operationsObject.displayDataOnClick);
        }
    }

    addEventListenerForDiv() {
        var contactDetails = document.getElementById('contact-details') as HTMLElement;
        var childNodes = contactDetails.childNodes;
        for (var element = 0; element < childNodes.length; element++) {
            childNodes[element].addEventListener('click', operationsObject.displayDataOnClick);
        }
    }
}
