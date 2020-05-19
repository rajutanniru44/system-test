import React from 'react';
import styles from '../index.scss';

class App extends React.Component {
    constructor(props: any) {
        super(props);
    }
    render() {
        return (
            <div>
                <h1 className={styles.title}>Hello Webpack!</h1>
            </div>
        )
    }
}


export default App;