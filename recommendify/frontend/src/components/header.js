import React, { useState } from 'react'

import './headerStyles.css'

function Header() {
    return (
        <>
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
            <div class="container-fluid">
            <span class="navbar-brand mb-0 h1">Recommendify</span>
            <button type="button" class="btn btn-success">
                Connect account
            </button>
            </div>
        </nav>
        </>
    )
}

export default Header;
