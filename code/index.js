const [...allInputsFromPizza] = document.querySelectorAll("#pizza input");
const ingridients = document.querySelector(".ingridients");
const pizza = {
    cacke: {},
    sauces: [],
    toppings: [],
    price: 0
};
const sauce = document.getElementById("sauce");
const topping = document.getElementById("topping");
const cacke = document.querySelector(".table");

allInputsFromPizza.forEach(function (input) {
    input.addEventListener("click", (event) => {
        if (event.target.id === "small") {
            pizza.cacke.price = 56.32;
            pizza.cacke.type = event.target.id;
        } else if (event.target.id === "mid") {
            pizza.cacke.price = 89.34;
            pizza.cacke.type = event.target.id;
        } else if (event.target.id === "big") {
            pizza.cacke.price = 105;
            pizza.cacke.type = event.target.id;
        } else {
            throw new Error("Вы указали какой-то другой корж");
        }
        count(pizza);
        showPrice(pizza.price);
    });
});

ingridients.addEventListener("click", (e) => {
    if (!pizza.cacke.price === undefined) {
        showError("Вы должны сначала выбрать корж и только потом можете выбрать ингредиенты");
        return;
    }
    if (e.target.id === "sauceClassic") {
        addIngredient(pizza.sauces, "Кетчуп", 78.43, e.target.src);
    } else if (e.target.id === "sauceBBQ") {
        addIngredient(pizza.sauces, "BBQ", 99.43, e.target.src);
    } else if (e.target.id === "sauceRikotta") {
        addIngredient(pizza.sauces, "Рiкотта", 120.94, e.target.src);
    } else if (e.target.id === "moc1") {
        addIngredient(pizza.toppings, "Сир звичайний", 54, e.target.src);
    } else if (e.target.id === "moc2") {
        addIngredient(pizza.toppings, "Сир фета", 98, e.target.src);
    } else if (e.target.id === "moc3") {
        addIngredient(pizza.toppings, "Моцарелла", 125.94, e.target.src);
    } else if (e.target.id === "telya") {
        addIngredient(pizza.toppings, "Телятина", 111, e.target.src);
    } else if (e.target.id === "vetch1") {
        addIngredient(pizza.toppings, "Помiдори", 94, e.target.src);
    } else if (e.target.id === "vetch2") {
        addIngredient(pizza.toppings, "Гриби", 94, e.target.src);
    }

    
    renderIngredients();
    count(pizza);
    showPrice(pizza.price);
});

function addIngredient(array, type, price, img) {
    const found = array.find(item => item.type === type);
    if (found) {
        found.quantity += 1;
    } else {
        array.push({
            price: price,
            type: type,
            img: img,
            quantity: 1
        });
    }
}

function count(pizza) {
    let full_price = 0;
    full_price += pizza.cacke.price || 0;
    full_price += pizza.sauces.reduce((a, c) => a + c.price * c.quantity, 0);
    full_price += pizza.toppings.reduce((a, c) => a + c.price * c.quantity, 0);
    pizza.price = full_price;
    return pizza;
}

function renderIngredients() {
    sauce.innerHTML = "";
    topping.innerHTML = "";
    cacke.innerHTML = `<img src="Pizza_pictures/klassicheskij-bortik_1556622914630.png" alt="Корж класичний">`;

    
    pizza.sauces.forEach(s => {
        addTopping(s.img);
        addTextSauces(s.type, s.quantity);
    });

    
    pizza.toppings.forEach(t => {
        addTopping(t.img);
        addTextTopping(t.type, t.quantity);
    });
}

function addTopping(src) {
    const img = document.createElement("img");
    img.src = src;
    cacke.append(img);
}

function addTextSauces(name, quantity) {
    const newSauce = document.createElement("span");
    newSauce.classList.add("new-topping");
    newSauce.innerText = `${name} x${quantity}`;
    const deleteIcon = document.createElement("span");
    deleteIcon.innerText = "❌";
    deleteIcon.addEventListener("click", () => removeIngredient(name, pizza.sauces));
    newSauce.append(deleteIcon);
    sauce.append(newSauce);
}

function addTextTopping(name, quantity) {
    const newTopping = document.createElement("span");
    newTopping.classList.add("new-topping");
    newTopping.innerText = `${name} x${quantity}`;
    const deleteIcon = document.createElement("span");
    deleteIcon.innerText = "❌";
    deleteIcon.addEventListener("click", () => removeIngredient(name, pizza.toppings));
    newTopping.append(deleteIcon);
    topping.append(newTopping);
}

function removeIngredient(name, array) {
    const ingredient = array.find(item => item.type === name);
    if (ingredient) {
        if (ingredient.quantity > 1) {
            
            ingredient.quantity -= 1;
        } else {
            
            const index = array.indexOf(ingredient);
            array.splice(index, 1);
        }
    }
    renderIngredients();
    count(pizza);
    showPrice(pizza.price);
}


function showPrice(price = 0) {
    document.getElementById("price").innerText = price.toFixed(2);
}

function showError(text = "У Вас возникла какая-то ошибка 😭") {
    const error_modal = document.querySelector(".error_modal");
    const textSpan = document.querySelector("#error-text");
    textSpan.innerText = text;
    error_modal.classList.add("show");
    setTimeout(() => {
        error_modal.classList.remove("show");
    }, 5000);
}

showPrice();

document.getElementById("btnSubmit").addEventListener("click", function(event) {
    
    clearErrors();
    
    const name = document.querySelector('input[name="name"]').value;
    const phone = document.querySelector('input[name="phone"]').value;
    const email = document.querySelector('input[name="email"]').value;

    let isValid = true;

    
    if (name.trim() === "") {
        showError("name", "Будь ласка, введіть ваше ім'я");
        isValid = false;
    }

    
    const phonePattern = /^\+380\d{9}$/; 
    if (!phone.match(phonePattern)) {
        showError("phone", "Будь ласка, введіть коректний номер телефону (+380*********)");
        isValid = false;
    }

    
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!email.match(emailPattern)) {
        showError("email", "Будь ласка, введіть коректну електронну пошту");
        isValid = false;
    }

    
    if (isValid) {
        alert("Форма успішно відправлена!");
    }
});

function showError(field, message) {
    const inputField = document.querySelector(`input[name="${field}"]`);
    const errorMessage = document.createElement("span");
    errorMessage.classList.add("error");
    errorMessage.innerText = message;
    inputField.parentElement.appendChild(errorMessage);
}

function clearErrors() {
    const errorMessages = document.querySelectorAll(".error");
    errorMessages.forEach(function(error) {
        error.remove();
    });
}