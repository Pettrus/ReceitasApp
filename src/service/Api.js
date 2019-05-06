import { API_KEY } from 'react-native-dotenv';

const url = "https://www.food2fork.com/api/";

export const pesquisarAPI = (query, pagina = 1) => {
    return fetch(`${url}search?key=${API_KEY}&q=${query}&page=${pagina}`)
    .then((response) => response.json())
    .then((json) => {
        return json;
    });
}