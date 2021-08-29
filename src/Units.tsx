import { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

interface Props {
  onChange: any;
}

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(.5),
  },
  selected: {
    backgroundColor: "green",
  }
}));

const Units = (props: Props) => {
  const classes = useStyles();
  const [celsiusSelected, setCelsiusSelected] = useState(true)
  const [fahrenheitSelected, setFahrenheitSelected] = useState(false)

  // Toggle which button is highlighted on click
  // Material-UI drawback: difficulty adding style that overrides default
  const buttonClick = (unit:string | undefined) => {
    if (unit === "celsius")  {
      setCelsiusSelected(true)
      setFahrenheitSelected(false)
    }
    if (unit === "fahrenheit")  {
      setFahrenheitSelected(true)
      setCelsiusSelected(false)
    }
    props.onChange(unit)
  }

  return (
    <div className="settings-container">
      <Button className={`${classes.button} ${celsiusSelected? classes.selected : ""}`} variant="contained" color="primary" disableElevation onClick={() => buttonClick("celsius")}>
        &#176;C
      </Button>
      <Button className={`${classes.button} ${fahrenheitSelected? classes.selected : ""}`} variant="contained" color="primary" disableElevation onClick={() => buttonClick("fahrenheit")}>
        &#176;F
      </Button>
    </div>
  )
}

export default Units
