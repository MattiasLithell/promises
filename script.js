// <demo av vad som händer med animationer om man blockerar vår main thread>
let button = document.getElementById("button");
button.addEventListener("click", function(event) {
    for(let i = 0; i < 10000000; i++){
        const date = new Date();
    }
})

let button2 = document.getElementById("button2");

button2.addEventListener("click", function(event) {
    alert("klick");
})

// </demo av vad som händer med animationer om man blockerar vår main thread >

// <demo asynkront beteende i javascript>
const func1 = function () {
    console.log("func1");
}

const func2 = function() {
    setTimeout(function(){
        console.log("func2");
    }, 0)
}

const func3 = function() {
    console.log("func3")
}

func1();
func2();
func3();
// </demo asynkront beteende i javascript>

// <promise>
var promise = new Promise(function(resolve, reject){
    const allIsWell = true;

    setTimeout(function(){
        if(allIsWell){
            resolve("All is well");
        } else {
            reject("All is NOT well");
        }
    }, 2000);    
});

promise.then(function(data){
    console.log(data);
}).catch(function(err){
    console.log(err);
}).finally(function(data){
    console.log("Oavsett hur det gick hamnar vi här");
})

// </promise>

// <fetch>
var fetchPromise = fetch("https://jsonplaceholder.typicode.com/users/1");

fetchPromise
.then((response) => {
    if(!response.ok){
        throw("fel");
    }
    return response.json();
})
.then(function(json) {  
    console.log(json);
})
.catch(function(err){
    console.log(err);
})


function inputChange(event){
    getPersonData(event.target.value);
}

function getPersonData(id) {
    showLoader();
    let fetchPromise = createFetch(id);
    fetchPromise.then(function(reponse) {
        return reponse.json();
    }).then(function(json){
        createElementWithText(json.name);
    }).catch(function(error){
        console.log("Error");
    }).finally(function(data) {
        hideLoader();
    })
}

function createElementWithText(name) {
    const parentDiv = document.getElementById("placeholder");

    const newElement = document.createElement("div");
    const newTextContent = document.createTextNode(name);
    newElement.appendChild(newTextContent);

    parentDiv.innerHTML = "";

    parentDiv.appendChild(newElement);
}

var loader = document.getElementsByClassName("loader")[0];

function showLoader() {
    loader.style.display = "block";
}

function hideLoader() {
    loader.style.display = "none";
}

function createFetch(id) {
    return fetch("https://jsonplaceholder.typicode.com/users/" + id);
}
// </fetch>