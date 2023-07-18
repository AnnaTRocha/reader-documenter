import "./css/Nav.css"
import React from "react"

export default props => 
    <aside className="menu-area">
        <nav class="navbar navbar-light bg-light">
            <form class="form-inline">
            <button class="btn btn-dark" type="button"><a href="/">
                            Reader
                        </a>
                    </button>
            <button class="btn btn-dark" type="button"><a href="/Documenter">
                            Documenter
                        </a>
                    </button>
            </form>
        </nav>
    </aside>