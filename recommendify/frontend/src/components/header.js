import React, { useState } from 'react'

import './headerStyles.css'
import SpotifyIcon from './SpotifyIcon.png'

function Header({url}) {
    const s = "Connect Account "
    return (
        <>
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
            <div class="container-fluid">
            <span class="navbar-brand mb-0 h1">Recommendify</span>
            <a href={url}> 
                <button type="button" class="btn btn-success">
                    {s}
                <img src = {SpotifyIcon} alt="buttonpng" border="0" width="25" height="25" />
                </button>
            </a>
            </div>
        </nav>
        </>
    )
}

export default Header;
