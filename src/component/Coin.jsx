import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Container, VStack, HStack, Button,RadioGroup, Radio } from '@chakra-ui/react';

import { server } from '../index'

import Loader from './Loader';
import ErrorComponent from './ErrorComponent';
import CoinCard from './CoinCard';

const Coin = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState('inr')

  const currencySymbol = (currency === 'inr'? '₹' : (currency === 'eur'? '€' :'$'));
  const changePage = (page) => {
    setPage(page)
    setLoading(true)
  }

  const btns = new Array(132).fill(1);
  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const { data } = await axios.get(`${server}/coins/markets?vs_currency=${currency}&page=${page}`);
        console.log(data);
        setCoins(data);
        setLoading(false);
      } catch (e) {
        setError(true);
        setLoading(false);
      }
    }
    fetchCoins();
  }, [currency,page]);
  if(error) 
        return <ErrorComponent message = {"Error while fetching Exchange..."} />
  return (
    <Container maxW={'container.xl'}>
      {
        loading ? <Loader /> : <>

          <RadioGroup value={currency} onChange={setCurrency} p={'8'}>
            <HStack spacing={'4'} justifyContent={'center'}>
              <Radio value={'inr'}>₹</Radio>
              <Radio value={'eur'}>€</Radio>
              <Radio value={'usd'}>$</Radio>
            </HStack>
          </RadioGroup>
          <HStack wrap={'wrap'} justifyContent={'space-evenly'}>
            {coins.map((coin) => (
              <CoinCard key={coin.id} id={coin.id} name={coin.name} img={coin.image} price={coin.current_price} currencySymbol = {currencySymbol}/>
            ))}
          </HStack>
          <HStack
           w={'full'}
           overflowX={'auto'}
           p={'8'}
          >
            {btns.map((item, index) => (
              <Button
                backgroundColor={'blackAlpha.900'}
                color={'white'}
                onClick = {() => changePage(index + 1)}
                >
                {index + 1}
              </Button>
            ))}
          </HStack>
        </>
      }
    </Container>
  )
}

export default Coin


