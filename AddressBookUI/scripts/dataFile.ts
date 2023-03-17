import { User } from "./model/user.js";

var apiUrl = 'https://localhost:7216/contacts';
const headers = new Headers({
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': '*',
});

class ContactDetailsData
{
  async getContactData() : Promise<User[]>
  {
    const request = new Request(apiUrl, {
      method: 'GET',
      headers: headers
    });
    return fetch(request)
      .then(response => {
      return response.json();
    });
  }

  async getContactById(id:number): Promise<User>{
      var Url = apiUrl+"/"+id;
      const request = new Request(Url, {
      method: 'GET',
      headers: headers
    });
    return await fetch(request)
      .then(response => {
      return response.json();
    });
  }

  async addContactData(userData: any) {
    const request = new Request(apiUrl, {
      method: 'POST',
      headers: headers,
      body: userData
    })
    return await fetch(request)
      .then(response => 
        {
          if(response.ok){
            return response.json();
          }
          else{
            return 0;
          }
      }).then(data => {
      return data;
    });
  }

  async updateContactData(userData: any,userId: number)
  {
    var Url = apiUrl+"/"+userId;
    const request = new Request(Url, {
      method: 'PUT',
      headers: headers,
      body: userData
    })
    await fetch(request)
      .then(response => {
       response.json();
    });
  }

  async deleteContact(userId: number) : Promise<void> {
    var Url = apiUrl+"/"+userId;
    const request = new Request(Url, {
      method: 'DELETE',
      headers: headers
    })
    await fetch(request)
      .then(response => {
       response.json();
    });
  }

  async getMatchedContacts(inputString :string): Promise<User[]>{
    var Url = apiUrl+"/inputString?inputString="+inputString;
    const request = new Request(Url, {
    method: 'GET',
    headers: headers
  });
  return await fetch(request)
    .then(response => {
    return response.json();
  });
}

}

export let dataObj = new ContactDetailsData();
