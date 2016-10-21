import React, { PropTypes } from 'react'

const style = {
  color: '#0000dd',
  fontSize: 'small',
  fontWeight: 'normal',
}

const Stats = ({subTotal, total}) => (
  <span style={style}>
    {subTotal == undefined? '' :`${subTotal}`}
    {(total == undefined || subTotal == undefined)? '' : ' of '}
    <strong>{total == undefined?'':`${total}`}</strong>
  </span>
)

Stats.propTypes = {
  subTotal: PropTypes.number,
  total: PropTypes.number,
}

export default Stats
