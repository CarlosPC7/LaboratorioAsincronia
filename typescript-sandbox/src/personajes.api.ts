import axios from "axios";
import { Personajes } from "./personajes.model";

export const obtenerPersonajes = async (): Promise<Personajes[]> => {
  try {
    const { data } = await axios.get("http://localhost:3000/personajes");
    return data;
  } catch (error) {
    throw new Error("Error al obtener los personajes");
  }
};

export const filtrarPersonajes = async (nombrePersonaje: string): Promise<Personajes[]> => {
  try {
    const { data } = await axios.get(`http://localhost:3000/personajes?nombre_like=${nombrePersonaje}`);
    return data;
  } catch (error) {
    throw new Error("Error al filtrar los personajes");
  }
};