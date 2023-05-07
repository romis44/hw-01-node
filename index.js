const argv = require("yargs").argv;

const allServices = require("./contacts");

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "getAll":
      const allListContacts = await allServices.listContacts();
      return console.table(allListContacts);

    case "get":
      const oneContact = await allServices.getContactById(id);
      return console.table(oneContact);

    case "add":
      const newContact = await allServices.addContact({
        name,
        email,
        phone,
      });
      return console.table(newContact);
    case "remove":
      const deleteContact = await allServices.removeContact(id);
      return console.table(deleteContact);

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
