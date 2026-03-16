import {useState } from 'react';
import './pages/Hooves and Hotties/css/index.css';
import PageShell from './pages/Hooves and Hotties/layouts/PageShell';

export default function Index() {
    const [showMenu, setShowMenu] = useState(false);
    return (
        <PageShell>
        <div className="index">
            <h1>Welcome to John&apos;s GF2 Portfolio!</h1>
            <p>This is the main page of my portfolio. Use the navigation menu to explore my projects.</p>
        </div>
        </PageShell>
    );
}