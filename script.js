const prompt = require('prompt');
const model = require('./model.js')

const bookArray = [];


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
  console.log('2) aggiungi un magazzine');
  console.log('3) lista libri');
  console.log('4) esci')

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
    insertMagazine();   
  } else if (result.selection === '3'){
    sortMenu();
  } else if (result.selection === '4') {
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

  function insertMagazine() {

    // prompt.start();
  
    const schema = {
      properties: {
        title: {
          description: 'inserisci il titolo',
        },
        publisher: {
          description: 'inserisci la casa editrice',
        },
        release: {
          description: 'inserisci la pubblicazione ',
        },
        periodicy: {
          description: 'inserisci la periodicità',
        },
        type:{
          description: 'inserisci il tipo', 
        },
        price:{
          description: 'inserisci il prezzo',
        },
        realeaseDate: {
            description: 'inserisci la data nel formato YYYY-MM-DD',
        },
      }
    };
  
    prompt.get(schema, insertMagazineManger);
    
  }

function insertBookManger(err, result){

  const book = new model.Book(result.title, result.author, result.publisher, result.type, result.price, result.copies, result.pages, result.yop );

  bookArray.push(book);

  startMenu();

}

function insertMagazineManger(err, result){

    const magazine = new model.Magazine(result.title, result.publisher, result.release, result.periodicy, result.type, result.price, result.copies, result.discount, new Date(result.realeaseDate));
  
    bookArray.push(magazine);
  
    startMenu();
  
  }
