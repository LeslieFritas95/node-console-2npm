const prompt = require('prompt');
const filesystem = require("fs")
const model = require('./model.js')

const bookArray = [];
const fileContent = filesystem.readFileSync("books.json","utf-8")
const booksOjects = JSON.parse(fileContent);
for (let i = 0; i < booksOjects.length; i++) {
    const result = booksOjects
    const book = new model.Book(result.title, result.author, result.publisher, result.type, result.price, result.copies, result.pages, result.yop );
    bookArray.push(book)    
}

console.log('benvenuto in book manager!')

startMenu();

function sortManager (err, result) {
    // console.log('resultado',result)
    if(result.selection == 1){
        console.log("opzion 1")
        printBook(1)
    }
    if(result.selection == 2){
        console.log("opzion 2")
        printBook(2)
    }
}

function sortMenu() {
    console.log('Scegli l\'ordine');
    console.log('1) per titolo');
    console.log('2) per anno pubblicazione');
  
    const schema = {
      properties: {
        selection: {
          description: 'Seleziona una delle opzioni',
        }
      }
    };
  
    prompt.get(schema, sortManager);
  }


function startMenu() {
  console.log('sono disponibili tre opzioni');
  console.log('1) aggiungi un libro');
  console.log('2) lista libri');
  console.log('3) esci')

  prompt.start();

  const schema = {
    properties: {
      selection: {
        description: 'Seleziona una delle opzioni',
      }
    }
  };

  prompt.get(schema, startMenuManager);
}

function printBook(tipoSort){

    /*  */

    let sortedArray
    if(tipoSort == 1){
        sortedArray = bookArray.sort(function(a, b){
            if(a.title < b.title) { return -1; }
            if(a.title > b.title) { return 1; }
            return 0;
        })
    } else {
        sortedArray = bookArray.sort(function(a, b){
            if(a.yop < b.yop) { return -1; }
            if(a.yop > b.yop) { return 1; }
            return 0;
        })
    }

   

    for (let i = 0; i < sortedArray.length; i++) {
        const book = sortedArray[i];
        console.log(book.toString())        
    }
    console.log("-----------------------")  
   
    startMenu();
}

function startMenuManager(err, result){
  if (result.selection === '1') {
    insertBook();   
  } else if (result.selection === '2'){
    sortMenu()
    // printBook() 
  } else if (result.selection === '3') {
    console.log('Grazie e a Presto!')
    process.exit();
  } else {
    console.log('selezione non disponibile');
    startMenu();
  }
}

function insertBook() {

  // prompt.start();

  const schema = {
    properties: {
      title: {
        description: 'inserisci il titolo',
      },
        author: {
        description: 'inserisci l\'autore',
      },
        publisher: {
        description: 'inserisci la casa editrice',
      },
        yop: {
        description: 'inserisci anno pubblicazione',
      },
    }
  };

  prompt.get(schema, insertBookManger);
  
}

function insertBookManger(err, result){

  const book = new model.Book(result.title, result.author, result.publisher, result.type, result.price, result.copies, result.pages, result.yop );

  bookArray.push(book);

  filesystem.writeFileSync("books.json",JSON.stringify(bookArray,null,2))

  startMenu();

}