'use strict'

export const getItensCurso = async() => {

    const url = `https://alive-bull-leotard.cyclic.app/v1/lion-school/cursos`
    const response = await fetch(url)
    const data = await response.json()

    return data
}

export const getAlunos = async() => {

    const urlTodosAlunos = `https://alive-bull-leotard.cyclic.app/v1/lion-school/alunos`;
    const responseTodosAlunos = await fetch(urlTodosAlunos);
    const dataTodosAlunos = await responseTodosAlunos.json();


    return {
        listaTodosAlunos: dataTodosAlunos,
    }
}
export const getAlunoMatricula = async(filtro) => {

    const urlTodosAlunoMatricula = `https://alive-bull-leotard.cyclic.app/v1/lion-school/alunos/${filtro}`;
    const responseAlunoMatricula = await fetch(urlTodosAlunoMatricula);
    const dataAlunoMatricula = await responseAlunoMatricula.json();


    return {
        listaTodosAlunos: dataAlunoMatricula,
    }
}

export const getAlunosCurso = async(filtro) => {
    const urlAlunosCurso = `https://alive-bull-leotard.cyclic.app/v1/lion-school/alunos?cursos=${filtro}`
    const responseAlunosCurso = await fetch(urlAlunosCurso);
    const dataAlunosCurso = await responseAlunosCurso.json();
    return {
        listaAlunosCurso: dataAlunosCurso
    }
}

export const getAlunosStatus = async(idClicado) => {
    const urlAlunosStatus = `https://alive-bull-leotard.cyclic.app/v1/lion-school/alunos?status=${idClicado}`
    const responseAlunosStatus = await fetch(urlAlunosStatus);
    const dataAlunosStatus = await responseAlunosStatus.json();

    return {
        listaAlunosStatus: dataAlunosStatus
    }
}

export const getAlunosCursoStatus = async(filtro, idClicado) => {
    const urlAlunosStatus = `https://alive-bull-leotard.cyclic.app/v1/lion-school/alunos?cursos=${filtro}&status=${idClicado}`
    const responseAlunosStatus = await fetch(urlAlunosStatus);
    const dataAlunosStatus = await responseAlunosStatus.json();

    return {
        listaAlunosStatus: dataAlunosStatus
    }
}

export const getAlunosCursoConclusao = async(filtro, idClicado) => {
    const urlAlunosStatus = `https://alive-bull-leotard.cyclic.app/v1/lion-school/alunos?cursos=${filtro}&conclusao=${idClicado}`
    const responseAlunosStatus = await fetch(urlAlunosStatus);
    const dataAlunosStatus = await responseAlunosStatus.json();

    return {
        listaAlunosStatus: dataAlunosStatus
    }
}