import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {server} from '../index'
import { Container, HStack, VStack, Image, Heading, Text } from '@chakra-ui/react'

import Loader from './Loader.jsx'
import { hover } from '@testing-library/user-event/dist/hover'
import ErrorComponent from './ErrorComponent'
const Exchange = () => {
    const [exchanges, setExchanges] = useState([]);
    const [loading, setLoading] =useState(true);
    const [error, setError] = useState(false)
    useEffect(() => {
        const fetchExchanges = async() => {
            try {
                const {data} = await axios.get(`${server}/exchanges`);
                setExchanges(data);
                setLoading(false);
            }catch(e) {
                setError(true);
                setLoading(false);
            }
        }
        fetchExchanges();
    }, []);
    if(error) 
        return <ErrorComponent message = {"Error while fetching Exchange..."} />
    return (
      <Container maxW={'container.xl'}>
        {
            loading? <Loader /> : <>
                <HStack wrap={'wrap'} justifyContent={'space-evenly'}> 
                    {exchanges.map((item) => (
                          <ExchangeCard
                            key={item.id}
                            name ={item.name}
                            imgSrc = {item.image} 
                            rank={item.trust_score_rank}
                            url = {item.url}
                          />
                    ))}
                </HStack>
            </>
        }
      </Container>
    )
}

const ExchangeCard = ({name,imgSrc,rank,url}) => (
    <a href={url} target={"blank"}>
        <VStack
         w={'52'} shadow={'lg'} p={'8'}
         borderRadius={'lg'}
         transition={'all 0.3s'}
         m={'4'}
         css = {{
            "&:hover": {
                transform: "scale(1.1)"
            }
         }}
        >
            <Image
             src = {imgSrc}
             w={'10'}
             h={'10'}
             objectFit={'contain'}
             alt={"Exchange"}
            />
            <Heading size={"md"}>{rank}</Heading>
            <Text noOfLines={1}>{name}</Text>
        </VStack>
    </a>
)
export default Exchange