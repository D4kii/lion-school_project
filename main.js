'use strict'

import { getItensCurso } from "./module/api.js"

import { getAlunos, getAlunosCurso, getAlunosStatus, getAlunosCursoStatus } from "./module/api.js"

const botaoCurso = await getItensCurso();



//Primeira tela
const criandoCardCursos = (curso, indice) => {
    const exitButton = document.getElementById('div-sair')
    const divPrimeiraTela = document.getElementById('primeira-tela')
    const divSegundaTela = document.getElementById('cards-alunos_container')
    const headerSegundaTela = document.getElementById('card-status')

    const nomeCursoCorrigido = curso.nome.replace(`001 -`, ``)

    const divButtons = document.createElement('div');
    divButtons.classList.add('container-buttons');

    const divCurso = document.createElement('div');
    divCurso.classList.add('cards-tag');

    const cardCurso = document.createElement('div');
    cardCurso.classList.add(`curso_${curso.sigla}`);

    const imgCurso = document.createElement('img');
    imgCurso.classList.add(`img-${curso.sigla}`);
    imgCurso.setAttribute('alt', `imagem que representa o curso de ${nomeCursoCorrigido}`)
    imgCurso.src = curso.icone;

    const textCurso = document.createElement('p');
    textCurso.classList.add(`${curso.sigla}`);
    textCurso.textContent = curso.sigla;

    cardCurso.append(imgCurso, textCurso);


    divButtons.append(cardCurso);

    exitButton.onclick = () => {
        window.location.reload()
    }

    cardCurso.onclick = () => {
        carregarCardsAlunosCurso(indice)
        divPrimeiraTela.style.display = 'none'
        divSegundaTela.style.display = 'flex'
        headerSegundaTela.style.display = 'flex'

    }
    return divButtons;

}

const carregarCurso = () => {
    const cardPrincipal = document.getElementById('card-principal')
    const componentesCards = botaoCurso.cursos.map(criandoCardCursos)

    cardPrincipal.replaceChildren(...componentesCards)
}
//Segunda Tela
const criandoCardAlunos = (aluno, indice) => {
    const cardsAlunosContainer = document.getElementById('cards-alunos_container');
    const headerSegundaTela = document.getElementById('card-status')
    const cardAlunoGrafico = document.getElementById('card-aluno-grafico')
    const cardGrafico = document.getElementById('card_materias')

    const cardPlace = document.createElement('div');
    cardPlace.classList.add('card-curso_place');

    const cardAluno = document.createElement('div');
    cardAluno.classList.add('card');

    const imgCardAluno = document.createElement('img');
    imgCardAluno.classList.add('card__image-aluno');
    imgCardAluno.src = aluno.image;

    const nomeCardAluno = document.createElement('h5');
    nomeCardAluno.classList.add('aluno-name__title');
    nomeCardAluno.textContent = aluno.nome;


    cardAluno.onclick = () => {
        cardsAlunosContainer.style.display = 'none'
        headerSegundaTela.style.display = 'none'
        cardAlunoGrafico.style.display = 'flex'
        cardGrafico.style.display = 'flex'
        carregarAlunoGrafico(aluno)
        carregarGrafico(aluno)
    }

    if (aluno.status == 'Finalizado') {
        cardAluno.style.backgroundColor = '#3347B0'
    } else {
        cardAluno.style.backgroundColor = '#E5B657'
    }

    cardAluno.append(imgCardAluno, nomeCardAluno);
    cardPlace.append(cardAluno)


    return cardPlace;

}
const criandoTituloCurso = (aluno, indice) => {

    const cardPrincipalAlunos = document.getElementById('cards-alunos_container');
    const titleCard = document.createElement('h1')
    titleCard.classList.add('nome-curso_title')
    titleCard.setAttribute('id', 'nome-curso_title')

    const tituloCorrigido = aluno.nomeCurso.replace(`001 -`, ``)

    titleCard.textContent = tituloCorrigido
    console.log(indice);


    criandoCarregamentoStatus(aluno.sigla)


    cardPrincipalAlunos.append(titleCard)
}
const carregarCardsAlunosCurso = async (indice) => {
    // const cardPrincipalAlunos = document.getElementById('cards-alunos_container');

    const cardsAlunos = document.getElementById('card-curso_place');
    const sigla = await botaoCurso.cursos[indice].sigla

    const listaAlunos = await getAlunosCurso(sigla)
    const dadosAlunosCard = await listaAlunos.listaAlunosCurso.alunos.map(criandoCardAlunos)
    criandoTituloCurso(listaAlunos.listaAlunosCurso.alunos[indice], indice)

    carregarDropdownAnosFiltro(listaAlunos.listaAlunosCurso)

    cardsAlunos.replaceChildren(...dadosAlunosCard)

}
const criandoCarregamentoStatus = async (sigla) => {
    const buttons = document.querySelectorAll('.card-')
    buttons.forEach(button => {
        button.addEventListener('click', async () => {
            const idClicado = button.id;
            console.log(idClicado);

            if (idClicado == 'status') {

                const todos = await getAlunosCurso(sigla)

                const titleCurso = document.getElementById('nome-curso_title');
                titleCurso.innerHTML = `Todos os Alunos`

                const cardsAlunos = document.getElementById('card-curso_place');

                console.log(sigla);
                const dadosAlunosCard = await todos.listaAlunosCurso.alunos.map(criandoCardAlunos)
                cardsAlunos.replaceChildren(...dadosAlunosCard)


            } else {
                const retorno = await getAlunosCursoStatus(sigla, idClicado)

                const titleCurso = document.getElementById('nome-curso_title');
                titleCurso.innerHTML = idClicado

                const cardsAlunos = document.getElementById('card-curso_place');

                const dadosAlunosCard = await retorno.listaAlunosStatus.alunos.map(criandoCardAlunos)
                cardsAlunos.replaceChildren(...dadosAlunosCard)

            }

        })
    });


}

