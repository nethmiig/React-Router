//Importing external libraries
import localforage from "localforage";
import { matchSorter } from "match-sorter";
import sortBy from "sort-by";

// Simulates network delay
async function fakeNetwork(key) {
    // Reset fakeCache if no key is provided (used for clearing cache)
    if (!key) {
        fakeCache = {};
    }

    // If the request is already in the cache, return immediately
    if (fakeCache[key]) {
        return;
    }

    // Simulate network delay with a random timeout
    fakeCache[key] = true;
    return new Promise((res) => {
        setTimeout(res, Math.random() * 800);
    });
}

// Function to get contacts with optional query for sorting and filtering
export async function getContacts(query) {
    // Simulate network delay for the getContacts request
    await fakeNetwork(`getContacts:${query}`);

    // Retrieve contacts from local storage
    let contacts = await localforage.getItem("contacts");

    // Initialize contacts as an empty array if no contacts are found
    if (!contacts) contacts = [];

    // Apply sorting and filtering based on the provided query
    if (query) {
        contacts = matchSorter(contacts, query, { keys: ["first", "last"] });
    }

    // Return contacts sorted by last name and creation date
    return contacts.sort(sortBy("last", "createdAt"));
}

// Function to create a new contact
export async function createContact() {
    // Simulate network delay for the createContact request
    await fakeNetwork();

    // Generate a random id and create a new contact with the current timestamp
    let id = Math.random().toString(36).substring(2, 9);
    let contact = { id, createdAt: Date.now() };

    // Retrieve existing contacts and add the new contact to the beginning
    let contacts = await getContacts();
    contacts.unshift(contact);

    // Update local storage with the modified contacts
    await set(contacts);

    // Return the newly created contact
    return contact;
}

// Function to get a specific contact by id
export async function getContact(id) {
    // Simulate network delay for the getContact request
    await fakeNetwork(`contact:${id}`);

    // Retrieve contacts from local storage
    let contacts = await localforage.getItem("contacts");

    // Find and return the contact with the specified id, or null if not found
    let contact = contacts.find((contact) => contact.id === id);
    return contact ?? null;
}

// Function to update a specific contact by id with provided updates
export async function updateContact(id, updates) {
    // Simulate network delay for the updateContact request
    await fakeNetwork();

    // Retrieve contacts from local storage
    let contacts = await localforage.getItem("contacts");

    // Find the contact with the specified id
    let contact = contacts.find((contact) => contact.id === id);

    // Throw an error if no contact is found for the provided id
    if (!contact) throw new Error("No contact found for", id);

    // Update the contact with the provided updates
    Object.assign(contact, updates);

    // Update local storage with the modified contacts
    await set(contacts);

    // Return the updated contact
    return contact;
}

// Function to delete a specific contact by id
export async function deleteContact(id) {
    // Retrieve contacts from local storage
    let contacts = await localforage.getItem("contacts");

    // Find the index of the contact with the specified id
    let index = contacts.findIndex((contact) => contact.id === id);

    // If the contact is found, remove it from the contacts array
    if (index > -1) {
        contacts.splice(index, 1);

        // Update local storage with the modified contacts
        await set(contacts);

        // Return true to indicate successful deletion
        return true;
    }

    // Return false if the contact is not found
    return false;
}

// Function to update local storage with the provided contacts
function set(contacts) {
    return localforage.setItem("contacts", contacts);
}

// Simulated cache to avoid delaying requests for data already seen
let fakeCache = {};
