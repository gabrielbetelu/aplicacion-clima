export const helperFetchClima = async (ciudad) => {
  const urlBase = import.meta.env.VITE_urlBase;
  const API_Key = import.meta.env.VITE_API_Key;

  try {
    const response = await fetch(`${urlBase}?q=${ciudad}&appid=${API_Key}`)
    const data = await response.json()
  
    if (data.cod && data.cod !== '404') {
      return {data , cityError:null};
    } else {
      return {data:null, cityError:'Ciudad NO ENCONTRADA'}
    }
          
    } catch (error) {
    console.log('Ocurrió el siguiente error: ', error)
    return {cityError:'Error al obtener los datos del clima'}
  }
}