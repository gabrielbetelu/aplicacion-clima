import React, { useState , useRef , useEffect } from 'react'
import { helperFetchClima } from './helpers/helperFetchClima'


export const WheatherApp = () => {

/* Estas variables las incorporo al Helper helperFetchClima,js 
  const urlBase = 'https://api.openweathermap.org/data/2.5/weather'
  const API_Key = 'ee9f833fa04f785176592353e668cd12'
*/

  const [ciudad, setCiudad] = useState('')
  const [dataClima, setDataClima] = useState(null)
  const inputRef = useRef(null); // Referencia para el input
  const [cargando, setCargando] = useState(false); // Estado para controlar si se está cargando la información
  const [error, setError] = useState(null); // Estado para controlar el error

  useEffect(() => {
    // Enfocar el input al renderizar por primera vez
    inputRef.current.focus();
  }, []); // El array vacío indica que este efecto se ejecuta solo una vez al montar el componente

  const handleCambioCiudad = (e) => {
    setCiudad(e.target.value)
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
  //  console.log("Hiciste Submit")
    setDataClima(null) // Limpia el div con la información de la busqueda anterior
    if(ciudad.length > 0) {

      setCargando(true); // Activar el estado de carga
      setError(null); // Limpiar el error previo

      const {data , cityError} = await helperFetchClima(ciudad);
      setDataClima(data);
      setError(cityError)

      setCiudad('');// Limpiar el input después de enviar el formulario
      inputRef.current.focus(); // Enfocar el input después de limpiarlo
      setCargando(false); // Desactivar el estado de carga
    } 
  }

/*  Lo reemplazo por un Helper
  const fetchClima = async () => {
    try {
      const response = await fetch(`${urlBase}?q=${ciudad}&appid=${API_Key}`)
      const data = await response.json()
      if (data.cod && data.cod !== '404') {
        setDataClima(data);
      } else {
        setError('Ciudad NO ENCONTRADA');
      }
    } catch (error) {
      console.log('Ocurrió el siguiente error: ', error)
      setError('Error al obtener los datos del clima');
    }
  }
*/

  return (

    <React.Fragment>
      <div className="container">
        <h1>Aplicación del clima</h1>
        <form onSubmit={handleSubmit}>
          <input 
            placeholder='Ingrese ciudad'
            type="text"
            value={ciudad}
            onChange={handleCambioCiudad}
            ref={inputRef} // Asignar la referencia al input
          />
          <button type='submit'>Buscar</button>
        </form>  
        {cargando && <p className="searching">Cargando datos...</p>} {/* Mostrar mensaje de carga si se está cargando */}
        {error && <p className="cityError" >{error}</p>} {/* Mostrar mensaje de error si existe */}
        { 
          dataClima && !error && (
            <div>
              <h2 className="cityStyle">{dataClima.name}</h2>
                <img src={`https://openweathermap.org/img/wn/${dataClima.weather[0].icon}@2x.png`} alt="MDN" />
      
          {/*     <p>Icono: {dataClima.weather[0].icon}</p>
          */}
              <p>Temperatura : {(dataClima.main.temp-273.15).toFixed(1)} °C</p>
              <p>Condición meteorológica: {dataClima.weather[0].description}</p>
            </div>
          )
        }    
      </div>
    </React.Fragment>
    
  )
}
