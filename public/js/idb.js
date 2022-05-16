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
        uploadBudget();
    }
};

request.onerror = function(event) {
    console.log(event.target.errorCode);
};

// This function will be executed if we attempt to submit a new budget and there's no internet connection
function saveRecord(record) { 
    const transaction = db.transaction(['new_pizza'], 'readwrite');

    const pizzaObjectStore = transaction.objectStore('new_pizza');
  
    pizzaObjectStore.add(record);
}