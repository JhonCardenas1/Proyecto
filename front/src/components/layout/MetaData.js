import React from "react"
import {Helmet} from 'react-helmet'

//Permite tener titulo en la pagina web
const MetaData = ({title}) => {
    return(
    <Helmet>
        <title>{`${title} - Tienda informatica`}</title>
    </Helmet>
)}
export default MetaData