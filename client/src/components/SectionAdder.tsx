import { Button, TextField } from '@material-ui/core';
import React, { ChangeEvent, Fragment, useEffect, useState } from 'react';
import styled from 'styled-components';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
const Container = styled.div``;
const AddLine = styled.div`
  display: flex;
  border-bottom: 1px solid black;
`;

const Flex = styled.div`
  display: flex;
  margin-top: 1rem;
`;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    textField: {
      marginBottom: theme.spacing(1),
    },
    button: {
      marginBottom: theme.spacing(1),
    },
  })
);

interface Section {
  section_name: string;
  capacity: number;
}

interface Props {
  sectionsChange: (sections: Section[]) => void;
}

function SectionAdder({ sectionsChange }: Props) {
  const classes = useStyles();
  const [capacity, setCapacity] = useState<number>();
  const [name, setName] = useState<string>();
  const [sections, setSections] = useState<Section[]>([]);

  useEffect(() => {
    sectionsChange(sections);
  }, [sections]);

  const onChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    setName((event.target as HTMLInputElement).value);
  };

  const onChangeCapacity = (event: ChangeEvent<HTMLInputElement>) => {
    setCapacity(parseInt((event.target as HTMLInputElement).value));
  };

  const addSection = () => {
    if (name && capacity) {
      const len: number = sections.filter(
        (sec) => sec.section_name == name
      ).length;
      if (len == 0) {
        const section: Section = { section_name: name, capacity: capacity };
        setSections(sections.concat(section));
        setName('');
      } else {
        alert('Seksjonene må ha forskjellig navn');
      }
    } else {
      alert('Fyll ut begge felt');
    }
  };

  const deleteSection = (sec: Section) => {
    const newList = sections.filter(
      (section) => section.section_name !== sec.section_name
    );
    console.log(newList);
    setSections(newList);
  };

  return (
    <Container>
      <AddLine>
        <TextField
          value={name}
          style={{ width: '70%', marginRight: '1rem' }}
          variant="outlined"
          className={classes.textField}
          id="standard-number"
          label="Navn"
          onChange={onChangeName}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          value={capacity}
          style={{ width: '30%' }}
          variant="outlined"
          className={classes.textField}
          label="Kapasitet"
          type="number"
          onChange={onChangeCapacity}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Button className={classes.button} onClick={addSection}>
          <AddIcon />
        </Button>
      </AddLine>
      {sections.map((sec, index) => (
        <Flex key={index}>
          <TextField
            defaultValue={sec.section_name}
            style={{ width: '70%', marginRight: '1rem' }}
            variant="outlined"
            className={classes.textField}
            id="standard-number"
            label="Navn"
            disabled={true}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            defaultValue={sec.capacity}
            disabled={true}
            style={{ width: '30%' }}
            variant="outlined"
            className={classes.textField}
            label="Kapasitet"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Button className={classes.button} onClick={() => deleteSection(sec)}>
            <DeleteIcon />
          </Button>
        </Flex>
      ))}
    </Container>
  );
}

export default SectionAdder;
