let gananciaActual = 0;

function calcularGanancia() {
  const monto = parseFloat(document.getElementById('monto').value);
  const compra = parseFloat(document.getElementById('compra').value);
  const venta = parseFloat(document.getElementById('venta').value);
  const comisionPct = parseFloat(document.getElementById('comisionPct').value) || 0;
  const comisionFija = parseFloat(document.getElementById('comisionFija').value) || 0;
  const resultadoEl = document.getElementById('resultado');
  const guardarBox = document.getElementById('guardarBox');
  const valorGanancia = document.getElementById('valorGanancia');

  if (isNaN(monto) || isNaN(compra) || isNaN(venta)) {
    resultadoEl.style.color = "#ff5252";
    resultadoEl.innerText = '⚠️ Completá monto, compra y venta.';
    guardarBox.style.display = "none";
    return;
  }

  const cantidad = monto / compra;
  const totalVenta = cantidad * venta;
  const comisionPorcentaje = (totalVenta * comisionPct) / 100;
  const comisionTotal = comisionPorcentaje + comisionFija;
  const gananciaNeta = totalVenta - monto - comisionTotal;

  gananciaActual = gananciaNeta;

  if (gananciaNeta >= 0) {
    resultadoEl.style.color = "#4caf50";
    resultadoEl.innerText = `✅ Ganás $${gananciaNeta.toFixed(2)} después de comisiones.`;
    guardarBox.style.display = "block";
    valorGanancia.innerText = `Ganancia calculada: $${gananciaNeta.toFixed(2)}`;
  } else {
    resultadoEl.style.color = "#ff5252";
    resultadoEl.innerText = `❌ Perdés $${Math.abs(gananciaNeta).toFixed(2)} después de comisiones.`;
    guardarBox.style.display = "none";
  }
}

function guardarOperacion() {
  const ahora = new Date();
  const fecha = ahora.toLocaleDateString("es-AR");
  const ganancia = gananciaActual.toFixed(2);

  const nueva = {
    fecha: fecha,
    ganancia: parseFloat(ganancia)
  };

  let historial = JSON.parse(localStorage.getItem("historialGanancias")) || [];
  historial.push(nueva);
  localStorage.setItem("historialGanancias", JSON.stringify(historial));
  mostrarHistorial();

  // Ocultar cuadro de guardar
  document.getElementById('guardarBox').style.display = "none";
}

function cancelarGuardar() {
  document.getElementById('guardarBox').style.display = "none";
}

function mostrarHistorial() {
  const lista = document.getElementById("listaHistorial");
  const totalEl = document.getElementById("totalMensual");
  const historial = JSON.parse(localStorage.getItem("historialGanancias")) || [];

  lista.innerHTML = "";
  let total = 0;

  historial.forEach(op => {
    const li = document.createElement("li");
    li.textContent = `✅ Ganancia: $${op.ganancia} el ${op.fecha}`;
    lista.appendChild(li);
    total += op.ganancia;
  });

  totalEl.textContent = `Total ganado este mes: $${total.toFixed(2)}`;
}

// Mostrar historial al cargar
mostrarHistorial();