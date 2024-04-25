class Product {
    constructor(id = '', name = '', price = 0, quantity = 0, imageUrl = '', isAvailable = false) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.imageUrl = imageUrl;
        this.isAvailable = isAvailable;
    }

    displayProducts(products) {
        if (!checkItemsAvailability(products)) {
            alert("there are no products in the store yet!")
        }
        else {
            let availabeProducts = ""
            for (let product of products) {
                if (product.isAvailable === "1" && product.quantity > 0) {
                    availabeProducts += `There is ${product.name} of price ${product.price} with id ${product.id}
`
                }
            }
            alert(availabeProducts)
        }
    }
}
