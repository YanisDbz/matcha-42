import React, { useState } from 'react'
import ModalEdit from './EditProfil/ModalEditProfil'
import Settings from './EditProfil/Settings/Settings'
import { makeStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import TagUser from './Tags/Tag';
import HistoryLike from './History/HistoryLike'
import HistoryBlcok from './History/HistoryBlock'
function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`scrollable-auto-tabpanel-${index}`}
        aria-labelledby={`scrollable-auto-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            {children}
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `scrollable-auto-tab-${index}`,
      'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
  }

const useStyles = makeStyles((theme) => ({
	paper: {
        textAlign: 'center',
        color: '#fff',
		backgroundColor: '#333'
    },
    root: {
      [theme.breakpoints.down("xs")]: {
        maxWidth: "100%",
        width: "100%"
      },
      flexGrow: 1,
      height: '100%',
      color: '#fff',
      backgroundColor: '#333'
    },
    color: {
        textAlign: 'center',
        color: '#fff',
        backgroundColor: '#333'
    },
}));

export default function TabUser({user, userImg}){
    const classes = useStyles();
    const [value, setValue] = useState(0);
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setValue(0)
    };

    const handleChange = (event, newValue) => {
		setValue(newValue);
    };
    return(
        <React.Fragment>
            <ModalEdit userImg={userImg} user={user} open={open} handleClose={handleClose}/>
        <div className={classes.root}>
            <AppBar position="static" color="default">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="secondary"
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="scrollable auto tabs example"
                    className={classes.color}
                >
                    <Tab label="My Match" {...a11yProps(0)} />
                    <Tab label="Liked People" {...a11yProps(1)} />
                    <Tab label="Blocked People" {...a11yProps(2)} />
                    <Tab label="Tags" {...a11yProps(3)} />
                    <Tab label="Edit Profil" {...a11yProps(4)} onClick={handleOpen} />
                    <Tab label="Profil Settings" {...a11yProps(5)} />
                    
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                   No Match anymor
            </TabPanel>
            <TabPanel value={value} index={1}>
                    <HistoryLike/>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <HistoryBlcok/>
            </TabPanel>
            <TabPanel value={value} index={3}>
                <TagUser/>
            </TabPanel>
            <TabPanel value={value} index={5}>
                <Settings user={user}/>
            </TabPanel>
            
        </div>
        </React.Fragment>
        )
}


/* 
 <React.Fragment>
                <ModalEdit userImg={userImg} user={user} open={open} handleClose={handleClose}/>
                <TabContext value={value}>
                    <Paper square className={classes.paper}>
                    <TabList onChange={handleChange} aria-label="simple tabs example">
                        <Tab icon={<FavoriteIcon />} label="Recents Liked" value="1" />
                        <Tab icon={<EditIcon />} label="Edit Profile" value="2" onClick={handleOpen}/>
                    </TabList>
                    </Paper>
                    <TabPanel value="1">
                        Recents Liked
                    </TabPanel>
                </TabContext>
            </React.Fragment>
*/