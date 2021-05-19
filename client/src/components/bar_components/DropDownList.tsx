import React, { useRef, useEffect, useState } from 'react';
import {
  Button,
  ClickAwayListener,
  createStyles,
  Grow,
  makeStyles,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Theme,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import Popup from '../Popup';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    paper: {
      marginRight: theme.spacing(2),
    },
  })
);

interface DropDownListProps {
  listItems?: string[];
  openPopup: boolean;
  setOpenPopup: React.Dispatch<React.SetStateAction<boolean>>;
  childrens?: React.ReactNode[];
  children: React.ReactNode;
}

const DropDownList: React.FC<DropDownListProps> = ({
  listItems,
  openPopup,
  setOpenPopup,
  childrens,
  children,
}: DropDownListProps) => {
  const classes = useStyles();
  const anchorRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  //const [openPopup, setOpenPopup] = useState<boolean>(false);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: React.MouseEvent<EventTarget>) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }
    setOpen(false);
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }
    prevOpen.current = open;
  }, [open]);

  return (
    <div>
      <Button
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <MenuIcon style={{ color: 'white' }}></MenuIcon>
      </Button>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="menu-list-grow"
                  onKeyDown={handleListKeyDown}
                >
                  {listItems?.map((item, key: number) => (
                    <MenuItem
                      key={key}
                      onClick={() => setOpenPopup(!openPopup)}
                    >
                      {item}
                    </MenuItem>
                  ))}
                  <Popup
                    title="Min Profil"
                    openPopup={openPopup}
                    setOpenPopup={setOpenPopup}
                  >
                    {children}
                  </Popup>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
};

export default DropDownList;
