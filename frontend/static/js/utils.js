function themeChange() {
    const link_black_style = document.getElementById("dark");
    const custom_button = document.getElementById("cart-button");
    if (localStorage.getItem('mode') === "light" || localStorage.getItem('mode') === null) 
    {
        link_black_style.setAttribute('href', "static/styles/dark.css");
        custom_button.classList.add("inverted");
        localStorage.setItem('mode', 'dark');
        document.getElementById("checkbox").setAttribute("checked", "checked");
    }
    else 
    {
        link_black_style.removeAttribute('href');
        custom_button.classList.remove("inverted");
        localStorage.setItem('mode', 'light');
    };
};

function hideCart() {
    document.getElementById("cart").classList.toggle('hidden'); 
    updateCart();
};


function updateCart() {
    const cart_dropdown_element = document.getElementById("cart-items");
    let innerHTML = "";
    if (localStorage.getItem("cart") === null || localStorage.getItem("cart") === "null")
    {
        innerHTML += `
            <div class="cart-item">
                <span class=''>You have no items</span>
            </div>
        `;
        cart_dropdown_element.innerHTML = innerHTML;
    }
    else 
    {
        cart = JSON.parse(localStorage.getItem("cart"));
        state = JSON.parse(localStorage.getItem("collections"));
        if (Object.keys(state).length != 0 && Object.keys(cart).length != 0)  
        {
            let index_of_element = -1;
            for (let key in cart)
            {
                for (let value of Object.values(state))
                {
                    index_of_element = value.items.findIndex(elem => elem.name === key);
                    if (index_of_element != -1) {
                        innerHTML += `
                            <div class="cart-item">
                                <img src="${value.items[index_of_element].imageUrl}" alr="image" class="cart-item-image">
                                <div class="item-details">
                                    <span class="name">${value.items[index_of_element].name}</span>
                                    <span class="price">${cart[key]} x $${value.items[index_of_element].price}</span>
                                </div>
                            </div>
                        `
                    };
                };
            };
            
            cart_dropdown_element.innerHTML = innerHTML;
        }
        else {
            cart_dropdown_element.innerHTML = `
                <div class="cart-item">
                    <span class=''>You have no items</span>
                </div>
            `;
        };
    };
};

function addToCart(id) {
    let cart = JSON.parse(localStorage.getItem("cart"));
    const state = JSON.parse(localStorage.getItem("collections"));
    if (!cart) 
    {
        cart = {};
    }
    if (Object.keys(state).length != 0)  
    {
        for (let value of Object.values(state))
        {
            index_of_element = value.items.findIndex(elem => elem.id === id);
            if (index_of_element != -1) {
                const element = value.items[index_of_element];
                if (element.name in cart) {
                    cart[element.name] += 1;
                }
                else {
                    cart[element.name] = 1;
                }
            };
        };
        localStorage.setItem("cart", JSON.stringify(cart));
    }
    updateCart();
    updateCartCout();
};


function removeFromCart(id, all=false) {
    let cart = JSON.parse(localStorage.getItem("cart"));
    const state = JSON.parse(localStorage.getItem("collections"));
    if (cart) 
    {
        if (Object.keys(state).length != 0 && Object.keys(cart).length != 0)  
        {
            for (let value of Object.values(state))
            {
                index_of_element = value.items.findIndex(elem => elem.id === id);
                if (index_of_element != -1) {
                    const element = value.items[index_of_element];
                    if (element.name in cart) {
                        if (Object.keys(cart).length === 1 && all) {
                            cart = null;
                        }
                        else {
                            if(all) {
                                delete cart[element.name];
                            }
                            else {
                                cart[element.name] -= 1;
                                if (cart[element.name] === 0) {
                                    if (Object.keys(cart).length === 1) {
                                        cart = null;
                                    }
                                    else {
                                        delete cart[element.name];
                                    };
                                };
                            };
                        };
                    };
                };
            };
            if (!cart)
            {
                localStorage.setItem("cart", null);
            }
            else 
            {
                localStorage.setItem("cart", JSON.stringify(cart));
            }
        };
    }
    updateCart();
    updateCartCout();
};

function updateCartCout() {
    const cart_count = document.getElementById("cart-count");
    const cart = JSON.parse(localStorage.getItem("cart"));
    let count = 0;
    if(cart_count) 
    {
        if (cart) 
        {
            for (let value of Object.values(cart)) 
            {
                count += value;
            };
            cart_count.textContent = count;

        }
        else 
        {
            cart_count.textContent = 0;
        };
    };
};
