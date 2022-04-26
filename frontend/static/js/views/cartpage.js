import navigateTo from "../index.js";
import AbstractView from "./abstractview.js";

export default class CartPage extends AbstractView {
    constructor(params) {
        super(params);
        this.cart = {};
        this.state = {};
        this.total = 0;
    };

    async addHandlers() {
        const buttons_action = document.getElementById("checkout-page");

        if (buttons_action) {
            buttons_action.addEventListener("click", async e => {
                e.preventDefault();
                if (e.target.id.includes("remove") || e.target.id.includes("less") || e.target.id.includes("more")) {
                    const arr =  e.target.id.split(" ");
                    const action = arr[0];
                    const id = parseInt(arr[1]);
                    switch (action) {
                        case "remove":
                            removeFromCart(id, true);
                            navigateTo('/cart');
                            break;
                        case "less":
                            removeFromCart(id);
                            navigateTo('/cart');
                            break;
                        case "more":
                            addToCart(id);
                            navigateTo('/cart');
                            break;
                    };
                };
            });
        };
    };

    async getHtml() {
        let innerHTML = `
            <div id="checkout-page" class='checkout-page'>
                <div class='checkout-header'>
                    <div class='header-block'>
                        <span>Product</span>
                    </div>    
                    <div class='header-block'>
                        <span>Description</span>
                    </div>    
                    <div class='header-block'>
                        <span>Quantity</span>
                    </div>    
                    <div class='header-block'>
                        <span>Price</span>
                    </div>    
                    <div class='header-block'>
                        <span>Remove</span>
                    </div>        
                </div>
        `;

        if (localStorage.getItem("cart") === null || localStorage.getItem("cart") === "null" )
        {
            innerHTML += `
                    <div class="checkout-item">
                        <span class=''>You have no items</span>
                    </div>
                </div>
            `
            return innerHTML;
        };

        this.cart = JSON.parse(localStorage.getItem("cart"));
        this.state = JSON.parse(localStorage.getItem("collections"));
        if (Object.keys(this.state).length != 0 && Object.keys(this.cart).length != 0)  
        {
            let index_of_element = -1;
            for (let key in this.cart)
            {
                for (let value of Object.values(this.state))
                {
                    index_of_element = value.items.findIndex(elem => elem.name === key);
                    if (index_of_element != -1) {
                        this.total += value.items[index_of_element].price * this.cart[key];
                        innerHTML += `
                            <div class='checkout-item'>
                                <div class='image-container'>
                                    <img alt='item' src="${value.items[index_of_element].imageUrl}" />
                                </div>
                                <span class='name'>${value.items[index_of_element].name}</span>
                                <span class='quantity'>
                                    <button id="less ${value.items[index_of_element].id}" class='arrow'>&#10094;</button>
                                        <span class='value'>${this.cart[key]}</span>
                                    <button id="more ${value.items[index_of_element].id}" class='arrow'>&#10095;</button>
                                </span>
                                <span class='price'>${value.items[index_of_element].price}</span>
                                <button id="remove ${value.items[index_of_element].id}" class='remove-button'>&#10005;</button>
                            </div>
                        `
                    };
                };
            };

            innerHTML += `
                    <div class='total'>
                        <span>TOTAL: $${this.total}</span>
                    </div>
                    <button class="custom-button google-sign-in">Pay Now</button>
                </div>
            `;

            return innerHTML;
        }
        return `
            <div class="loadding-block">
                <h2 class="section-loading">
                    Loading...
                </h2>
            </div>
        `;
    };
};