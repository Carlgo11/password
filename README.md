# Password generator

This password generator is a JavaScript-based password generator designed for simplicity, security, and flexibility.  
Unlike typical password generators, it empowers you to include a wide range of Unicode characters in your passwords.  
This tool runs directly on your local machine, ensuring your data's privacy and security. Create strong and unique passwords effortlessly to enhance your online security.

## Features

### Client-side generator

As this project is only written in vanilla javascript, all code execution is done on the client device. This means that the password is never sent over the Internet.  

For those curios on how the code is written, here's the relevant password-creation code along with comments:

```JS
document.getElementById('generate').addEventListener('click', () => {
    const availableChars = getAvailableChars(); // Fetch array of all allowed characters
    const maxLength = document.getElementById('length').value; // Fetch int of desired password length

    const passwordArray = [];
    for (let i = 0; i < maxLength; i++) { // Continue to add characters until desired password length is reached
        const typeIndex = getRandomInt(0, availableChars.length - 1); // Pick random allowed character type
        const [min, max] = getRandomRange(availableChars[typeIndex]); // Pick random character corresponding to the desired character type
        passwordArray.push(String.fromCharCode(getRandomInt(min, max))); // Add character to password string
    }

    document.getElementById('password').value = passwordArray.join(''); // Change value of 'password'-element in DOM to the new password
});
```

## Options

Here is a list of all the character options available on the website:

* **Lowercase characters**  
  This option adds a-z as available characters.

* **Uppercase characters**  
This option adds A-Z as available characters.

* **Numbers**  
This option adds 0-9 as available characters.

* **Special characters**  
The option adds characters such as !, @ and ?. These are often required in strict password policies.

* **Unicode characters**  
Whilst every character is technically a unicode character, in this case Unicode characters means any character outside the normal A-Z 0-9 and aforementioned special characters.  
These characters can be things like emojis, non-english characters like Æ, Ü, 漢, Г or Š but can also be parts of a letter or even blank letters. As such, these types of characters have to be copy-pasted and can't be written on a normal keyboard.

* **Spaces**  
This option adds blank spaces as available characters for the password generator. Blank spaces can be useful for creating good passwords but older authentication systems sometimes disallow the usage of spaces.

## Deployment

Whilst the project can be hosted on any web server as-is, [carlgo11.pw](https://carlgo11.pw/) performs HTML, CSS and JS minification before deploying to production.  
The following code is run at build-time:

```shell
npm i html-minifier uglify-js &&
npx html-minifier --collapse-whitespace --remove-comments --remove-script-type-attributes -o index.html index.html &&
npx html-minifier --collapse-whitespace --remove-comments --remove-script-type-attributes -o css/main.css css/main.css &&
npx uglify-js js/main.js -o js/main.js
```
