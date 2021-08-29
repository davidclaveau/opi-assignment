import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

interface Props {
  onChange: any;
}

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(.5),
  },
}));

const Units = (props: Props) => {
  const classes = useStyles();

  return (
    <div className="settings-container">
      <Button className={classes.button} variant="contained" color="primary" disableElevation onClick={() => props.onChange("celsius")}>
        &#176;C
      </Button>
      <Button className={classes.button} variant="contained" color="primary" disableElevation onClick={() => props.onChange("farenheit")}>
        &#176;F
      </Button>
    </div>
  )
}

export default Units
