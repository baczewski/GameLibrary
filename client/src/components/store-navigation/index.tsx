import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './store-navigation.module.css';

interface StoreNavigationProps {
    setSearch: (searchText: string) => void;
}

export function StoreNavigation({ setSearch }: StoreNavigationProps) {
    const [query, setQuery] = useState('');

    return (
        <nav className={styles.store}>
            <ul className={styles.list}>
                <li><Link to={'/'}>Your store</Link></li>
                <li><a href="#">New &#38; Noteworthy</a></li>
                <li><a href="#">Categories</a></li>
                <li><a href="#">News</a></li>
                <li>
                    <input className={styles.search} type={'search'} placeholder='search'
                        onChange={(event) => setQuery(event.target.value)} />
                    <button
                        className={styles.btn}
                        onClick={() => {
                            setSearch(query);
                        }}
                    >Search</button>
                </li>
            </ul>
        </nav>
    )
}