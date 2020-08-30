import * as React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import { Link } from 'react-router-dom'

export default function Navbar() {

    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu">
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6">
                    <Link style={{ color: 'white', paddingRight: '10px' }} to='/'>Inicio</Link>
                </Typography>
                <Button color="inherit">Ajustes</Button>
                <Button color="inherit">Ajustes</Button>
            </Toolbar>
        </AppBar>
    )
}