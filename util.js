function promptForValue(promptMessage) {
    let value;
    do {
        value = prompt(promptMessage);
    } while (!value);
    return value;
}

function promptForNumber(promptMessage, minValue) {
    let value;
    do {
        value = parseFloat(prompt(promptMessage));
    } while (isNaN(value) || value < minValue);
    return value;
}

function getItemsFromLocalStorage(items) {
    const data = localStorage.getItem(`${items}`);
    return JSON.parse(data);
}

function setItemsToLocalStorage(items, itemName) {
    localStorage.setItem(`${itemName}`, JSON.stringify(items));
}

function checkItemsAvailability(items) {
    return items && items.length > 0;
}

function promptForValidIndex(items, itemName) {
    let validId = false;
    let index = -1;
    let id = prompt(`Please enter a valid ID of an existing ${itemName}:`);
    do {
        for (let i = 0; i < items.length; i++) {
            if (id === String(items[i].id)) {
                validId = true;
                index = i;
                break;
            }
        }
        if (!validId) {
            id = prompt(`The ${itemName} ID is not valid. Please enter another valid ID:`);
        }
    } while (!validId);
    return { id, index };
}