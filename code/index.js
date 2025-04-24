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
            pizza.cacke.type = event.target.id
        } else if (event.target.id === "mid") {
            pizza.cacke.price = 89.34;
            pizza.cacke.type = event.target.id
        } else if (event.target.id === "big") {
            pizza.cacke.price = 105;
            pizza.cacke.type = event.target.id
        } else {
            throw new Error("Вы укразли какой-то другой корж")
        }
        count(pizza)
        showPrice(pizza.price)
    })
})

ingridients.addEventListener("click", (e) => {
    if(pizza.cacke.price === undefined){
        showError("Вы дожны сначала выбрать кож и только потом Вы можете выбрать ингридитенты")
        return
    }
    if (e.target.id === "sauceClassic") {
        pizza.sauces.push({
            price: 78.43,
            type: "Кетчуп",
            img: e.target.src
        })
    } else if (e.target.id === "sauceBBQ") {
        pizza.sauces.push({
            price: 99.43,
            type: "BBQ",
            img: e.target.src
        })
    } else if (e.target.id === "sauceRikotta") {
        pizza.sauces.push({
            price: 120.94,
            type: "Рiкотта",
            img: e.target.src
        })
    } else if (e.target.id === "moc1") {
        pizza.toppings.push({
            price: 54,
            type: "Сир звичайний",
            img: e.target.src
        })
    } else if (e.target.id === "moc2") {
        pizza.toppings.push({
            price: 98,
            type: "Сир фета",
            img: e.target.src
        })
    } else if (e.target.id === "moc3") {
        pizza.toppings.push({
            price: 125.94,
            type: "Моцарелла",
            img: e.target.src
        })
    } else if (e.target.id === "telya") {
        pizza.toppings.push({
            price: 111,
            type: "Телятина",
            img: e.target.src
        })
    } else if (e.target.id === "vetch1") {
        pizza.toppings.push({
            price: 94,
            type: "Помiдори",
            img: e.target.src
        })
    } else if (e.target.id === "vetch2") {
        pizza.toppings.push({
            price: 94,
            type: "Гриби",
            img: e.target.src
        })
    }

    sauce.innerHTML = "";
    topping.innerHTML = "";
    cacke.innerHTML = `<img src="Pizza_pictures/klassicheskij-bortik_1556622914630.png" alt="Корж класичний">`

    if (Array.isArray(pizza.sauces) && pizza.sauces.length > 0) {
        pizza.sauces.forEach(sauce => {
            addTopping(sauce.img)
            addTextSauces(sauce.type)
        })
    }

    if (Array.isArray(pizza.toppings) && pizza.toppings.length > 0) {
        pizza.toppings.forEach(topping => {
            addTopping(topping.img)
            addTextTopping(topping.type)
        })
    }

    count(pizza)
    showPrice(pizza.price)
})

function count(pizza) {
    let full_price = 0;
    full_price = full_price + (pizza.cacke.price || 0);
    full_price = full_price + pizza.sauces.reduce((a, c) => a + c.price, 0);
    full_price = full_price + pizza.toppings.reduce((a, c) => a + c.price, 0);
    pizza.price = full_price;
    return pizza;
}
// price.reduce(function (accumulator, current) {return accumulator + current}, 0);

function addTopping(src) {
    const img = document.createElement("img");
    img.src = src;
    cacke.append(img)
}

function addTextSauces(name) {
    const newSauce = document.createElement("span");
    newSauce.classList.add("new-topping");
    newSauce.innerText = name;
    const deleteIcon = document.createElement("span");
    deleteIcon.innerText = "❌"
    newSauce.append(deleteIcon)
    sauce.append(newSauce)
}

function addTextTopping(name) {
    const newTopping = document.createElement("span");
    const deleteIcon = document.createElement("span");
    newTopping.classList.add("new-topping");
    newTopping.innerText = name;
    topping.append(newTopping)
    deleteIcon.innerText = "❌"
    newTopping.append(deleteIcon)
}

function showPrice(price = 0) {
    document.getElementById("price").innerText = price.toFixed(2)
}

function  showError (text = "У Вас возникла какая-то плохая ситуация 😭") {
const error_modal = document.querySelector(".error_modal");
const textSpan = document.querySelector("#error-text");
textSpan.innerText = text;
error_modal.classList.add("show");
setTimeout(()=>{
    error_modal.classList.remove("show");  
}, 5000)
}



showPrice()