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
export class eventListeners {
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
        // //DELETE
        var deleteIcon = document.querySelector('.delete-icon');
        deleteIcon.addEventListener("click", () => __awaiter(this, void 0, void 0, function* () {
            operationsObject.deleteUserDataInTable(tagId);
            servicesObject.deleteUserData(tagId);
            var divTagId = document.getElementsByClassName('contact-details')[0];
            var id = divTagId.firstElementChild.id;
            var userData = yield servicesObject.getContactById(parseInt(id));
            document.getElementById(id).style.backgroundColor = '#00b7ff30';
            operationsObject.displayUserData(userData, parseInt(id));
        }));
        //SUBMIT BUTTON
        buttonValue.addEventListener('click', (e) => __awaiter(this, void 0, void 0, function* () {
            var x = e.target;
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
                var userData = yield servicesObject.getContactById(tagId);
                operationsObject.displayUserData(userData, tagId);
                operationsObject.displayUserDataInTable(userData, tagId);
            }
        }));
        //CANCEL BUTTON
        var buttonType = document.getElementById('cancel-btn');
        buttonType.addEventListener('click', () => {
            document.getElementById('popup-form').style.visibility = "hidden";
            this.addEventListenerForDiv();
        });
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
