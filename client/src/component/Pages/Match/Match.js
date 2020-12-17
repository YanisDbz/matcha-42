import React,{useState, useEffect} from "react";
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import UserCard from './Cards';
import Loading from "../../Loading/Loading";
import Drawer from '../../Navigation/Drawer'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingTop: '5%',
    margin: '0',
    width: '100%'
  },
  drawer: {
    backgroundColor: '#333',
    width: '250px',
    marginTop: '-85px',
  },
  filter:{
    position: 'fixed',
    display: 'flex',
    flexDirection: 'column',
    width: '230px'
  }
}));


export default function MatchPage({user}){
  const classes = useStyles();

  const [characters, setCharacters] = useState([])
  const [filter, setFilter] = useState({ age: [18, 100], km: 800 });
  const [ageSort, setAgeSort] = useState({ value: null });
  const [interestSort, setInterestSort] = useState({ value: null });
  const [distanceSort, setDistanceSort] = useState({ value: null });
  const [fameSort, setFameSort] = useState({ value: null });
  const [tagsSort, setTagsSort] = useState([
    { name: "Music", value: 1, actif: 1 },
    { name: "Sport", value: 2, actif: 1 },
    { name: "Games", value: 3, actif: 1 },
    { name: "Animals", value: 4, actif: 1 },
    { name: "Party", value: 5, actif: 1 },
    { name: "Arts", value: 6, actif: 1 },
    { name: "Movies", value: 7, actif: 1 },
    { name: "Travels", value: 8, actif: 1 },
    { name: "Cooking", value: 9, actif: 1 },
    { name: "Dance", value: 10, actif: 1 },
  ]);

  useEffect(() => {
    const fetchData = async () => {
         try {
          const formData = new FormData();
          formData.append('orientation', user.orientation)
          formData.append('gender', user.gender)
          formData.append('filterAge', filter.age)
          formData.append('filterDistance', filter.km)
          formData.append('tagsSort', tagsSort)
          formData.append('ageSort', ageSort.value)
          formData.append('interestSort', interestSort.value)
          formData.append('fameSort', fameSort.value)
          formData.append('distanceSort', distanceSort.value)
          formData.append('userLat', user.latitude)
          formData.append('userLon', user.longitude)
           axios.post('/getmatch', formData).then((result) =>{
            if(result.data.success === true) {
              setCharacters(result.data.allprofile)
              console.log(result.data)
            }
          })
         } catch (error) {
            console.log(error)
        }
    }
    fetchData()
 }, [ageSort, tagsSort, interestSort, fameSort, filter, distanceSort])

 return(
     <React.Fragment>
      <Grid container className={classes.root} spacing={3}>
        <Grid item xs={2}>
            <Drawer
              user={user}
              filter={filter}
              setFilter={setFilter}
              tagsSort={tagsSort}
              setTagsSort={setTagsSort}
              setDistanceSort={setDistanceSort}
              distanceSort={distanceSort}
              fameSort={fameSort}
              setFameSort={setFameSort}
              interestSort={interestSort}
              setInterestSort={setInterestSort}
              ageSort={ageSort}
              setAgeSort={setAgeSort}
            />
        </Grid>
        <Grid item xs={10}>
          <Grid style={{ width: '100%', margin: 0}} container justify="center" spacing={4}>
          {characters.length > 0 && characters ? characters.map((value) => (
                 <UserCard key={value.id} user={user} match={value} />
             )) : <Loading/>}
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}
