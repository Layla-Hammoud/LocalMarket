class Admin extends User {
    constructor(username, email, password, accessLevel) {
        super(username, email, password)
        this.accessLevel = accessLevel
        this.allProducts = JSON.parse(localStorage.getItem('products')) || [];
        this.allUsers = JSON.parse(localStorage.getItem('users')) || [];
    }

    addProduct(products) {
        // Retrieve the latest product ID from localStorage and increment it
        let id = parseInt(JSON.parse(localStorage.getItem('productId')));
        id++;
        // Prompt user for product details
        let name, price, image, quantity, available;
        name = promptForValue("Please enter the Name of the product, do not keep it empty");
        price = promptForNumber(`Price of the ${name} Please enter the price of the ${name} using a valid number`, 0);
        image = promptForValue(`Image URL of the ${name} Please enter the image URL of the ${name}, do not keep it empty`);
        quantity = promptForNumber(`Quantity of the ${name} Please enter the quantity of the ${name} using a valid number`, 0);
        do {
            available = prompt(`Please enter 1 if the ${name} is available, 0 if not`);
        } while (available !== "1" && available !== "0");
        // Create a new product object with the provided details , update the prodict list and product identifier
        const newProduct = new Product(id, name, price, quantity, image, available)
        products.push(newProduct);
        localStorage.setItem('productId', JSON.stringify(id))
        alert(`${name} is added to the system`)
        return products
    }

    editProduct(products) {
        if (!checkItemsAvailability(products)) {
            alert("there are no products in the store yet to edit!")
        }
        else {
            const { index } = promptForValidIndex(products, "product");

            // Prompt user for new product details
            let name, price, image, quantity, available;
            name = prompt("Please enter the Name of the product, if you don't want to edit it keep it empty");
            do {
                price = parseFloat(prompt(`Please enter the new price of the ${name} using a valid number , if you don't want to edit it keep it empty`));
            } while (!isNaN(price) && price < 0);
            image = prompt(`Please enter the new image URL of the ${name}, if you don't want to edit it keep it empty`);
            do {
                quantity = parseInt(prompt(`Please enter the new quantity of the ${name} using a valid number, if you don't want to edit it keep it empty`));
            } while (!isNaN(quantity) && quantity < 0);
            do {
                available = prompt(`Please enter 1 if the ${name} is available, 0 if not, if you don't want to edit it keep it empty`);
            } while (available !== "" && available !== "1" && available !== "0");

            // Update product details if provided
            if (name !== "") {
                products[index].name = name
            }
            if (image !== "") {
                products[index].imageUrl = image
            }
            if (!isNaN(price)) {
                products[index].price = price
            }
            if (!isNaN(quantity)) {
                products[index].quantity = quantity
            }
            if (available !== "") {
                products[index].isAvailable = available
            }
            alert("The product has edited")
            return products
        }
    }

    deleteProduct(products) {
        if (!checkItemsAvailability(products)) {
            alert("there are no products in the store yet to edit!")
        }
        else {
            const { index } = promptForValidIndex(products, "product");
            // Remove the product from the products array
            products.splice(index, 1);
            alert("The product has deleted")
            return products
        }
    }

    displayUsers(users) {
        if (!checkItemsAvailability(users)) {
            alert("there are no users in the system yet!")
        }
        else {
            // Prepare the message to display available users
            let availabeUsers = "The available users are"
            for (let user of users) {
                availabeUsers += `
${user.username} and the email is ${user.email}`
            }
            alert(availabeUsers)
        }
    }

    deleteUser(users) {
        if (!checkItemsAvailability(users)) {
            alert("there are no users in the system yet to edit!")
        }
        else {
            const { index } = promptForValidIndex(users, "user");
            // Remove the user from the users array
            users.splice(index, 1);
            localStorage.setItem('users', JSON.stringify(users))
            alert("The user has deleted")
        }
        return users
    }

    editUser(users) {
        if (!checkItemsAvailability(users)) {
            alert("there are no users in the system yet to edit!")
        }
        else {
            const { index } = promptForValidIndex(users, "user");
            let username, email, password
            username = prompt("Please enter the user name of the user, if you don't want to edit it keep it empty");
            email = prompt(`Please enter the new email of ${username}, if you don't want to edit it keep it empty`);
            password = prompt(`Please enter the new password of ${username}, if you don't want to edit it keep it empty`);
            // Update user details if provided
            if (username !== "") {
                users[index].username = username;
            }
            if (email !== "") {
                users[index].email = email;
            }
            if (password !== "") {
                users[index].password = password;
            }
            alert("The user has edited")
            return users
        }
    }
}