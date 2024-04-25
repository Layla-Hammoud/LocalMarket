class User {
    constructor(id, username, email, password) {
        this.id = id
        this.username = username;
        this.email = email;
        this.password = password;
        this.shoppingCart = { items: [], totalCost: 0, history: [] }
    }

    logIn(users) {
        let email, userIndex, password
        let emailNotExist = true
        let incorrectPassword = true
        email = prompt("Please enter your email")

        // Check if the user is an admin
        if (email === "admin@gmail.com") {
            alert("Welcome back Admin")
            return { email, password, type: "admin" }
        }
        else {
            // Loop until a valid email is entered
            do {
                for (let i = 0; i < users.length; i++) {
                    if (email == String(users[i].email)) {
                        emailNotExist = false
                        userIndex = i
                        break
                    }
                }
                if (emailNotExist === true) {
                    if (email === "admin@gmail.com") {
                        alert("Welcome back Admin")
                        return { email, password, type: "admin" }
                    }
                    email = prompt("the email that you have been entered is not existing in the system\nPlease enter another one")
                }
            } while (emailNotExist)
            // Loop until a valid password is entered
            while (incorrectPassword) {
                password = prompt("please enter the correct password")
                if (users[userIndex].password == password) {
                    incorrectPassword = false
                }
            }
            const username = users[userIndex].username
            return { email, password, username, type: "user", userIndex }
        }
    }

    signUp(users) {
        let username, password, email
        username = promptForValue("please enter your user name, The user name can not be empty");
        password = promptForValue("please enter your password, The password can not be empty");
        email = promptForValue("Please enter your email, The email can not be empty");

        // Check if the entered email is already in use
        let usedEmail = true
        while (usedEmail) {
            let existingEmail = false
            for (let user of users) {
                if (email == user.email) {
                    alert("This email is alredy in used")
                    existingEmail = true
                    break;
                }
            }

            // If email is already in use, prompt user for another email
            if (existingEmail) {
                email = prompt("Please enter another email");
            }
            else {
                usedEmail = false;
            }
        }

        // Generate a unique userId
        let userId = parseInt(JSON.parse(localStorage.getItem('userId')));
        userId++;

        // Create a new user object if username, email, and password are provided
        let newUser
        if (username && email && password) {
            newUser = new User(userId, username, email, password);
            alert("The account has been added to the system log in to you account in order to continue")
        }
        users.push(newUser);
        setItemsToLocalStorage(users, "users")
        localStorage.setItem('userId', JSON.stringify(userId))
    }

    browseInfo(user) {
        alert(`Your user name is ${user.username}
Your email is ${user.email}
Your password is ${user.password}`)
    }
}