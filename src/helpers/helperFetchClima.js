export const helperFetchClima = async (ciudad) => {
  const urlBase = 'https://api.openweathermap.org/data/2.5/weather'
  const API_Key = 'ee9f833fa04f785176592353e668cd12'

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