const criandoDropdownAnosFiltro = (aluno) => {

    const anoConclusao = document.createElement('p');
    anoConclusao.classList.add('ano-conclusao')
    anoConclusao.setAttribute('id', `ano-conclusao- ${aluno.conclusao}`);
    anoConclusao.textContent = aluno.conclusao;

    return anoConclusao;

}

const criandoCarregamentoAnoConclusao = async () => {
    const buttons = document.querySelectorAll('.ano-conclusao-')
    // buttons.forEach(button => {
    //     button.addEventListener('click', async () => {
    //         const idClicado = button.id;
    //         console.log(idClicado);

    //         if (idClicado == 'status') {

    //             const todos = await getAlunosCurso(sigla)

    //             const titleCurso = document.getElementById('nome-curso_title');
    //             titleCurso.innerHTML = `Todos os Alunos`

    //             const cardsAlunos = document.getElementById('card-curso_place');

    //             console.log(sigla);
    //             const dadosAlunosCard = await todos.listaAlunosCurso.alunos.map(criandoCardAlunos)
    //             cardsAlunos.replaceChildren(...dadosAlunosCard)

    //         }


    //     }   
    // }  
}

const carregarDropdownAnosFiltro = async (lista) => {


    const dropdownPlace = document.getElementById('menu-dropdown-ano_content');
    const cardsAnos = lista.alunos.map(criandoDropdownAnosFiltro);
    console.log(lista)

    dropdownPlace.replaceChildren(...cardsAnos)
}

// const criandoCarregamentoAnoConclusao = 

//Terceira Tela
const criandoCarAlunoSelecionado = (aluno) => {

    const divAluno = document.createElement('div')
    divAluno.classList.add('foto-aluno')

    const img = document.createElement('img')
    img.classList.add('img-aluno')
    img.src = aluno.image

    const nameAluno = document.createElement('p')
    nameAluno.classList.add('name-aluno')
    nameAluno.textContent = aluno.nome;

    divAluno.append(img, nameAluno)

    return divAluno
}

const carregarAlunoGrafico = (aluno) => {

    const cardAluno = document.getElementById('card-aluno-grafico')
    const componentesCards = criandoCarAlunoSelecionado(aluno)

    cardAluno.replaceChildren(componentesCards)
}

const criandoGrafico = (aluno) => {

    const grafico = document.createElement('div')
    grafico.classList.add('grafico')

    aluno.disciplinas.forEach(function (disciplina) {
        const segura = document.createElement('div')
        segura.classList.add('segura')

        const textNota = document.createElement('span')
        textNota.classList.add('potuacao')
        textNota.textContent = disciplina.media

        const tamanho_nota = document.createElement('div')
        tamanho_nota.classList.add('percentual')

        const valorNota = document.createElement('div')
        valorNota.classList.add('cor')
        const valor = parseInt(textNota.textContent)
        if (parseInt(textNota.textContent) >= 70 && parseInt(textNota.textContent) <= 100) {

            textNota.classList.add('porcentagem-nota-aprovado')
            valorNota.classList.add('nota_aprovado')
        } else if (parseInt(textNota.textContent) <= 70 && parseInt(textNota.textContent) <= 60) {
            textNota.classList.add('porcentagem-nota-reprovado')
            valorNota.classList.add('nota_reprovado')
        } else if (parseInt(textNota.textContent) >= 61 && parseInt(textNota.textContent) <= 69) {

            textNota.classList.add('porcentagem-nota-exame')
            valorNota.classList.add('nota_meio_termo')
        }

        const altura = `${(valor / 50) * 50}%`
        valorNota.style.height = altura


        const materia = document.createElement('span')
        materia.classList.add('disciplina')
        materia.textContent = disciplina.nome.substr(1, 2, 3).toUpperCase()

        tamanho_nota.append(valorNota)
        segura.append(textNota, tamanho_nota, materia)
        grafico.append(segura)
    })

    return grafico

}

const carregarGrafico = (aluno) => {

    const cardGrafico = document.getElementById('card_materias')
    const grafico = criandoGrafico(aluno)

    cardGrafico.replaceChildren(grafico)
}


//carregar os botões da primeira tela
carregarCurso()