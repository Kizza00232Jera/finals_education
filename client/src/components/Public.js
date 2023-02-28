import React from 'react'
import { Link } from 'react-router-dom'

const Public = () => {
    const content = (
        <section className="public">
            <section>
                <Link to="">EDU</Link>
                <Link to="">Educations</Link>
                <Link to="">Library</Link>
                <Link to="">My educations</Link>
                <Link to="">Logout</Link>
                <div>Profile</div>
            </section>
            <section>

                <header>
                    <h1>Educations</h1>
                    <button>Add educations</button>
                </header>
                <main>
                    <ul>
                        <li>
                            event 1
                        </li>
                        <li>
                            event 1
                        </li>
                        <li>
                            event 1
                        </li>
                        <li>
                            event 1
                        </li>
                    </ul>
                </main>
            </section>
            <footer>
                <Link to="/login">Employee Login</Link>
            </footer>
        </section>
    )
    return content
}

export default Public
