export class Task{
    constructor(name, description, level){
        this.Done = false;
        this.MarkedToDelete = false;

        this.SetName(name);
        this.SetDescription(description);
        this.SetLevel(level);

        this.OnEdit = () => {};
        this.OnDelete = () => {};
        this.OnDone = () => {};
    }

    MarkAsDone(){
        this.Done = true;
        this.OnDone();
    }

    SetLevel(level){
        this.Level = level;
    }

    SetName(name){
        this.Name = name;
    }

    SetDescription(description){
        this.Description = description;
    }

    Render(){
        const div = document.createElement("div");
        const title = document.createElement("h1");
        const level = document.createElement("h3");
        const description = document.createElement("p");

        title.innerText = `${this.Name}`;
        level.innerText = `Importância: ${this.Level}`;
        description.innerText = `${this.Description}`;
        
        div.appendChild(title);
        div.appendChild(level);
        div.appendChild(description);

        div.classList.add("todo");
        if (this.Done) div.classList.add("taskdone");
        if (this.Level.toUpperCase() == "BAIXO" || this.Level.toUpperCase() == "BAIXO") div.classList.add("notimportant");
        if (this.Level.toUpperCase() == "MÉDIO" || this.Level.toUpperCase() == "MÉDIA") div.classList.add("kindaimportant");
        if (this.Level.toUpperCase() == "ALTO" || this.Level.toUpperCase() == "ALTA") div.classList.add("reallyimportant");
        

        const buttonOptions = document.createElement("div");
        const buttonDone = document.createElement("button");
        const buttonDelete = document.createElement("button");
        const buttonEdit = document.createElement("button");

        buttonOptions.classList.add("button-options");

        buttonDone.classList.add("done");
        buttonEdit.classList.add("edit");
        buttonDelete.classList.add("delete");

        buttonDone.innerText = "Marcar como pronto";
        buttonEdit.innerText = "Editar";
        buttonDelete.innerText = "Deletar";

        buttonOptions.appendChild(buttonDone);
        if (!this.Done) buttonOptions.appendChild(buttonEdit);
        buttonOptions.appendChild(buttonDelete);

        div.appendChild(buttonOptions);

        buttonDone.addEventListener("click", () =>{
            this.MarkAsDone();
        });

        buttonEdit.addEventListener("click", () => {
            const newName = prompt("Qual é o novo nome da tarefa?", "Tarefa");
            const newDescription = prompt("Qual é a nova descrição da tarefa?", "");
            const newLevel = prompt("O quão é importante é essa tarefa? (alto, médio, baixo)", "Baixo");

            if (newName === null && newLevel === null || newName === null || newLevel === null){
                return;
            }

            if ((newName !== '' && newLevel !== '')){
                this.SetName(newName);
                this.SetDescription(newDescription !== '' || newDescription === null ? newDescription : "N/A");
                this.SetLevel(newLevel);
                this.OnEdit();
            }
            else{
                console.warn("Uma edição foi pedida mas não foi preenchida");
            }
        });

        buttonDelete.addEventListener("click", () => {
            this.MarkedToDelete = true;
            this.OnDelete();
        });
        return div;
    }

    Log(){
        console.log("Task marked as done:", this.MarkAsDone);
        console.log("Task level updated:", this.Level);
        console.log("Task name updated:", this.Name);
        console.log("Task description updated:", this.Description);
        console.log("Task marked for deletion:", this.MarkedToDelete);
    }
}
