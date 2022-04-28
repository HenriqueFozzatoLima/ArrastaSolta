//Dados iniciais
let areas = {
    a: null,
    b: null,
    c: null
};//Um objeto que armazena as áreas e seus respectivos nomes
//Eventos
document.querySelectorAll('.item').forEach((item) => {//Adiciona os eventos aos itens (clicar)
    item.addEventListener('dragstart', dragStart);//O que ocorre quando você começa a segurar o item
    item.addEventListener('dragend', dragEnd);//O que ocorre ao soltar o item
})
document.querySelectorAll('.area').forEach((area) => {//Eventos para a área onde os itens serão posicionados
    area.addEventListener('dragover', dragOver);//O que ocorre quando você leva o item até essa área
    area.addEventListener('dragleave', dragLeave);//O que ocorre quando ele sai dessa área
    area.addEventListener('drop', drop);//O que ocorre quando você solta ele dessa área
})

document.querySelector('.neutralArea').addEventListener('dragover', dragOverNeutral);
document.querySelector('.neutralArea').addEventListener('dragleave', dragLeaveNeutral);
document.querySelector('.neutralArea').addEventListener('drop', dropNeutral);


//Funções
//Funções dos itens
function dragStart(e) {
    e.currentTarget.classList.add('dragging');//Adiciona a classe que simboliza quando ele está sendo segurado(arrastado)
}
function dragEnd(e) {
    e.currentTarget.classList.remove('dragging');//Remove a classe que simboliza quando ele está sendo segurado(arrastado) 
}

//Funções da área
function dragOver(e) {

    if (e.currentTarget.querySelector('.item') === null) {
        e.preventDefault();
        e.currentTarget.classList.add('hover');//Adiciona a classe feita no css para simbolizar que está sobre o elemento
    }
}
function dragLeave(e) {
    e.currentTarget.classList.remove('hover');//Remove a classe feita no css para simbolizar que está sobre o elemento
}
function drop(e) {
    e.currentTarget.classList.remove('hover');//Remove a classe feita no css para simbolizar que está sobre o elemento


    if (e.currentTarget.querySelector('.item') === null) {//Condição que impede de adicionar um item se já houver um item existente nesse elemento
        let dragItem = document.querySelector('.item.dragging');//Armazena na variável dragItem o item que está sendo arrastado
        e.currentTarget.appendChild(dragItem);//Adiciona a variável dragItem(Que nesse caso é o item sendo arrastado) no elemento (Área)*
        //*Nesse caso, appendChild irá mover o objeto ao invés de só adicionar caso esse objeto já exista, levando todos os comandos feitos no document, incluindo eventos
        updateAreas();
    }

}

//funções da área neutra
function dragOverNeutral(e) {

    e.preventDefault();
    e.currentTarget.classList.add('hover');
}
function dragLeaveNeutral(e) {
    e.currentTarget.classList.remove('hover');
}
function dropNeutral(e) {
    e.currentTarget.classList.remove('hover');
    let dragItem = document.querySelector('.item.dragging');

    e.currentTarget.appendChild(dragItem);
    updateAreas();
}

//Funções lógicas
function updateAreas() {

    document.querySelectorAll('.area').forEach(area => {//Adiciona essa função para cada uma das áreas
        let name = area.getAttribute('data-name');//O nome dessa área (nesse caso é A B ou C) colocada na variável name
        if (area.querySelector('.item') !== null) {//Se tiver algum item dentro da área
            areas[name] = area.querySelector('.item').innerHTML;//Coloca o texto dentro do item dentro da área com esse nome (por exemplo, item 1 na área B)
        } else {
            areas[name] = null;//Caso contrário remove o nome do item da área alvo
        }
        
    })
    
    if (areas.a === '1' && areas.b === '2' && areas.c === '3') {//Se as áreas forem exatamente como a condição exige, adiciona o estilo do css
        document.querySelector('.areas').classList.add('correct')
    }else {//Se não, o remove
        document.querySelector('.areas').classList.remove('correct')
    }
}


/* Target: O elemento alvo (No caso o clicado)
Current Target: O elemento que possui esse evento */