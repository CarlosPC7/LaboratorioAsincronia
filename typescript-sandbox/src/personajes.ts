import { Personajes } from "./personajes.model";
import { obtenerPersonajes, filtrarPersonajes } from "./personajes.api";

const crearContenedorPersonajes = (personaje: Personajes): HTMLDivElement => {
  const elementoPersonaje = document.createElement("div");
  elementoPersonaje.classList.add("personaje-contenedor");

  const imagenUrl = `http://localhost:3000/${personaje.imagen}`;

  elementoPersonaje.innerHTML = `
    <img src="${imagenUrl}" alt="${personaje.nombre}">
    <p><strong>Nombre:</strong> ${personaje.nombre}</p>
    <p><strong>Especialidad:</strong> ${personaje.especialidad}</p>
    <p><strong>Habilidades:</strong> ${personaje.habilidades.join(", ")}</p>
  `;

  console.log("HTML generado para el personaje:", elementoPersonaje.innerHTML);
  return elementoPersonaje;
};

const pintarPersonajes = async (personajes: Personajes[]) => {
  const listado = document.querySelector("#listado-personajes");
  
  if(listado && listado instanceof HTMLDivElement) {
    listado.textContent = '';
    personajes.forEach(personaje => {
      const contenedorPersonaje = crearContenedorPersonajes(personaje);
      listado.appendChild(contenedorPersonaje);
    });
  } else {
    throw new Error("No se ha encontrado personajes de Mortadelo y Filemón");
  }
};

const obtenerValorCampo = (campo: string): string => {
  const elementoCampo = document.querySelector(`#${campo}`);

  if (elementoCampo && elementoCampo instanceof HTMLInputElement) {
    return elementoCampo.value;
  } else {
    throw new Error(`No se ha encontrado el campo ${campo}`);
  }
}

const filtraElPersonaje = async(evento: Event) : Promise <void> => {
  evento.preventDefault();
  
  const nombrePersonaje = obtenerValorCampo("search-input");

  try {
    const datosFiltrados : Personajes[] = await filtrarPersonajes(nombrePersonaje);
    await pintarPersonajes(datosFiltrados);
  } catch(error) {
    alert(error);
  }
};

document.addEventListener("DOMContentLoaded", async () => { 
  const formulario = document.querySelector("#search-form");

  if (formulario && formulario instanceof HTMLFormElement) {
    formulario.addEventListener("submit", filtraElPersonaje)
  } else {
    throw new Error("No se ha encontrado el personaje");
  }
  const personajes = await obtenerPersonajes();
  pintarPersonajes(personajes);
});

