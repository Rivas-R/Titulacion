//Añade las tablas a cada pestaña
document.addEventListener("DOMContentLoaded", function () {
    loadHTML("./general_tab.html", ".general");
    loadHTML("./cuentas_nuevas_tab.html", ".cuentas_nuevas");
    loadHTML("./documentos_tab.html", ".documentos_tab");
    loadHTML("./segunda_revicion_tab.html", ".segunda_revicion");
    loadHTML("./cni.html", ".cni");
    loadHTML("./linea_pago.html", ".linea_pago");
});

function loadHTML(url, selector) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                document.querySelector(selector).innerHTML = xhr.responseText;
            } else {
                console.error("Error loading " + url + ": " + xhr.statusText);
            }
        }
    };

    xhr.send();
}

// Pop up cuando se rechasa documento
function handleReject(button) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <form>
                <strong>Requerimientos:</strong><br>
                <input type="checkbox" id="req1" name="requirement" value="Req1">
                <label for="req1"> La cerednecial no es visisble</label><br>
                <input type="checkbox" id="req2" name="requirement" value="Req2">
                <label for="req2"> La informacion no es la misma que en los datos</label><br>
                <input type="checkbox" id="req3" name="requirement" value="Req3">
                <label for="req3"> La cerednecial se encuentra mal ajustada</label><br>
                <div style="margin-top: 15px;">
                    <label for="comentarios"><strong>Comentarios:</strong></label><br>
                    <textarea id="comentarios" name="comentarios" rows="4" style="width: 100%; padding: 5px; border: 1px solid #ccc; border-radius: 5px;"></textarea>
                </div>
                <div style="margin-top: 10px;">
                    <button type="button" class="btn btn-danger" onclick="closeModal(this)">Reject</button>
                    <button type="button" class="btn btn-secondary" onclick="closeModal(this)">Cancelar</button>
                </div>
            </form>
        </div>
    `;
    document.body.appendChild(modal);
}

//Pop up cuando se accepta documento
function handleAccept(button) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <p>¿Estas seguro que quieres aceptar este documento?</p>
            <button type="button" class="btn btn-success" onclick="confirmAccept()">Aceptar</button>
            <button type="button" class="btn btn-secondary" onclick="closeModal(this)">Cancelar</button>
        </div>
    `;
    document.body.appendChild(modal);
}

//Pop up con el historial del documento
function historial(button) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content-table ">
            <table class="inner-table">

                        <thead align="center">
                            <!-- Nombre de las columans de la tabla de egresados -->
                            <tr>
                                <th>Estatus</th>
                                <th>Documento</th>
                                <th>Tamaño</th>
                                <th>Fecha</th>
                                <th>Comentarios</th>
                                
                            </tr>
                        </thead>

                        <tbody align="center">
                            <tr>
                                 <td>
                                    Rechazado
                                </td>
                                <td>
                                    <i class="fa-solid fa-file-pdf" onclick=showPDF()></i>
                                </td>
                                <td>
                                    1.2MB
                                </td>
                                <td>
                                    24/04/2025
                                    </td>
                                <td>
                                    Documento no visible
                                </td>
                            </tr>

                            <tr>
                                 <td>
                                    Rechazado
                                </td>
                                <td>
                                    <i class="fa-solid fa-file-pdf" onclick=showPDF()></i>
                                </td>
                                <td>
                                    1.2MB
                                </td>
                                <td>
                                    25/04/2025
                                    </td>
                                <td>
                                    Documento no visible
                                </td>
                            </tr>

                            <tr>
                                 <td>
                                    Aceptado
                                </td>
                                <td>
                                    <i class="fa-solid fa-file-pdf" onclick=showPDF()></i>
                                </td>
                                <td>
                                    1.2MB
                                </td>
                                <td>
                                    30/04/2025
                                    </td>
                                <td>
                                </td>
                            </tr>

                        </tbody>
                    </table>
        </div>
    `;
    document.body.appendChild(modal);
}

function confirmAccept() {
    alert('Documento aceptado.');
    closeModal();
}

function closeModal(button) {
    const modal = button ? button.closest('.modal-overlay') : document.querySelector('.modal-overlay');
    if (modal) {
        modal.remove();
    }
}