import React, {useState, useEffect} from 'react';
import Cookie from "js-cookie"
import axios from "axios"
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { Link } from 'react-router-dom';
import socketIOClient from "socket.io-client";

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);

const drawerWidth = 240;
 
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    background: 'linear-gradient(to right, #c31432, #240b36)',
    zIndex: theme.zIndex.drawer + 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbarButtons: {
    marginLeft: 'auto',
  },

  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  closeMenuButton: {
    marginRight: 'auto',
    marginLeft: 0,
  },
  slider: {
    width: '200px',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
}));
function ResponsiveDrawer({
  filter,
  setFilter,
  distanceSort,
  setDistanceSort,
  fameSort,
  setFameSort,
  interestSort,
  setInterestSort,
  ageSort,
  setAgeSort,
  user
}) {
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notif, setNotif] = useState(false);
  const socket = socketIOClient("http://localhost:8081")
  function handleDrawerToggle() {
      setMobileOpen(!mobileOpen)
  }

  useEffect(() => {
    const getNotif = async () => {
        socket.on('get_notif', (data) => {
            if(data.for === user.id){
               if(data.type === "like"){
                   setNotif({
                       type: data.type,
                       from:  data.from
                   })
               }
            }
        })
    }
    getNotif()
}, [notif])

  const handleLogout = (e) => {
    e.preventDefault();
    axios.post('/auth/logout').then((res) => {
      if(res.data.success === true ){
        socket.on('disconnect')
        Cookie.remove("login")
        window.location = "/"
      }
    })
  }

  const changeAge = (value) => {
    setFilter({ ...filter, age: value });
  };

 const changeDistance = (value) => {
    setFilter({ ...filter, km: value });
  };
  const SortByAge = () => {
    setDistanceSort({ value: null });
    setFameSort({ value: null });
    setInterestSort({ value: null });
    if (ageSort.value === null) setAgeSort({ value: "asc" });
    if (ageSort.value === "asc") setAgeSort({ value: "desc" });
    else if (ageSort.value === "desc") setAgeSort({ value: "asc" });
  };

  const SortByDistance = () => {
    setAgeSort({ value: null });
    setFameSort({ value: null });
    setInterestSort({ value: null });
    if (distanceSort.value === null) setDistanceSort({ value: "asc" });
    if (distanceSort.value === "asc") setDistanceSort({ value: "desc" });
    else if (distanceSort.value === "desc") setDistanceSort({ value: "asc" });
  };

  const SortByFame = () => {
    setAgeSort({ value: null });
    setDistanceSort({ value: null });
    setInterestSort({ value: null });
    if (fameSort.value === null) setFameSort({ value: "asc" });
    if (fameSort.value === "asc") setFameSort({ value: "desc" });
    else if (fameSort.value === "desc") setFameSort({ value: "asc" });
  };

  const SortByInterest = () => {
    setAgeSort({ value: null });
    setDistanceSort({ value: null });
    setFameSort({ value: null });
    if (interestSort.value === null) setInterestSort({ value: "asc" });
    if (interestSort.value === "asc") setInterestSort({ value: "desc" });
    else if (interestSort.value === "desc") setInterestSort({ value: "asc" });
  };

  /*const filterInterest = (tag) => {
    setTagsSort(tagsSort.map((x) => (x.name === tag.name ? (tag.actif === 0 ? { ...x, actif: 1 } : { ...x, actif: 0 }) : x)));
  };*/
const drawer = (
  <>
    <div>
      <Typography align="center" gutterBottom>
          Sort By
      </Typography>
      <Button variant="outlined" color="secondary" onClick={SortByAge}>AGE</Button>
      <Button variant="outlined" color="secondary" onClick={SortByInterest}>TAGS</Button>
      <Button variant="outlined" color="secondary" onClick={SortByFame}>FAME</Button>
      <Button variant="outlined" color="secondary" onClick={SortByDistance}>DISTANCE</Button>
    </div>
    <div className={classes.slider} >
    <Typography align="center" gutterBottom>
        Age: {filter.age[0]} à {filter.age[1]} ans
    </Typography>
    <Range
          min={18}
          allowCross={false}
          value={filter.age}
          marks={{ 18: 18, 100: 100 }}
          tipFormatter={(value) => `${value} ans`}
          onChange={changeAge}
    />
    </div>
    <div className={classes.slider}>
      <Typography align="center" gutterBottom>
          Distance: {filter.km} km
      </Typography>
      <Slider
            min={1}
            max={800}
            step={1}
            value={filter.km}
            marks={{ 1: 1, 800: 800 }}
            tipFormatter={(value) => `${value} km`}
            onChange={changeDistance}
          />
    </div>
   {/* <div>
      <Typography align="center" gutterBottom> By Tags : </Typography>
        {tagsSort.map((tag, index) => (
              <Button
                variant={tag.actif === 1 ? "outlined" : "contained"} 
                color="secondary"
                key={index}
                value={tag.value}
                name={tag.name}
                actif={tag.actif}
                onClick={(e) => filterInterest(tag)}
              >
                {tag.name}
              </Button>
            ))}
        </div> */}
  </>
  );
return (
    <div className={classes.root}> 
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Match And Date
          </Typography>
          <div className={classes.toolbarButtons}>
            <Button component={Link} to="/profile" color="inherit">Profile</Button>
            <Button onClick={handleLogout}  color="inherit">Logout</Button>
          </div>
        </Toolbar>
      </AppBar>
      
      <nav className={classes.drawer}>
        <Hidden smUp implementation="css">
          <Drawer
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            <IconButton onClick={handleDrawerToggle} className={classes.closeMenuButton}>
              <CloseIcon/>
            </IconButton>
            {drawer}
          </Drawer>
        </Hidden>
<Hidden xsDown implementation="css">
          <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <div className={classes.toolbar} />
            {drawer}
          </Drawer>  
        </Hidden>
      </nav>
    </div>
  );
}

ResponsiveDrawer.propTypes = {
   container: PropTypes.object,
};
export default ResponsiveDrawer;