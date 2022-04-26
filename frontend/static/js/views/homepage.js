import AbstractView from "./abstractview.js";
import { fetchCollection } from "../firebase/firebase.utils.js";


export default class HomePage extends AbstractView {
    constructor(params) {
        super(params);
        this.state = {};
    };

    async addHandlers() {
    };

    async getHtml() {
        if (localStorage.getItem("homepage-collection") === null || localStorage.getItem("homepage-collection") === "null")
        {
            await fetchCollection("homepage-collection");
        };

        let innerHTML = `
            <div class="homepage">
                <div class="directory-menu">
        `;

        this.state = JSON.parse(localStorage.getItem("homepage-collection"));
        if (Object.keys(this.state).length != 0) {
            for (let key in this.state) {
                const element = this.state[key];

                innerHTML += `
                    <div class="menu-item ${element.size}">
                        <div class="background-image" style="background-image: url(${element.imageUrl});"></div>
                        <a href="${element.linkUrl}" data-link>
                            <div class='content'>
                                <h2 class="title">${element.title.toUpperCase()}</h2>
                                <span class='subtitle'>SHOP NOW</span>
                            </div>
                        </a>
                    </div>
                `;
            };

            innerHTML += `
                </div>
                    </div>
            `;
            
            return innerHTML;
        };
        
        return `
            <div class="loadding-block">
                <h2 class="section-loading">
                    Loading...
                </h2>
            </div>
        `;
    };
};