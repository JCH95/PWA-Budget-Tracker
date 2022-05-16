// create variable to hold db connection
let db;
// establish a connection to IndexedDB database called 'budget_track' and set it to version 1
const request = indexedDB.open('budget_track', 1);

// event will emit if the database version changes
request.onupgradeneeded = function(event) {
    // save a reference to the database 
    const db = event.target.result;
    // create an object store (table) called `new_budget`, set it to have an auto incrementing primary key of sorts 
    db.createObjectStore('new_budget', { autoIncrement: true });
};

// upon a successful connection 
request.onsuccess = function(event) {
    // when db is successfully created, save reference to db in global variable
    db = event.target.result;
  
    // check if app is online
    if (navigator.onLine) {
        // we haven't created this yet, but we will soon, so let's comment it out for now
        // uploadPizza();
    }
};