const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

async function getContactById(contactId) {
  const contactsId = String(contactId);
  const contacts = await listContacts();
  const contactsById = contacts.find((item) => item.id === contactsId);
  return contactsById || null;
}

async function removeContact(contactId) {
  const contactsId = String(contactId);
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === contactsId);
  if (index === -1) {
    return null;
  }
  const [deletedContact] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return deletedContact;
}

async function addContact(name, email, phone) {
  const id = nanoid();
  const contacts = await listContacts();
  const newContact = {
    id,
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
