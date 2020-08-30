import * as React from 'react'
import * as ReactDOM from "react-dom"
import { BrowserRouter as Router } from 'react-router-dom'
import { App } from './App'
import "./styles.css"

var mountNode = document.getElementById("app")
ReactDOM.render(<Router><App /></Router>, mountNode)
