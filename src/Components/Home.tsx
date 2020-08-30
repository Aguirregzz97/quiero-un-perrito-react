import * as React from 'react'
import { useState, useEffect } from 'react'
import { UserModel } from '../shared/DataTypes'
import { RestApi } from '../shared/RestApi'
import { useCurrentUser } from '../shared/UserHelper'

export default function Home() {

    useEffect(() => {
        console.log(process.env.REACT_APP_API_KEY)
    })

    return (
        <div>
            <h1>Bienvenido a quiero a un perrito</h1>
        </div>
    )
}