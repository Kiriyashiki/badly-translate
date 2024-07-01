# badly-translate

A simple package to mess up text by running it through translation multiple times and back to the original language.

## Install 

```
npm install badly-translate
```

## Usage

Badly translate a text by translating it 20 times.

Each line is translated seperately, and may not exceed 4000 characters.

```js
const badlyTranslate = require("badly-translate");

const textToMess = "Example text string.\nEach line is translated seperately.";

badlyTranslate(textToMess, 20, "en").then((result) => console.log(result));
```

Results may vary as languages used are randomly selected.
