import React, { Fragment } from 'react'
import MetaData from '../layout/MetaData'

export const ProductsDetails = () => {
  return (
    <Fragment>
        <MetaData title="Memoria Ram"></MetaData>
        <div className='row d-flex justify-content-around'>
            <div className='col-12 col-lg-5 img-fliud' id='imagen_producto'>
                <img src="../../images/productos/Memoria_Ram.jpg" alt="Memoria_computador"height="450" width="450"></img>
            </div>
            
            <div className='col-12 col-lg-5 mt-5'>
                <h3>Memoria ram para computador</h3>
                <p id="product_id">Product # 1243234</p>
                
            </div>
        </div>
    </Fragment>
  )
}


