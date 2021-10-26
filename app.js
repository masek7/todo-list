'use strict';

/*let banco = [
{'tarefa':'Estudar JS', 'status':''},
{'tarefa': 'netflix', 'status': 'checked'}
]; /* Banco de dados usando arrays*/

const getBanco = () => JSON.parse(localStorage.getItem ('todoList')) ?? /*diz que se o meu local storage estiver vazio, passa a próxima coisa (array vazio) */ [];
const setBanco= (banco) => localStorage.setItem('todoList', JSON.stringify(banco));

const criarItem = (tarefa, status, indice) => {
    const item = document.createElement('label'); /* serve para criar um item HTML.
     ex: <div>, <p>, <label> e etc.. */
    item.classList.add('todo__item'); /* serve para adicionar uma classe a um item, utilizando
    do classList.add, para isso. item(é a variável), classList, é a 'biblioteca' e '.add' o metódo */
    item.innerHTML = `
        <input type="checkbox" ${status} data-indice=${indice}>
        <div>${tarefa}</div>
        <input type ="button" value ="X" data-indice=${indice}> 
    ` /* serve para adicionar os itens que estão digitados entre ´´ no item HTML, com a função inner.HTML */
    document.getElementById('todoList').appendChild(item); /* está pegando um item pela sua ID, com document.getElementById e adicionando a variável item com a função appendChild. */

}

const limparTarefas= () =>{
    const todoList = document.getElementById('todoList');
    while(todoList.firstChild){
        todoList.removeChild(todoList.lastChild);
    }

}/* pega o elemento pai por meio do getElementByID, que é o todo list e cria uma variavel para receber ele * E usa um loop while (enquanto) para enquanto existir um item no todolist, POSSA remover o ultimo filho do TodoList (usando aa função removeChild), ele sempre irá excluir o ultimo filho.*/

const atualizarTela =() =>{
    limparTarefas();
    const banco = getBanco();
    banco.forEach((item, indice) => criarItem (item.tarefa, item.status, indice)); /* pega um item, manda pro criar item() porém, só manda a tarefa*/
}

const inserirItem = (evento) =>{
    
    const tecla = evento.key;
    const texto = evento.target.value;
    if (tecla ==="Enter"){
        const banco = getBanco();
        banco.push({'tarefa': texto, 'status': ''});
        setBanco(banco);
        atualizarTela();
        evento.target.value = ''; /* limpa a caixa de tarefas */
    }
    

}
const removerItem = (indice) =>{
    const banco = getBanco();
    banco.splice(indice,1); /*serve para recortar ou modificar um array */
    setBanco(banco);
    atualizarTela(); 
}
const atualizarItem = (indice) =>{
    const banco = getBanco();
    banco[indice].status = banco[indice].status === '' ? 'checked' : '';
    setBanco(banco);
    atualizarTela();
}
const clickItem =(evento) =>{
    const elemento = evento.target;
    if (elemento.type ==='button'){
        const indice = elemento.dataset.indice;
        removerItem (indice);
    }else if(elemento.type === 'checkbox'){
        const indice = elemento.dataset.indice;
        atualizarItem (indice);
    }
} /* serve para verificar onde estou clicando na tela. */



document.getElementById('newItem').addEventListener('keypress', inserirItem); /* add event listener, manda pro callback (retorno, que nesse caso é inserirItem), evento que foi detectado, dentro da condição especificada, que nesse caso é o evento keypress */

document.getElementById('todoList').addEventListener('click', clickItem);

atualizarTela();