const prompt = require('prompt');
const filesystem = require('fs')

let studentData 
try {
    studentData = filesystem.readFileSync("lista_studenti.json","utf-8")
} catch (error) {
    studentData = '[]'
}

const studentArray = JSON.parse(studentData);

console.log('Benvenuto nella lista Studenti');

startMenu();


function startMenu() {
    console.log('Sono disponibili tre opzioni');
    console.log('1) aggiungi uno studente');
    console.log('2) lista studenti');
    console.log('3) esci')
  
    prompt.start();
  
    const schema = {
      properties: {
        selection: {
          description: 'Seleziona una delle opzioni',
        }
      }
    };
  
    prompt.get(schema, startMenuStudents);
  }

  function printStudent(tipoSort){
    let sortedArray
    if(tipoSort == 1){
        sortedArray = studentArray.sort(function(a, b){
            if(a.nome < b.nome) { return -1; }
            if(a.nome > b.nome) { return 1; }
            return 0;
        })
    } else {
        sortedArray = studentArray.sort(function(a, b){
            if(a.eta < b.eta) { return -1; }
            if(a.eta > b.eta) { return 1; }
            return 0;
        })
    }

   

    for (let i = 0; i < sortedArray.length; i++) {
        const student = sortedArray[i];
        const result = `Nome: ${student.nome}
Cognome: ${student.cognome}
Genere: ${student.genere}
--------------------`;
        console.log(result)
    }
    console.log("-----------------------")  
   
    startMenu();
}

  function printMenu() {
    console.log('sono disponibili tre opzioni');
    console.log('1) lista in ordine di inserimento');
    console.log('2) lista in ordine alfabetico dal nome');
    console.log('3) torna al menù principale')
  
    const schema = {
      properties: {
        selection: {
          description: 'Seleziona una delle opzioni',
        }
      }
    };
  
    prompt.get(schema, sortManager);
  }

  function sortManager (err, result) {
   
    if(result.selection == 1){
        console.log("opzion 1")
        printStudent(1)
    }else if(result.selection == 2){
        console.log("opzion 2")
        printStudent(2)
    }else{
        startMenu();
    }
}
  
  function startMenuStudents(err, result){
    if (result.selection === '1') {
      insertStudents();
    } else if (result.selection === '2'){
      printMenu();
    } else if (result.selection === '3') {
      console.log('Grazie e a Presto!')
      process.exit();
    } else {
      console.log('selezione non disponibile');
      startMenu();
    }
  }

  
  function insertStudents() {

    const schema = {
      properties: {
          nome: {
          description: 'inserisci il tuo nome',
        },
          cognome: {
          description: 'inserisci il tuo cognome',
        },
          genere: {
          description: 'sei femmmina o maschio? ',
        },
          eta:{
          description: 'inserisci la tua età'
        },
          sposato: {
          description: 'sei sposato/a?',
        },
          corso: {
          description: 'inserisci il tuo corso',
        },
          voti: {
          description: 'inserisci i tuoi voti',
        },
       
      }
    };
  
    prompt.get(schema, insertStudentManger);
    
  }


  function insertStudentManger(err, result){

    
    const student = {
        nome: result.nome,
        cognome: result.cognome,
        genere: result.genere,
        eta: result.eta,
        sposato: result.sposato,
        corso: result.corso,
        voti: result.voti,
    }
    studentArray.push(student);
   
    filesystem.writeFileSync("lista_studenti.json", JSON.stringify(studentArray,null,2))

    startMenu();
  
  }
  

  