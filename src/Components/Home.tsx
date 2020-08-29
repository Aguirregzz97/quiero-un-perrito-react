import * as React from 'react'
import { useState, useEffect } from 'react'
import { UserModel } from '../shared/DataTypes'
import { RestApi } from '../shared/RestApi'

export default function User() {

    const [user, setUser] = useState<UserModel>()

    useEffect(() => {
        getUser()
    })

    async function getUser() {
        const response = await new RestApi<UserModel>('user').getEntities()
        setUser(response)
    }

    return (
        <div>
            <h1>Bienvenido a quiero a un perrito</h1>
        </div>
    )
}