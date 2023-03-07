var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var apiUrl = 'https://localhost:7216/contacts';
const headers = new Headers({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': '*',
});
class ContactDetailsData {
    getContactData() {
        return __awaiter(this, void 0, void 0, function* () {
            const request = new Request(apiUrl, {
                method: 'GET',
                headers: headers
            });
            return fetch(request)
                .then(response => {
                return response.json();
            });
        });
    }
    getContactById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            var Url = apiUrl + "/" + id;
            const request = new Request(Url, {
                method: 'GET',
                headers: headers
            });
            return yield fetch(request)
                .then(response => {
                return response.json();
            });
        });
    }
    addContactData(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = new Request(apiUrl, {
                method: 'POST',
                headers: headers,
                body: userData
            });
            return yield fetch(request)
                .then(response => {
                if (response.ok) {
                    return response.json();
                }
                else {
                    return 0;
                }
            }).then(data => {
                console.log(data);
                return data;
            });
        });
    }
    updateContactData(userData, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            var Url = apiUrl + "/" + userId;
            const request = new Request(Url, {
                method: 'PUT',
                headers: headers,
                body: userData
            });
            yield fetch(request)
                .then(response => {
                response.json();
            });
        });
    }
    deleteContact(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            var Url = apiUrl + "/" + userId;
            const request = new Request(Url, {
                method: 'DELETE',
                headers: headers
            });
            yield fetch(request)
                .then(response => {
                response.json();
            });
        });
    }
}
export let dataObj = new ContactDetailsData();
