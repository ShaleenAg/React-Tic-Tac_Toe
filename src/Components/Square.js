import React , {useState} from 'react'

export const Square = (props)=>{
    const style = {}
    //console.log(props)
    return (
        <button className = {props.className}  onClick = {props.onClick}>
        {props.value}
        </button>
        )
}