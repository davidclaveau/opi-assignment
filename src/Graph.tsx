import React from 'react'

interface Props {
  data:string; 
}

const Graph = (props: Props) => {
  return (
    <div>
      A button to show some graphs.
      {props.data}
    </div>
  )
}

export default Graph
