const getDayOfWeek = (id: number): string => {
  let str = '';
  switch (id) {
    case 0: {
      str = 'Søndag';
      break;
    }
    case 1: {
      str = 'Mandag';
      break;
    }
    case 2: {
      str = 'Tirsdag';
      break;
    }
    case 3: {
      str = 'Onsdag';
      break;
    }
    case 4: {
      str = 'Torsdag';
      break;
    }
    case 5: {
      str = 'Fredag';
      break;
    }
    case 6: {
      str = 'Lørdag';
      break;
    }
  }
  return str;
};

export default getDayOfWeek;
