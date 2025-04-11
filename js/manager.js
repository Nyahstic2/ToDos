import {Task} from "./todo.js";

let tarefasArr = [];
const formNome = document.getElementById("nome");
const formDescricao = document.getElementById("descricao");
const formNivel = document.getElementById("nivel");

const form = document.getElementById("formformTarefa");
const divTarefas = document.getElementById("tarefas");
const displayOptions = document.getElementById("changeOrder");
const alea = document.getElementById("addlea");

form.addEventListener("submit", addTarefa);
let format = 0;
displayOptions.addEventListener("click", () =>{
    if (format == 1) {
        format = 0;
        displayOptions.textContent = "Normal";
    }
    else{
        format = 1;
        displayOptions.textContent = "Importantes para os menos importantes";
    }
    updateTarefas();
    setTimeout(() => {
        displayOptions.textContent = "Opções de visualização";
    }, 1000);
});

let num = 0;
alea.addEventListener("click", () => {
    let nivel = ["alto", "baixo", "médio"];

    const tarefa = new Task(num++, "coisa", nivel[Math.floor(Math.random() * nivel.length)]);
    
    tarefa.OnEdit = updateTarefas;
    tarefa.OnDelete = deletarTarefa;
    tarefa.OnDone = marcarConcluido;
    tarefasArr.push(tarefa);
    updateTarefas();
});

function addTarefa(e){
    e.preventDefault();

    const nome = formNome.value;
    const descricao = formDescricao.value;
    const nivel = formNivel.value;

    if (nome !== ''){
        const tarefa = new Task(nome, descricao, nivel);
        tarefa.OnEdit = updateTarefas;
        tarefa.OnDelete = deletarTarefa;
        tarefa.OnDone = marcarConcluido;
        tarefasArr.push(tarefa);
        form.reset();
        console.table(tarefasArr);
        updateTarefas();
    }
    else{
        alert("Você precisa colocar pelo menos o nome da tarefa para poder ser adicionada!");
    }
}

function updateTarefas(){
    divTarefas.innerHTML = "";
    if (format == 0){
        tarefasArr.forEach(x => {
            console.log(x);
            divTarefas.appendChild(x.Render());
            x.Log();
        });
    }
    else if (format == 1){
        var importantes = tarefasArr.filter(x => x.Level.toUpperCase() == "ALTO" || x.Level.toUpperCase() == "ALTA");
        var medios = tarefasArr.filter(x => x.Level.toUpperCase() == "MÉDIO" || x.Level.toUpperCase() == "MÉDIA");
        var baixos = tarefasArr.filter(x => x.Level.toUpperCase() == "BAIXO" || x.Level.toUpperCase() == "BAIXA");

        importantes.forEach(x =>{
            console.log(x);
            divTarefas.appendChild(x.Render());
            x.Log();
        });
        

        medios.forEach(x =>{
            console.log(x);
            divTarefas.appendChild(x.Render());
            x.Log();
        });
        

        baixos.forEach(x =>{
            console.log(x);
            divTarefas.appendChild(x.Render());
            x.Log();
        });
        
    }
}

function deletarTarefa(){
    tarefasArr = tarefasArr.filter(x => !x.MarkedToDelete);
    updateTarefas();
}

function marcarConcluido(){
    updateTarefas();
}

function showTarefas(){
    console.table(tarefasArr);
}