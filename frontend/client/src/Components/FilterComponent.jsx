import React, { useEffect, useState } from 'react'
import { Box, Checkbox, Stack, Text } from '@chakra-ui/react';
import { useLocation, useSearchParams } from 'react-router-dom';

const FilterComponent = () => {
  const [category] = useState( [
    "football",
    "cricket",
    "badminton",
    "tennis",
    "athletics",
    "boxing",
    "basketball",
    "baseball",
    "hockey",
    "golf",
  ]);
  const [searchParams,setSearchParams] = useSearchParams();
  const [checkedArr, setCheckedArr] = useState([]);

  const handleCheckBoxChange = (event) =>{
    const {value} = event.target;
    const newCategory = [...checkedArr];

    if (newCategory.includes(value)) {
      newCategory.splice(newCategory.indexOf(value), 1);
    } else {
      newCategory.push(value);
    }
    setCheckedArr(newCategory);
  }



  useEffect(() => {
    let params = {
      category:checkedArr,
      name:searchParams.get("name") === "null" ? "" : searchParams.get("name")
    };
    setSearchParams(params);
  }, [checkedArr,setSearchParams]); 
  return (
    <>
    <Box minH={'100vh'} borderLeft='1px solid lightgrey'>
      <Text className='bighead'>Filter</Text>
    <Stack spacing={2} direction={'column'} p={'1rem 2rem'}>
      {category && category.map((ele,index)=>{
        return  <Checkbox className='text' key={index} value={ele} spacing={5} direction='row' onChange={handleCheckBoxChange} colorScheme='whatsapp'>
            {ele}
        </Checkbox>
      })}
    </Stack>
    </Box>
    </>
  )
}

export default FilterComponent