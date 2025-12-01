    let inpNombre = document.getElementById("nombre");
        let inpApellido = document.getElementById("apellido");
        let inpTelefono = document.getElementById("telefono");
        let registro = [];
        let idActualizar = null;
        let btnGuardar = document.getElementById("btnGuardar");
        pintar();

        btnGuardar.addEventListener("click", () => {
            if (inpNombre.value === "" || inpApellido.value === "" || inpTelefono.value === "") {
                alert("Todos los campos son obligatorios.");
                return;
            }

            if (idActualizar !== null) {
                let indice = registro.findIndex(item => item.id === idActualizar);
                if (indice !== -1) {
                    registro[indice].nombre = inpNombre.value;
                    registro[indice].apellido = inpApellido.value;
                    registro[indice].telefono = inpTelefono.value;
                }
                idActualizar = null;
                btnGuardar.innerHTML = '<i class="bi bi-save me-2"></i> Guardar'; 
            } else {
                let data = {
                    id: Date.now(),
                    nombre: inpNombre.value,
                    apellido: inpApellido.value,
                    telefono: inpTelefono.value
                };
                registro.push(data);
            }
            pintar();
            limpiar();
        });

        function limpiar() {
            inpNombre.value = "";
            inpApellido.value = "";
            inpTelefono.value = "";
        }

        function pintar() {
            document.getElementById("datos").innerHTML = "";

            registro.forEach((item, indice) => {
                let tr = document.createElement("tr");

                tr.innerHTML = `
                    <td>${item.id}</td>
                    <td>${item.nombre}</td>
                    <td>${item.apellido}</td>
                    <td>${item.telefono}</td>
                    <td>
                        <button class="btn-edit me-2" title="Editar">
                            <i class="bi bi-pencil-fill"></i>
                        </button>

                        <button class="btn-delete" title="Eliminar">
                            <i class="bi bi-trash-fill"></i>
                        </button>
                    </td>
                `;

                tr.querySelector(".btn-delete").addEventListener("click", () => {
                    if (confirm(`¿seguro de que quieres eliminar el registro ${item.id}?`)) {
                        registro.splice(indice, 1);
                        pintar();
                    }
                });

                tr.querySelector(".btn-edit").addEventListener("click", () => {
                    inpNombre.value = item.nombre;
                    inpApellido.value = item.apellido;
                    inpTelefono.value = item.telefono;
                    idActualizar = item.id;
                    btnGuardar.innerHTML = '<i class="bi bi-arrow-clockwise me-2"></i> Actualizar'; 
                });
                document.getElementById("datos").appendChild(tr);
            });
        }
