const niveles = 3
let teclas
let puntos = 0;
let aciertos = 0;

function iniciar() {
    document.querySelector('#btnInicio').disabled = true;
    document.querySelector('#btnReset').disabled = false;
    teclas = generarTeclas()
    siguienteNivel(0)
}

function siguienteNivel(nivelActual) {
    if (nivelActual === niveles) {
        return Swal.fire({
            title: 'Felicidades Has Ganado',
            html: `Nivel: ${nivelActual}<br/>Puntos: ${puntos}<br/>Aciertos: ${aciertos}<br/>Digite su nombre:`,
            input: 'text',
            type: 'success',
            inputAttributes: {
                autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Enviar',
            showLoaderOnConfirm: true,
            preConfirm: (nombre) => {
                const data = {
                    username: nombre,
                    nivel: nivelActual,
                    puntos: puntos
                }
                return fetch('http://localhost:3000/puntajes', {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(response.statusText)
                        }
                        return response.json()
                    })
                    .catch(error => {
                        Swal.showValidationMessage(
                            `Request failed: ${error}`
                        )
                    })
            },
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
            listar()
        })
    }

    Swal.fire({
        title: `Nivel ${nivelActual + 1}`,
        timer: 1000,
        showConfirmButton: false
    });
    for (let i = 0; i <= nivelActual; i++) {
        setTimeout(() => activar(getElementByCodigo(teclas[i])), 1000 * (i + 1) + 1000)
    }

    let i = 0;
    teclaActual = teclas[i]
    window.addEventListener('keydown', onkeydown)
    document.querySelector(".keyboard").addEventListener("click", clickTecla);

    function clickTecla(ev) {
        let tecla = ev.toElement.dataset["key"];
        const el = getElementByCodigo(tecla)
        if (parseInt(tecla) === parseInt(teclaActual)) {
            activar(el, { success: true })
            i++
            puntos+=2;
            aciertos++
            if (i > nivelActual) {
                window.removeEventListener('keydown', onkeydown)
                document.querySelector(".keyboard").removeEventListener('click', clickTecla)
                setTimeout(() => siguienteNivel(i), 1500)
            }
            teclaActual = teclas[i]
            console.log("teclaActual: ", teclaActual)
        } else {
            activar(el, { fail: true })
            const correctElement = getElementByCodigo(teclaActual)
            activar(correctElement)
            setTimeout(() => {
                window.removeEventListener('keydown', onkeydown)
                document.querySelector(".keyboard").removeEventListener('click', clickTecla)
                Swal.fire({
                    title: 'Fin del Juego',
                    html: `Nivel: ${nivelActual}<br/>Puntos: ${puntos}<br/>Aciertos: ${aciertos}<br/>Digite su nombre:`,
                    input: 'text',
                    inputAttributes: {
                        autocapitalize: 'off'
                    },
                    showCancelButton: true,
                    confirmButtonText: 'Enviar',
                    showLoaderOnConfirm: true,
                    preConfirm: (nombre) => {
                        const data = {
                            username: nombre,
                            nivel: nivelActual,
                            puntos: puntos
                        }
                        return fetch('http://localhost:3000/puntajes', {
                            method: 'POST',
                            body: JSON.stringify(data),
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        })
                            .then(response => {
                                if (!response.ok) {
                                    throw new Error(response.statusText)
                                }
                                return response.json()
                            })
                            .catch(error => {
                                Swal.showValidationMessage(
                                    `Request failed: ${error}`
                                )
                            })
                    },
                    allowOutsideClick: () => !Swal.isLoading()
                }).then((result) => {
                    listar()
                })
            }, 1000)
        }
    }

    function onkeydown(ev) {
        const el = getElementByCodigo(ev.keyCode)
        if (ev.keyCode === teclaActual) {
            activar(el, { success: true })
            i++
            puntos+=2;
            aciertos++
            if (i > nivelActual) {
                window.removeEventListener('keydown', onkeydown)
                setTimeout(() => siguienteNivel(i), 1500)
            }
            teclaActual = teclas[i]
        } else {
            activar(el, { fail: true })
            const correctElement = getElementByCodigo(teclaActual)
            activar(correctElement)
            window.removeEventListener('keydown', onkeydown)
            document.querySelector(".keyboard").removeEventListener('click', clickTecla)
            setTimeout(() => {
                Swal.fire({
                    title: 'Fin del Juego',
                    html: `Nivel: ${nivelActual}<br/>Puntos: ${puntos}<br/>Aciertos: ${aciertos}<br/>Digite su nombre:`,
                    input: 'text',
                    type: 'success',
                    inputAttributes: {
                        autocapitalize: 'off'
                    },
                    showCancelButton: true,
                    confirmButtonText: 'Enviar',
                    showLoaderOnConfirm: true,
                    preConfirm: (nombre) => {
                        const data = {
                            username: nombre,
                            nivel: nivelActual,
                            puntos: puntos
                        }
                        return fetch('http://localhost:3000/puntajes', {
                            method: 'POST',
                            body: JSON.stringify(data),
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        })
                            .then(response => {
                                if (!response.ok) {
                                    throw new Error(response.statusText)
                                }
                                return response.json()
                            })
                            .catch(error => {
                                Swal.showValidationMessage(
                                    `Request failed: ${error}`
                                )
                            })
                    },
                    allowOutsideClick: () => !Swal.isLoading()
                }).then((result) => {
                    listar()
                })
            }, 1000)
        }
    }
}

function generarTeclas() {
    return new Array(niveles).fill(0).map(generarTeclaAleatoria)
}

function generarTeclaAleatoria() {
    const min = 65
    const max = 90
    return Math.round(Math.random() * (max - min) + 65)
}

function getElementByCodigo(keyCode) {
    return document.querySelector(`[data-key="${keyCode}"]`)
}

function activar(el, opts = {}) {
    el.classList.add('active')
    if (opts.success) {
        el.classList.add('success')
    } else if (opts.fail) {
        el.classList.add('fail')
    }
    setTimeout(desactivar.bind(null, el), 500)
}

function desactivar(el) {
    el.className = 'key'
}

function listar() {
    fetch('http://localhost:3000/puntajes', {
        method: 'GET', // or 'PUT'
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText)
            }

            response.json().then(datos => {
                let registros = '';
                datos.map((p) => {
                    registros += `<b>Nombre:</b> ${p.username} <b>Nivel:</b> ${p.nivel} <b>Puntos:</b> ${p.puntos} <br/>`
                });
                Swal.fire({
                    title: 'últimos 5 puntajes',
                    html: registros,
                })
            })
        })
        .catch(error => {
            Swal.showValidationMessage(
                `Request failed: ${error}`
            )
        })
}