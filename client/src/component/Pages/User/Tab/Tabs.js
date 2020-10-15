import React, { useState } from 'react'
import ModalEdit from './EditProfil/ModalEditProfil'
import { makeStyles } from '@material-ui/core/styles';
import TabList from '@material-ui/lab/TabList';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import TabContext from '@material-ui/lab/TabContext';
import TabPanel from '@material-ui/lab/TabPanel';
import ImageIcon from '@material-ui/icons/Image';
import FavoriteIcon from '@material-ui/icons/Favorite';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles((theme) => ({
	paper: {
        textAlign: 'center',
        color: '#fff',
		backgroundColor: '#333'
    },
}));

export default function Tabs({user, userImg}){
    const classes = useStyles();
    const [value, setValue] = useState('1');
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setValue('1')
    };

    const handleChange = (event, newValue) => {
		setValue(newValue);
	};
    return(
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
        )
}