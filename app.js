const iptIdPokemon = document.getElementById('iptIdPokemon')
const iptNombrePokemon = document.getElementById('iptNombrePokemon')
const iptBusqueda = document.getElementById('iptBusqueda')
const imgPokemon = document.getElementById('imgPokemon')
const infoPokemon = document.getElementById('infoPokemon')

const proxyUrl = 'https://cors-anywhere.herokuapp.com/';  //Proxy para poder saltar el CORS de localhost

let idActual = 1;

/* -------------------------------------------------------------------------- */
/*                                  FUNCTIONS                                 */
/* -------------------------------------------------------------------------- */

/**
 * Invoca a la api para buscar un pokemon, 
 * @author Luz Vazquez
 *
 * @async 
 * @param term nombre o id
 * @returns Data completa del pokemon
 * [Estructura completa de la data](https://pokeapi.co/) 
 */
const getByIdOrName = async(term) =>{
    const url = `https://pokeapi.co/api/v2/pokemon/${term}`
    try {
        const response = await fetch(proxyUrl + url)
        if(response.ok){
            return response.json()
        }else{
            throw new Error('Pokemon no encontrado')
        }
    } catch (error) {
        throw new Error('Pokemon no encontrado')
    }
}

/**
 * Lanza una alerta
 * @author Luz Vazquez
 * @param message Mensaje que queremos mostrar
 * @param type enum: ['success', 'warning', 'error', 'info', 'neutral']
 */
const showAlert = (message, type) => {
    notie.alert({
      type: type,
      text: message,
      stay: false, 
      time: 2, 
      position: 'bottom' //  enum: ['top', 'bottom']
    })
  }

  /**
 * Obtiene un pokemon por nombre o ID y si lo encuentra rellena los datos en el DOM.
 * @author Luz Vazquez
 * @param term Nombre o ID del pokemon
 * 
 */
const searchPokemon = (term) => {
    if(term == "") {
      showAlert('Escribe el numero del poquemon para poder buscarlo','warning')
      return
    }

    getByIdOrName(term)
      .then(response => {
        idActual = response.id
        iptIdPokemon.value = response.id
        iptNombrePokemon.value = response.name
        imgPokemon.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${response.id}.png` 
        const nombre = `<p><b>Nombre:</b> ${response.name} </p>`
        const grass = `<p><b>Tipo:</b> ${response.types.map(item=>item.type.name)} </p>`
        const stats = `<p><b>Estadisticas:</b> <br>${response.stats.map(item=>`${item.stat.name.toUpperCase()}: ${item.base_stat}<br>`)} </p>`
        console.log(stats)
        infoPokemon.innerHTML= nombre + grass + stats.replace(/<br>,/g, "<br>");
        console.log(response)
      })
      .catch(error => {
        iptIdPokemon.value = 0
        iptNombrePokemon.value = error
        imgPokemon.src = 'https://img.freepik.com/vector-gratis/ups-error-404-ilustracion-concepto-robot-roto_114360-5529.jpg?w=826&t=st=1705527659~exp=1705528259~hmac=2a8326b4161a3fff14eb8e8f4f6d07588f3883d20436bfb5587e1b88a901ea28';
      })
  }

/* -------------------------------------------------------------------------- */
/*                                 FIRST LOAD                                 */
/* -------------------------------------------------------------------------- */
searchPokemon(1)

/* -------------------------------------------------------------------------- */
/*                                   EVENTS                                   */
/* -------------------------------------------------------------------------- */
document.getElementById('btnSearch').addEventListener('click', ()=>{
    searchPokemon(iptBusqueda.value)
})

document.getElementById('btnPrev').addEventListener('click', ()=>{
    if(idActual <=1){
        showAlert('No se encuentra más pokemones', 'error')
        return
    }
    searchPokemon(idActual - 1)
})

document.getElementById('btnNext').addEventListener('click', ()=>{
    if(idActual >=1025){
        showAlert('No se encuentra más pokemones', 'error')
        return
    }
    searchPokemon(idActual + 1)
})

document.getElementById('btnReset').addEventListener('click', ()=>{
    searchPokemon(1)
})