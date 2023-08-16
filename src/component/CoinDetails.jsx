import {
  Container,
  Box,
  Button,
  Text,
  Image,
  HStack,
  VStack,
  RadioGroup,
  Radio,
  Stat,
  StatLabel,
  StatNumber,
  StatArrow,
  StatHelpText,
  Badge,
  Progress
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import Loader from './Loader';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { server } from '../index';
import ErrorComponent from './ErrorComponent';
import Chart from './Chart.jsx'

const CoinDetails = () => {
  const [coin, setCoin] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState('inr');
  const [days, setDays] = useState("24h");
  const [chartArray, setChartArray] = useState([])
  const params = useParams();
  const currencySymbol = (currency === 'inr' ? '₹' : (currency === 'eur' ? '€' : '$'));

  const btns = ['24h','7d','14d','30d','60d','200d','365d','max'];
  const switchChartStack = (key) => {
      setDays(key);
      setLoading(true);
  }
  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const { data } = await axios.get(`${server}/coins/${params.id}`);
        const {data:chartData}  =  await axios.get(
          `${server}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`);
        setChartArray(chartData.prices)
        setCoin(data);
        setLoading(false);
      } catch (error) {
        setError(true)
        setLoading(false);
      }
    }
    fetchCoin();
  }, [params.id,currency,days])
  if (error)
    return <ErrorComponent message={"Error while fetching Coin Details..."} />
  return (
    <Container maxW={'container.xl'}>
      {
        loading ? <Loader /> : <>
          <Box w={'full'} borderWidth={1} >
            <Chart arr= {chartArray} currency ={currencySymbol} days={days} />
          </Box>
          
          <HStack p={'4'} wrap={'wrap'}>
            {
              btns.map((i) => (
                <Button onClick={() => switchChartStack(i)}>{i}</Button>
              ))
            }
          </HStack>

          <RadioGroup value={currency} onChange={setCurrency} p={'8'}>
            <HStack spacing={'4'} justifyContent={'center'}>
              <Radio value={'inr'}>₹</Radio>
              <Radio value={'eur'}>€</Radio>
              <Radio value={'usd'}>$</Radio>
            </HStack>
          </RadioGroup>

          <VStack>
            <Text fontSize={"small"} alignSelf={'center'} opacity={0.7}>
              Last Updated On {Date(coin.market_data.last_updated).split("G")[0]}
            </Text>
            <Image src={coin.image.large} w={'16'} h={'16'} objectFit={"contain"} />
            <Stat>
              <StatLabel>{coin.name}</StatLabel>
              <StatNumber>
                {currencySymbol}
                {coin.market_data.current_price[currency]}
              </StatNumber>
              <StatHelpText>
                <StatArrow type={
                  coin.market_data.price_change_percentage_24h > 0 ? "increase" : "decrease"
                } />
                {coin.market_data.price_change_percentage_24h}
              </StatHelpText>
            </Stat>
            <Badge
              fontSize={'2xl'}
              bgColor={'blackAlpha.800'}
              color={'white'}
            >{`#${coin.market_cap_rank}`}
            </Badge>
            <CustomBar
              high={`${coin.market_data.high_24h[currency]}`}
              low={`${coin.market_data.low_24h[currency]}`}
            />
            <Box>
              <Item
                title={"Max Supply"}
                value={coin.market_data.max_supply}
              />
              <Item
                title={"Circulating Supply"}
                value={coin.market_data.circulating_supply}
              />
              <Item
                title={"Market Cap"}
                value={`${currencySymbol}${coin.market_data.market_cap[currency]}`}
              />
              <Item
                title={"All Time Low"}
                value={`${currencySymbol}${coin.market_data.atl[currency]}`}
              />
              <Item
                title={"All Time High"}
                value={`${currencySymbol}${coin.market_data.ath[currency]}`}
              />
            </Box>
          </VStack>
        </>
      }
    </Container>
  )
}

const Item = ({ title, value }) => (
  <HStack justifyContent={"space-evenly"}
    w={"full"}
    my={'4'}
  >
    <Text>{title}</Text>
    <Text>{value}</Text>
  </HStack>
)
// Range value
const CustomBar = ({ high, low }) => (
  <VStack w={'full'} h={'10vh'}>
    <Progress value={50} colorScheme={'teal'} w={"full"} />
    <HStack justifyContent={'space-between'} w="full">
      <Badge children={low} colorScheme={'red'} />
      <Text fontSize={"sm"}>24H Range</Text>
      <Badge children={high} colorScheme={'green'} />
    </HStack>
  </VStack>
)
export default CoinDetails; 