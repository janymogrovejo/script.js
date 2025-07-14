const ramos = [
  // 1er semestre
  { id: "mat_fin", nombre: "Matemáticas financiera", prereqs: [], abre: ["estad", "eco_tur"] },
  { id: "intro_tur", nombre: "Introducción al turismo", prereqs: [], abre: ["hist_ec"] },
  { id: "geo_tur", nombre: "Geografía turística", prereqs: [], abre: ["eco_med"] },
  { id: "leng", nombre: "Lenguaje y comunicación", prereqs: [], abre: ["inv"] },
  { id: "ing1", nombre: "Inglés I", prereqs: [], abre: ["ing2"] },

  // 2do semestre
  { id: "etiq", nombre: "Etiqueta y protocolo", prereqs: [], abre: [] },
  { id: "hist_ec", nombre: "Historia del Ecuador", prereqs: ["intro_tur"], abre: ["pat_cult"] },
  { id: "eco_med", nombre: "Ecología y medio ambiente", prereqs: ["geo_tur"], abre: ["tec_gui", "pat_nat"] },
  { id: "inv", nombre: "Investigación", prereqs: ["leng"], abre: [] },
  { id: "ing2", nombre: "Inglés II", prereqs: ["ing1"], abre: ["ing3"] },

  // 3er semestre
  { id: "estad", nombre: "Estadística descriptiva", prereqs: ["mat_fin"], abre: ["admin_tur"] },
  { id: "eco_tur", nombre: "Economía del turismo", prereqs: ["mat_fin"], abre: ["admin_tur"] },
  { id: "pat_cult", nombre: "Patrimonio cultural", prereqs: ["hist_ec"], abre: ["etn_ec"] },
  { id: "tec_gui", nombre: "Técnicas de guiar", prereqs: ["eco_med"], abre: ["op_tur"] },
  { id: "ing3", nombre: "Inglés III", prereqs: ["ing2"], abre: ["ing4"] },

  // 4to semestre
  { id: "admin_tur", nombre: "Administración turística", prereqs: ["estad", "eco_tur"], abre: ["dir_hot", "conta_adm"] },
  { id: "serv_com", nombre: "Servicio comunitario", prereqs: [], abre: [] },
  { id: "etn_ec", nombre: "Etnografía turística", prereqs: ["pat_cult"], abre: [] },
  { id: "op_tur", nombre: "Operación turística", prereqs: ["tec_gui"], abre: ["agen_via"] },
  { id: "pat_nat", nombre: "Patrimonio Natural", prereqs: ["eco_med"], abre: ["plan_ter"] },
  { id: "ing4", nombre: "Inglés IV", prereqs: ["ing3"], abre: ["ing5"] },

  // 5to semestre
  { id: "dir_hot", nombre: "Dirección hotelera", prereqs: ["admin_tur"], abre: ["gest_hum"] },
  { id: "conta_adm", nombre: "Contabilidad administrativa", prereqs: ["admin_tur"], abre: ["gest_alim", "empr"] },
  { id: "agen_via", nombre: "Agencias de viajes", prereqs: ["op_tur"], abre: ["ind_aer", "sist_res"] },
  { id: "plan_ter", nombre: "Planificación territorial", prereqs: ["pat_nat"], abre: ["gest_cal"] },
  { id: "ing5", nombre: "Inglés V", prereqs: ["ing4"], abre: ["ing6"] },

  // 6to semestre
  { id: "gest_hum", nombre: "Gestión de talento humano", prereqs: ["dir_hot"], abre: ["mkt_tur"] },
  { id: "gest_alim", nombre: "Gestión de alimentos y bebidas", prereqs: ["conta_adm"], abre: [] },
  { id: "prac1", nombre: "Práctica laboral I", prereqs: [], abre: ["prac2"] },
  { id: "ind_aer", nombre: "Industria aérea", prereqs: ["agen_via"], abre: [] },
  { id: "sist_res", nombre: "Sistemas de reserva", prereqs: ["agen_via"], abre: [] },
  { id: "gest_cal", nombre: "Gestión de la calidad turística", prereqs: ["plan_ter"], abre: [] },
  { id: "ing6", nombre: "Inglés VI", prereqs: ["ing5"], abre: ["ing7"] },

  // 7mo semestre
  { id: "mkt_tur", nombre: "Marketing turístico", prereqs: ["gest_hum"], abre: ["tend"] },
  { id: "empr", nombre: "Emprendimiento e innovación", prereqs: ["conta_adm"], abre: [] },
  { id: "prac2", nombre: "Práctica laboral II", prereqs: ["prac1"], abre: ["dis_int"] },
  { id: "gest_dest", nombre: "Gestión de destinos turísticos", prereqs: [], abre: [] },
  { id: "tur_sost", nombre: "Turismo sostenible", prereqs: [], abre: [] },
  { id: "ing7", nombre: "Inglés VII", prereqs: ["ing6"], abre: ["speak"] },

  // 8vo semestre
  { id: "tend", nombre: "Tendencias turísticas", prereqs: ["mkt_tur"], abre: [] },
  { id: "gest_event", nombre: "Gestión de eventos", prereqs: [], abre: [] },
  { id: "dis_int", nombre: "Diseño integración curricular", prereqs: ["prac2"], abre: [] },
  { id: "modal", nombre: "Modalidades turísticas", prereqs: [], abre: [] },
  { id: "speak", nombre: "Speaking and reporting", prereqs: ["ing7"], abre: [] }
];

const contenedor = document.getElementById("malla");

function crearBoton(ramo) {
  const btn = document.createElement("button");
  btn.textContent = ramo.nombre;
  btn.className = "boton-ramo";
  btn.id = ramo.id;
  btn.disabled = ramo.prereqs.length > 0;

  btn.addEventListener("click", () => {
    btn.classList.add("aprobado");
    btn.disabled = true;

    // desbloquear los que dependen de este
    ramos.forEach(destino => {
      if (destino.prereqs.includes(ramo.id)) {
        const otros = destino.prereqs.filter(p => p !== ramo.id);
        const yaAprobados = otros.every(pid => {
          const el = document.getElementById(pid);
          return el && el.classList.contains("aprobado");
        });
        if (yaAprobados) {
          document.getElementById(destino.id).disabled = false;
        }
      }
    });
  });

  return btn;
}

// Crear todos los botones
ramos.forEach(ramo => {
  contenedor.appendChild(crearBoton(ramo));
});
