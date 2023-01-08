import React, { Fragment, useEffect } from 'react'
import {MDBDataTable} from "mdbreact"

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../../actions/productActions'

import MetaData from '../layout/MetaData'
import Sidebar from './Sidebar'


export const ProductList = () => {

    const {loading, productos, error} = useSelector (state => state.products)
    const alert =useAlert();

    const dispatch =useDispatch();
    useEffect(()=> {
        if (error){
            return alert.error(error)
        }

        dispatch(getProducts());    
    }, [dispatch])

    const setProducts = () => {
        const data = {
            columns: [
                {
                    label: 'Nombre',
                    field: 'nombre',
                    sort: 'asc'
                },
                {
                    label: 'Precio',
                    field: 'precio',
                    sort: 'asc'
                },
                {
                    label: 'Inventario',
                    field: 'inventario',
                    sort: 'asc'
                },
                {
                    label: 'Vendedor',
                    field: 'vendedor',
                    sort: 'asc'
                },
            ],

            rows:[]
        }

        productos.forEach(product => {
            data.rows.push({
                nombre: product.nombre,
                precio: `$${product.precio}`,
                inventario: product.inventario,
                vendedor: product.vendedor,
            })
        })

        return data;
    }

  return (
    <Fragment>
         <MetaData Title={"Todos los productos"}></MetaData>
        <div className='row'>
            <div className='col-12 col-md-2'>
                <Sidebar/>
            </div>
            <div className='col-12 col-md-10'>
                <Fragment>
                    <h1 className='my-5'>Productos Registrados</h1>
                    {loading ? <i class="fa fa-refresh fa-spin fa-3x fa-fw"></i> : (
                            <MDBDataTable
                                data={setProducts()}
                                className="px-3"
                                bordered
                                striped
                                hover
                            />   
                   )}
                </Fragment>
            </div>
        </div>
    </Fragment>
  )
}

export default ProductList

