import Http from './services/Http';
import Util from './services/Util';
import Md5 from './services/Md5';
import Storage from './services/Storage';
import Firebase from './services/Firebase';
import User from './models/User';

import * as React from "react";
import * as ReactDOM from "react-dom";

class Settings {
    private util: any;
    private storage: any;
    private http: any;

    constructor () {
        this.util = new Util();
        this.storage = new Storage();
        this.http = new Http();

        // Check if user is Auth
        if (!this.http.checkAuth()) {
            this.util.redirect('index');
        }
        this.http.logout();

        this.view();
        this.addEventListeners();
    }

    view(): void {
        const name = document.querySelector('#inputName');
        const email = document.querySelector('#inputEmail');
        const photo = document.querySelector('#photoProfile');
        const colors = document.querySelectorAll('[name="color"]');
        const themes = document.querySelectorAll('[name="theme"]');

        name.value = this.storage.getItem('name');
        email.value = this.storage.getItem('email');
        // Add photo to view
        photo.src = this.storage.getItem('photo');
        photo.alt = this.storage.getItem('name');
        photo.title = this.storage.getItem('name');

        // Snake Color
        const currentColor = this.storage.getItem('color');
        for(let i = 0; i < colors.length; i++) {
            colors[i].checked = false;
            if (colors[i].value === currentColor)
                colors[i].checked = true;
        }

        const colorChecked = document.querySelector('[name="color"]:checked');
        if (!colorChecked) {
            colors[0].checked = true;
        }

        // Theme
        const currentTheme = this.storage.getItem('theme');
        for(let i = 0; i < themes.length; i++) {
            themes[i].checked = false;
            if (themes[i].value === currentTheme)
                themes[i].checked = true;
        }

        const themeChecked = document.querySelector('[name="theme"]:checked');
        if (!themeChecked) {
            themes[0].checked = true;
        }
    }

    /**
     * Updated info user.
     * @param {any} evt
     * @return {void}
     */
     updateUser(evt: any): void {

         let name = evt.srcElement[0].value;
         let email = evt.srcElement[1].value;
         let color = document.querySelector('[name="color"]:checked').value;
         let theme = document.querySelector('[name="theme"]:checked').value;
         let firebase = new Firebase();
         let hash = new Md5();

         // If email not empty
         if (email.length > 0) {
             // Check if this email already exists in Players list.
             firebase.all('players/' + hash.md5(email, false, false)).then((response : any) => {
                 // If not exists updated user with new email in other case get email in browser storage.
                 if (response !== null) {
                     email = this.storage.getItem('email');
                 }
                let score = this.storage.getItem('score');
                let user = new User(name, email, color, theme, score);
             });
         }
     }

     addEventListeners (): void {
         document.querySelector('form').addEventListener('submit', evt => {
             evt.preventDefault();
             this.updateUser(evt);
         });
     }
 }

 new Settings();
