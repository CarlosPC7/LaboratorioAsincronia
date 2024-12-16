import { Personajes } from "./personajes.model";
import { obtenerPersonajes } from "./personajes.api";

/*
const crearElementoImagen = (
  portada: string,
  titulo: string
): HTMLImageElement => {
  const imagen = document.createElement("img")
  imagen.src = portada;
  imagen.alt = titulo;
  return imagen;
}

const crearElementoNombre = (
  texto: string,
): HTMLParagraphElement => {
  const parrafoNombre = document.createElement("p")
  parrafoNombre.textContent = texto;
  return parrafoNombre;
};

const crearElementoEspecialidad = (
  texto: string,
): HTMLParagraphElement => {
  const parrafoEspecialidad = document.createElement("p")
  parrafoEspecialidad.textContent = texto;
  return parrafoEspecialidad;
};

const crearElementoHabilidades = (
  texto: string[],
): HTMLParagraphElement => {
  const parrafoHabilidades = document.createElement("p")
  parrafoHabilidades.textContent = texto.join(", ");
  return parrafoHabilidades;
}
*/

const crearContenedorPersonajes = (personaje: Personajes): HTMLDivElement => {
  const elementoPersonaje = document.createElement("div");
  elementoPersonaje.classList.add("personaje-contenedor");

  /*
  const imagen = crearElementoImagen(personaje.imagen, personaje.nombre);
  elementoPersonaje.appendChild(imagen);

  const nombre = crearElementoNombre(personaje.nombre);
  elementoPersonaje.appendChild(nombre);

  const especialidad = crearElementoEspecialidad(personaje.especialidad);
  elementoPersonaje.appendChild(especialidad);

  const habilidades = crearElementoHabilidades(personaje.habilidades);
  elementoPersonaje.appendChild(habilidades);
  */

  const imagenUrl = `http://localhost:3000/${personaje.imagen}`;

  elementoPersonaje.innerHTML = `
    <img src="${imagenUrl}" alt="${personaje.nombre}">
    <p>Nombre: ${personaje.nombre}</p>
    <p>Especialidad: ${personaje.especialidad}</p>
    <p>Habilidades: ${personaje.habilidades.join(", ")}</p>
  `;

  console.log("HTML generado para el personaje:", elementoPersonaje.innerHTML);
  return elementoPersonaje;
}

const pintarPersonajes = async () => {
  const personajes = await obtenerPersonajes();
  const listado = document.querySelector("#listado-personajes");

  if(listado && listado instanceof HTMLDivElement) {
    personajes.forEach(personaje => {
      const contenedorPersonaje = crearContenedorPersonajes(personaje);
      listado.appendChild(contenedorPersonaje);
    });
  } else {
    throw new Error("No se ha encontrado personajes de Mortadelo y Filemón");
  }
};

document.addEventListener("DOMContentLoaded", pintarPersonajes);

