function system() {
    if (!JSON.parse(localStorage.getItem('products'))) {
        const allProducts = []
        localStorage.setItem('products', JSON.stringify(allProducts))
    }
    if (!JSON.parse(localStorage.getItem('users'))) {
        const allUsers = []
        localStorage.setItem('users', JSON.stringify(allUsers))
    }
    if (!JSON.parse(localStorage.getItem('productId'))) {
        const id = 0
        localStorage.setItem('productId', JSON.stringify(id))
    }
    if (!JSON.parse(localStorage.getItem('userId'))) {
        const userId = 0
        localStorage.setItem('userId', JSON.stringify(userId))
    }
    const user = new User("Username", "Email", "Password");
    while (true) {
        let users = getItemsFromLocalStorage("users")
        const choice = prompt(`Enter 1 to log in
Enter 2 to Sign up
Enter 3 to Exit the system`);
        switch (choice) {
            case "1":
                let loggedInUser = user.logIn(users)
                handleUserActions(loggedInUser)
                break;
            case "2":
                user.signUp(users)
                break;
            case "3":
                return
            default:
                alert("Invalid choice. Please enter 1, 2, or 3.");
        }
    }

    function handleUserActions(user) {
        let notLogOut = true
        while (notLogOut) {
            let users = getItemsFromLocalStorage("users")
            let products = getItemsFromLocalStorage("products")
            const product = new Product();
            let choice
            if (user.type == "admin") {
                const admin = new Admin("Username", "Email", "Password", "accessLevel");
                choice = prompt("Enter 1 to Add new Product\nEnter 2 to Browse all Products\nEnter 3 to Edit an existing Product\nEnter 4 to Delete an existing Product\nEnter 5 to View existing Users\nEnter 6 to Delete an existing User\nEnter 7 to Edit an existing User\nEnter 8 to Log out\n")
                switch (choice) {
                    case "1":
                        products = admin.addProduct(products)
                        break;
                    case "2":
                        product.displayProducts(products)
                        break;
                    case "3":
                        products = admin.editProduct(products)
                        break;
                    case "4":
                        products = admin.deleteProduct(products)
                        break
                    case "5":
                        admin.displayUsers(users)
                        break
                    case "6":
                        users = admin.deleteUser(users)
                        break
                    case "7":
                        users = admin.editUser(users)
                        break
                    case "8":
                        alert("Logging out ...")
                        notLogOut = false
                        break
                    default:
                        alert("Invalid choice. Please enter 1,2,3,4,5,6,7 or 8");
                }
            }
            else {
                const userObject = new User(0, "Username", "Email", "Password", "accessLevel");
                const shoppingCart = new ShoppingCart([], 0)
                choice = prompt("Enter 1 to Browse all the Products\nEnter 2 to Add a product to your Shopping Cart\nEnter 3 to Clear you Shopping Cart\nEnter 4 to Browse your shopping cart's items\nEnter 5 to Make an Order\nEnter 6 to see your account info\nEnter 7 to remove a product from the shopping cart\nEnter 8 to see your order's History\nEnter 9 to Log out")
                switch (choice) {
                    case "1":
                        product.displayProducts(products)
                        break
                    case "2":
                        users = shoppingCart.addProductToCart(user.userIndex, users, products)
                        break
                    case "3":
                        users = shoppingCart.clearShoppingCart(user.userIndex, users)
                        break
                    case "4":
                        shoppingCart.displayShoppingCartItems(user.userIndex, users)
                        break
                    case "5":
                        users = shoppingCart.makeOrder(user.userIndex, users, products)
                        break
                    case "6":
                        userObject.browseInfo(user)
                        break
                    case "7":
                        users = shoppingCart.removeProductFromCart(user.userIndex, users)
                        break
                    case "8":
                        shoppingCart.displayOrderHistory(users, user.userIndex)
                        break
                    case "9":
                        alert("Logging out ...")
                        notLogOut = false
                        break
                    default:
                        alert("Invalid choice. Please enter 1,2,3,4,5,6,7 or 8")
                }
            }
            setItemsToLocalStorage(users, "users")
            setItemsToLocalStorage(products, "products")
        }
    }
}

system();