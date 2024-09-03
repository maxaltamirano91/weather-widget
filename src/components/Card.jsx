import {
  Card,
  CardBody,
  CardFooter,
  Text,
  Image,
  Button,
} from "@chakra-ui/react";

import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { Skeleton, Stack } from "@chakra-ui/react";

import { MapPinHouse } from "lucide-react";

import countryCode from "../countryCode";

function convertKelvinToCelsius(temp) {
  return temp - 273.15;
}

function converTime(timestamp) {
  const sunriseSunsetDate = new Date(timestamp * 1000);
  return sunriseSunsetDate.toLocaleString().split(",")[1].trim();
}

export const Widget = ({ props, handleClick }) => {
  const data = props[0] || {};

  return (
    <Card
      display="flex"
      flexWrap="wrap"
      flexDirection="row"
      justifyContent="center"
      margin="1rem"
      borderRadius="20px"
    >
      <CardBody
        display="flex"
        justifyContent="flex-start"
        flexDirection="column"
      >
        <Text
          fontSize="3xl"
          display="flex"
          justifyContent="center"
          margin="2px"
        >
          {data?.name}
        </Text>

        <CardBody
          border="2px solid black"
          borderRadius="20px"
          margin="10px"
          display="flex"
          justifyContent="flex-start"
          flexDirection="row"
        >
          <CardBody
            display="flex"
            justifyContent="flex-start"
            flexDirection="column"
          >
            {data.weather?.map((el) => {
              return (
                <div key={el.code}>
                  <Image
                    borderRadius="lg"
                    width="150px"
                    src={`http://openweathermap.org/img/wn/${el?.icon}@2x.png`}
                    alt="Weather Icon"
                  />
                  <Text fontSize="2xl">{el?.main} || "Weather Main" </Text>
                </div>
              );
            })}
            {data.main ? (
              <>
                <Text fontSize="1xl">Hum *{data.main.humidity}</Text>
                <Text fontSize="1xl">
                  Tem * {convertKelvinToCelsius(data?.main.temp).toFixed(2)}
                </Text>
              </>
            ) : (
              <Stack>
                <Skeleton height="20px" />
                <Skeleton height="20px" />
                <Skeleton height="20px" />
              </Stack>
            )}
          </CardBody>
          <CardBody>
            {data.main ? (
              <Stack spacing={4}>
                <Text fontSize="1xl">
                  Min * {convertKelvinToCelsius(data?.main.temp_min).toFixed(2)}
                </Text>
                <Text fontSize="1xl">
                  Max * {convertKelvinToCelsius(data?.main.temp_max).toFixed(2)}
                </Text>
                <Text>Hum *{data?.main.humidity}</Text>
                <Text>Wind: {data?.wind.speed}</Text>
                <Text>Sunrise: {converTime(data?.sys.sunrise)}</Text>
                <Text>Sunset: {converTime(data?.sys.sunset)}</Text>
              </Stack>
            ) : (
              <Stack>
                <Skeleton height="20px" />
                <Skeleton height="20px" />
                <Skeleton height="20px" />
              </Stack>
            )}
          </CardBody>
        </CardBody>
      </CardBody>

      <CardFooter
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="space-evenly"
      >
        <Menu>
          <MenuButton
            as={Button}
            colorScheme="teal"
            variant="outline"
            border="2px"
            borderColor="green.500"
            margin="10px"
          >
            Select City
          </MenuButton>
          <MenuList maxHeight="300px" overflowY="auto">
            {countryCode.map((el) => (
              <MenuItem key={el.name} onClick={() => handleClick(el.name)}>
                {el.name}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
        <MapPinHouse color="#74026a" size={48} />
      </CardFooter>
    </Card>
  );
};
