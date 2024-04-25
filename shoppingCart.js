
class ShoppingCart {
    constructor(items, totalCost) {
        this.items = items || [];
        this.totalCost = parseFloat(totalCost) || 0;
    }

    addProductToCart(userIndex, users, products) {
        let productId, productIndex, requiredQuantity, productExistIndex
        let idNotExist = true;
        let productNotAvailable = true
        let notValidQuantity = true
        let productExist = false
        let items = users[userIndex].shoppingCart.items
        console.log(items)
        let totalCost = users[userIndex].shoppingCart.totalCost
        productId = parseInt(prompt(`Please provide the Id of the product that you want to buy`), 10);
        // Validate if the product exists and is available
        while (idNotExist) {
            for (let i = 0; i < products.length; i++) {
                if (productId == products[i].id) {
                    idNotExist = false
                    productIndex = i
                    if (products[i].isAvailable == "0") {
                        productNotAvailable = false
                    }
                    break
                }
            }
            if (idNotExist == true) {
                productId = prompt("The id of the product that you provided is not exist in the system\nPlease check it out and try again")
            }
            if (!productNotAvailable) {
                alert("The product that you want is not available right now, Buy another one")
                return users
            }
        }
        // Prompt for the quantity of the product to be added to the cart
        const product = products[productIndex]
        while (notValidQuantity) {
            requiredQuantity = parseInt(prompt(`How many ${product.name} do you want?
make sure to add a number and for sure it has to be more than zero
Be sure that the quantity should be less than ${product.quantity}`), 10);
            if (!isNaN(requiredQuantity) && requiredQuantity > 0 && requiredQuantity < parseInt(product.quantity)) {
                notValidQuantity = false
            }
        }
        // Check if the product already exists in the cart
        for (let i = 0; i < items.length; i++) {
            if (productId == items[i].product.id) {
                productExist = true
                productExistIndex = i
                break
            }
        }
        // Update cart based on whether the product already exists
        if (productExist) {
            items[productExistIndex].requiredQuantity += requiredQuantity
            alert("the product that you want to buy is already exist in your shopping cart so the quantity that yoou want will be added to it")
        }
        else {
            items.push({ product, requiredQuantity })
            alert("The product has been added to your shopping cart")
        }
        totalCost = requiredQuantity * product.price
        users[userIndex].shoppingCart.items = items
        users[userIndex].shoppingCart.totalCost = users[userIndex].shoppingCart.totalCost + totalCost
        return users
    }

    clearShoppingCart(userIndex, users) {
        // Clear the items and total cost of the shopping cart for the specified user
        users[userIndex].shoppingCart.items = [];
        users[userIndex].shoppingCart.totalCost = 0;
        alert("your shopping cart has been cleared")
        return users
    }

    displayShoppingCartItems(userIndex, users) {
        // Retrieve the items and total cost of the shopping cart for the specified user
        let items = users[userIndex].shoppingCart.items
        let totalCost = users[userIndex].shoppingCart.totalCost
        if (!checkItemsAvailability(items)) {
            alert("there are no products in the shopping cart yet!")
        }
        else {
            // Prepare the message to display the items and total cost in the shopping cart
            let availabeItems = ""
            for (let item of items) {
                availabeItems += `There is ${item.requiredQuantity} ${item.product.name} with total price ${item.requiredQuantity * item.product.price}
`
            }
            availabeItems += `The total cost in of the products in the shopping cart is ${totalCost}`
            alert(availabeItems)
        }
    }

    makeOrder(userIndex, users, products) {
        let totalCost = users[userIndex].shoppingCart.totalCost;
        let history = users[userIndex].shoppingCart.history;
        let requiredProducts = users[userIndex].shoppingCart.items;
        for (let i = 0; i < requiredProducts.length; i++) {
            const item = requiredProducts[i];
            const productId = item.product.id;
            const requiredQuantity = item.requiredQuantity;
            const productIndex = products.findIndex(product => product.id === productId);
            // If the product is not available or its quantity exceeds the available stock, remove it from the order
            if (productIndex === -1 || products[productIndex].isAvailable === "0") {
                alert(`${item.product.name} is not available in the store anymore. It will be removed from the order.`);
                users[userIndex].shoppingCart.items.splice(i, 1);
                users[userIndex].shoppingCart.totalCost -= requiredQuantity * item.product.price
                totalCost -= requiredQuantity * item.product.price
                i--;
                if (requiredProducts.length == 0) {
                    alert("There are no products in the Shopping Cart anymore!")
                    break
                }
            } else {
                const product = products[productIndex];
                let oldQuantity = requiredQuantity
                // Prompt the user for a valid quantity if the entered quantity is invalid
                while (isNaN(requiredQuantity) || requiredQuantity <= 0 || requiredQuantity > product.quantity) {
                    alert(`The quantity of the ${product.name} is more than in the store currently. Please enter a valid quantity.`);
                    requiredQuantity = parseInt(prompt(`Enter quantity for ${product.name}:`));
                }
                // Update the product quantity and total cost based on the updated quantity
                product.quantity -= requiredQuantity;
                if (oldQuantity != requiredQuantity) {
                    totalCost -= (product.price * oldQuantity);
                    totalCost += (product.price * requiredQuantity);
                }
            }
        }
        // Apply discount if the total cost is more than 50
        if (totalCost > 50) {
            totalCost *= 0.9;
            alert(`A 10% discount has been applied to the order because it is more than $50. The new cost is $${totalCost.toFixed(2)}.`);
        }
        let items = users[userIndex].shoppingCart.items
        if (items.length > 0) {
            history.push({ items, totalCost })
            alert(`The order has been finished.`);
        }

        // Clear the shopping cart after completing the order
        users[userIndex].shoppingCart.items = [];
        users[userIndex].shoppingCart.totalCost = 0;
        return users
    }

    removeProductFromCart(userIndex, users) {
        let requiredProducts = users[userIndex].shoppingCart.items;
        let productId = prompt("Please enter the ID of the product that you want to remove");
        const productIndex = requiredProducts.findIndex(item => item.product.id == productId);
        if (productIndex !== -1) {
            const removedProduct = requiredProducts.splice(productIndex, 1)[0];
            alert(`Product with ID ${productId} has been removed from the shopping cart.`);
            users[userIndex].shoppingCart.totalCost -= (removedProduct.product.price * removedProduct.requiredQuantity);
        } else {
            alert(`Product with ID ${productId} does not exist in the shopping cart.`);
        }
        return users
    }

    displayOrderHistory(users, userIndex) {
        let orderHistory = users[userIndex].shoppingCart.history;
        let alertMessage = "Order History:\n";
        if (orderHistory.length == 0) {
            alert("There is no order in the history yet! \nMake an order to see this special feature")
        }
        for (let i = 0; i < orderHistory.length; i++) {
            const order = orderHistory[i];
            alertMessage += `Order ${i + 1}:\n`;
            for (let j = 0; j < order.items.length; j++) {
                const item = order.items[j];
                alertMessage += `Product: ${item.product.name}\n`;
                alertMessage += `Required Quantity: ${item.requiredQuantity}\n`;
            }
            alertMessage += `Total Cost of Order ${i + 1}: $${order.totalCost}\n`;
        }

        alert(alertMessage);
    }
}
