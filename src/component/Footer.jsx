import React from 'react';
import { Box, Stack,VStack,Avatar,Text } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Box
     bgColor={"blackAlpha.900"}
     color={"whiteAlpha.700"}
     minH={"48"}
     px={"16"}
     py={["16","8"]}
    >
        <Stack
          direction = {['column','row']}
          h = {"full"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
            <VStack>
                <Text fontWeight={"bold"}>About Us</Text>
                <Text>We are the best crypto trading app in India, we provide our guidance at very cheap price</Text>
            </VStack>
            <VStack>
                <Avatar boxSize={"28"} mt={["4","8"]} />
                <Text>Our Founder</Text>
            </VStack>

        </Stack>
    </Box>
  )
}

export default Footer