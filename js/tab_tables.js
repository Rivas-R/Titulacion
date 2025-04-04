document.addEventListener("DOMContentLoaded", function () {
    fetch("./documentos_tab.html")
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to load content");
            }
            return response.text();
        })
        .then(data => {
            document.querySelector(".documentos_tab").innerHTML = data;
        })
        .catch(error => console.error("Error loading content:", error));
});

document.addEventListener("DOMContentLoaded", function () {
    fetch("./cni.html")
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to load content");
            }
            return response.text();
        })
        .then(data => {
            document.querySelector(".cni").innerHTML = data;
        })
        .catch(error => console.error("Error loading content:", error));
});

document.addEventListener("DOMContentLoaded", function () {
    fetch("./cuentas_nuevas_tab.html")
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to load content");
            }
            return response.text();
        })
        .then(data => {
            document.querySelector(".cuentas_nuevas").innerHTML = data;
        })
        .catch(error => console.error("Error loading content:", error));
});

document.addEventListener("DOMContentLoaded", function () {
    fetch("./general_tab.html")
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to load content");
            }
            return response.text();
        })
        .then(data => {
            document.querySelector(".general").innerHTML = data;
        })
        .catch(error => console.error("Error loading content:", error));
});

document.addEventListener("DOMContentLoaded", function () {
    fetch("./linea_pago.html")
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to load content");
            }
            return response.text();
        })
        .then(data => {
            document.querySelector(".linea_pago").innerHTML = data;
        })
        .catch(error => console.error("Error loading content:", error));
});

document.addEventListener("DOMContentLoaded", function () {
    fetch("./segunda_revicion_tab.html")
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to load content");
            }
            return response.text();
        })
        .then(data => {
            document.querySelector(".segunda_revicion").innerHTML = data;
        })
        .catch(error => console.error("Error loading content:", error));
});

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