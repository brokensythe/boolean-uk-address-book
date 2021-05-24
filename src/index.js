// Deliverables
// - A user can create a contact via a form when the "New Contact" button is clicked
//     - the created contact should have:
//         - first name
//         - last name
//         - street
//         - city
//         - post code
//         - an option to block the contact
//     - the created contact should be saved in the database
//     - the created contact should be added to the contacts list
// - A useer can edit a contact via a form when the "Edit" button is clicked
//     - the updated contact should be saved in the database
//     - the updated contact should be viewable in the UI
//     - the selected contact can also be deleted from the edit contact form
// - When a user submits a form they should be redirected to see the changes
//     - Use renderContactView to do this.

const viewSection = document.querySelector(".view-section");
const contactsSection = document.querySelector(".contacts-section");

const state = {
  contacts: [],
  selectedContact: null
};

/* [START] NO NEED TO EDIT */

function getContacts() {
  fetch("http://localhost:3000/contacts")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      state.contacts = data;

      renderContactsList();
    });
}

function renderContactsList() {
  const listEl = document.createElement("ul");
  listEl.className = "contacts-list";

  for (let i = 0; i < state.contacts.length; i++) {
    const contact = state.contacts[i];
    const listItemEl = renderContactListItem(contact);

    listEl.append(listItemEl);
  }

  contactsSection.append(listEl);
}

function renderAddressSection(address) {
  const containerEl = document.createElement("section");

  const headingEl = document.createElement("h2");
  headingEl.innerText = "Address";

  containerEl.append(headingEl);

  const streetText = document.createElement("p");
  streetText.innerText = address.street;

  containerEl.append(streetText);

  const cityText = document.createElement("p");
  cityText.innerText = address.city;

  containerEl.append(cityText);

  const postCodeText = document.createElement("p");
  postCodeText.innerText = address.postCode;

  containerEl.append(postCodeText);

  return containerEl;
}

function renderContactView() {
  const contact = state.selectedContact;

  if (!contact) return;

  viewSection.innerHTML = "";

  const containerEl = document.createElement("article");
  containerEl.className = "center light-shadow address-card";

  const headingEl = document.createElement("h1");

  const fullName = `${contact.firstName} ${contact.lastName}`;
  headingEl.innerText = fullName;

  containerEl.append(headingEl);

  const addressSectionEl = renderAddressSection(contact.address);

  containerEl.append(addressSectionEl);

  viewSection.append(containerEl);
}

/* [END] NO NEED TO EDIT */

function renderContactListItem(contact) {
  const listItemEl = document.createElement("li");

  const headingEl = document.createElement("h3");

  const fullName = `${contact.firstName} ${contact.lastName}`;

  headingEl.innerText = fullName;

  listItemEl.append(headingEl);

  const viewBtn = document.createElement("button");
  viewBtn.className = "button grey";
  viewBtn.innerText = "View";

  viewBtn.addEventListener("click", function () {
    state.selectedContact = contact;

    renderContactView();
  });

  listItemEl.append(viewBtn);

  const editBtn = document.createElement("button");
  editBtn.className = "button blue";
  editBtn.innerText = "Edit";

  editBtn.addEventListener("click", function () {
    // [TODO] Write Code
  });

  listItemEl.append(editBtn);

  return listItemEl;
}

function listenNewContactButton() {
  const btn = document.querySelector(".new-contact-btn");

  btn.addEventListener("click", function () {

    const formEl = document.createElement("form")
    formEl.setAttribute("class", "form-stack light-shadow center contact-form")
    
      const formHeading = document.createElement("h1")
      formHeading.innerText = "Create Contact"

      const firstNameLabel = document.createElement("label")
      firstNameLabel.setAttribute("for", "first-name-input")
      firstNameLabel.innerText = "First Name:"

      const firstNameInput = document.createElement("input")
      firstNameInput.setAttribute("id", "first-name-input")
      firstNameInput.setAttribute("name", "first-name-input")
      firstNameInput.setAttribute("type", "text")

      const lastNameLabel = document.createElement("label")
      lastNameLabel.setAttribute("for", "last-name-input")
      lastNameLabel.innerText = "Last Name:"

      const lastNameInput = document.createElement("input")
      lastNameInput.setAttribute("id", "last-name-input")
      lastNameInput.setAttribute("name", "last-name-input")
      lastNameInput.setAttribute("type", "text")

      const streetLabel = document.createElement("label")
      streetLabel.setAttribute("for", "street-input")
      streetLabel.innerText = "Street:"

      const streetInput = document.createElement("input")
      streetInput.setAttribute("id", "street-input")
      streetInput.setAttribute("name", "street-input")
      streetInput.setAttribute("type", "text")

      const cityLabel = document.createElement("label")
      cityLabel.setAttribute("for", "city-input")
      cityLabel.innerText = "City:"

      const cityInput = document.createElement("input")
      cityInput.setAttribute("id", "city-input")
      cityInput.setAttribute("name", "city-input")
      cityInput.setAttribute("type", "text")

      const postcodeLabel = document.createElement("label")
      postcodeLabel.setAttribute("for", "post-code-input")
      postcodeLabel.innerText = "Post Code:"

      const postcodeInput = document.createElement("input")
      postcodeInput.setAttribute("id", "post-code-input")
      postcodeInput.setAttribute("name", "post-code-input")
      postcodeInput.setAttribute("type", "text")

      const checkboxSection = document.createElement("div")
      checkboxSection.setAttribute("class", "checkbox-section")

        const checkboxInput = document.createElement("input")
        checkboxInput.setAttribute("id", "block-checkbox")
        checkboxInput.setAttribute("name", "block-checkbox")
        checkboxInput.setAttribute("type", "checkbox")

        const checkboxLabel = document.createElement("label")
        checkboxLabel.setAttribute("for", "block-checkbox")
        checkboxLabel.innerText = "Block"

      checkboxSection.append(checkboxInput, checkboxLabel)

      const formActions = document.createElement("div")
      formActions.setAttribute("class", "actions-section")

        const submitButton = document.createElement("button")
        submitButton.setAttribute("class", "button blue")
        submitButton.setAttribute("type", "submit")
        submitButton.innerText = "Create"

        submitButton.addEventListener("click", function (event) {
          event.preventDefault()
          
          let contact = {
            firstName: firstNameInput.value,
            lastName: lastNameInput.value,
            blockContact: checkboxInput.checked,
            addressId: null
          }
          
          const address = {
            street: streetInput.value,
            city: cityInput.value,
            postCode: postcodeInput.value
          }
          
          fetch("http://localhost:3000/addresses", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(address)
          })
            .then( response => response.json() )
            .then( function (newAddress) {
              contact.addressId = newAddress.id
              fetch("http://localhost:3000/contacts", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify(contact)
              })
              }
              )
            
            // main()
          })

      formActions.append(submitButton)

    formEl.append(formHeading, firstNameLabel, firstNameInput, lastNameLabel, lastNameInput, streetLabel, streetInput, cityLabel, cityInput, postcodeLabel, postcodeInput, checkboxSection, formActions)

    mainEl.append(formEl)

  });
}

const mainEl = document.querySelector(".view-section")

function main() {
  listenNewContactButton();
  getContacts();
}

main();
