'use strict'

export const getItensCurso = async() => {

    const url = `https://dull-rose-quail-yoke.cyclic.app/v1/lion-school/cursos`
    const response = await fetch(url)
    const data = await response.json()

    return data
}

export const getAlunos = async(filtro) => {

    const urlTodosAlunos = `https://dull-rose-quail-yoke.cyclic.app/v1/lion-school/alunos`;
    const responseTodosAlunos = await fetch(urlTodosAlunos);
    const dataTodosAlunos = await responseTodosAlunos.json();


    return {
        listaTodosAlunos: dataTodosAlunos,
    }
}

export const getAlunosCurso = async(filtro) => {
    const urlAlunosCurso = `https://dull-rose-quail-yoke.cyclic.app/v1/lion-school/alunos?cursos=${filtro}`
    const responseAlunosCurso = await fetch(urlAlunosCurso);
    const dataAlunosCurso = await responseAlunosCurso.json();
    console.log(dataAlunosCurso);
    return {
        listaAlunosCurso: dataAlunosCurso
    }
}

export const getAlunosStatus = async(idClicado) => {
    const urlAlunosStatus = `https://dull-rose-quail-yoke.cyclic.app/v1/lion-school/alunos?status=${idClicado}`
    const responseAlunosStatus = await fetch(urlAlunosStatus);
    const dataAlunosStatus = await responseAlunosStatus.json();
    console.log(dataAlunosStatus);

    return {
        listaAlunosStatus: dataAlunosStatus
    }
}