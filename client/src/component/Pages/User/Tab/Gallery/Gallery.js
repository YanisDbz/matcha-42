import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

const useStyles = makeStyles((theme) => ({
	gridList: {
		width: 500,
		height: 450,
    },
}));


export default function Gallery({user}){
    const classes = useStyles();
    const tileData = [
        {
           img: user.imgprofil,
           id: 1,
           title: 'Image',
           author: 'author',
        },
        {
          img: user.imgprofil,
          id: 2,
          title: 'Image',
          author: 'author',
       },
       {
          img: user.imgprofil,
          id: 3,
          title: 'Image',
          author: 'author',
       },
       {
          img: user.imgprofil,
          id: 4,
          title: 'Image',
          author: 'author',
       }
    ];
    return(
        <div>
            <GridList cellHeight={160} className={classes.gridList}>
                <GridListTile key="Subheader" cols={2} style={{height: 'auto' }}>
                </GridListTile>
                {tileData.map((tile) => (
                <GridListTile key={tile.id}>
                    <img src={tile.img} alt={tile.title} />
                </GridListTile>
                ))}
            </GridList>
        </div>
    )
}