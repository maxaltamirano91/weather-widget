import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getInfo, removeWeather, getCity, removeCity } from "../redux/reducer";
import countryCode from "../countryCode";

import { Widget } from "./Card";

import { Container } from "@chakra-ui/react";

export default function Home() {
  const weather = useSelector((state) => state.weather);

  const ciudadCodigo = useSelector((state) => state.city);

  const dispatch = useDispatch();

  const [data, setData] = useState([]);

  const [city, setCity] = useState({
    ciudad: "",
    code: "",
  });

  const handleClick = (name) => {
    dispatch(removeCity());
    const result = countryCode.filter((item) => item.name === name);

    if (result.length > 0) {
      const { name, country } = result[0];
      setCity({ ciudad: name, code: country });
    } else {
      console.log(" Error");
    }
  };

  useEffect(() => {
    if (city.ciudad && city.code) {
      dispatch(getCity(city));
    }
    handleWeather();
  }, [city]);

  useEffect(() => {
    if (ciudadCodigo.length > 0) {
      handleWeather();
    }
  }, [ciudadCodigo]);

  const handleWeather = async () => {
    dispatch(removeWeather());

    try {
      const city = ciudadCodigo[0].ciudad;
      const country = ciudadCodigo[0].code;
      if (city.length > 0 && country.length > 0) {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=0674856062784cf284a93ba1a191e0df`
        );
        setData(response.data);
        dispatch(getInfo(response.data));
      } else {
        throw new Error("Waiting for city to be chosen");
      }
    } catch (error) {
      throw new Error("Waiting for city to be chosen");
    }
  };

  return (
    <Container maxW="90%" maxH="100%" margin="3%">
      <Widget props={weather} handleClick={handleClick} />
    </Container>
  );
}
