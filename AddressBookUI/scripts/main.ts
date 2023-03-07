import { operationsObject, tagId } from "../scripts/index.js";
import { servicesObject } from '../scripts/servicesModule/userServices.js';
import { User } from "./model/user.js";

export class eventListeners {
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

        // //DELETE
        var deleteIcon: HTMLElement = document.querySelector('.delete-icon');
        deleteIcon.addEventListener("click", async() => {
            operationsObject.deleteUserDataInTable(tagId);
            servicesObject.deleteUserData(tagId);
            var divTagId = document.getElementsByClassName('contact-details')[0] as HTMLElement;
            var id = divTagId.firstElementChild.id;
            var userData = await servicesObject.getContactById(parseInt(id));
            document.getElementById(id).style.backgroundColor = '#00b7ff30';
            operationsObject.displayUserData(userData, parseInt(id));
        });

        //SUBMIT BUTTON
        buttonValue.addEventListener('click', async (e) => {
            var x = e.target as HTMLInputElement;
            if (x.value == "Add") {
                document.getElementById('popup-form').style.visibility = "hidden";
                this.addEventListenerForDiv();
                operationsObject.addUserDataInList();
            }
            if (x.value == "Edit") {
                document.getElementById('popup-form').style.visibility = "hidden";
                this.addEventListenerForDiv();
                var formData = operationsObject.getUserDataFromForm(tagId);
                servicesObject.editUserData(formData, tagId);
                var userData = await servicesObject.getContactById(tagId);
                operationsObject.displayUserData(userData, tagId);
                operationsObject.displayUserDataInTable(userData, tagId);
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
