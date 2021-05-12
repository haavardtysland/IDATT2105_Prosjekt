import React, { ChangeEvent, Fragment, useState } from 'react';
import { TextField } from '@material-ui/core';
import styled from 'styled-components';
import Filter from './Filter'; 

const FilterContainer = styled.div`
  width:20%; 
  margin-top:60px; 
`;

const SideBar = () => {
  const [search, setSearch] = useState<string>('');

  const onChangeSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch((event.target as HTMLInputElement).value);
  };
  return (
    <FilterContainer>
      <TextField
        style={{ width: '100%'}}
        id="standard-basic"
        label="Search"
        onChange={onChangeSearch}
      />
      <Filter headline="Pris" minValue={0} maxValue={1500000}  ></Filter>
      <Filter headline="Årsmodell" minValue={2010} maxValue={2021}></Filter>
      <Filter headline="Kilometerstand" minValue={0} maxValue={800000}></Filter>
    </FilterContainer>
  );
};

export default SideBar;
