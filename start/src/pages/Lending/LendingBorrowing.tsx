import React from 'react';
import { Link } from 'react-router-dom';

const LendingBorrowing = () => {
    return (
        <div className="box">
            <Link to="/">
                <div className="box-item">Lending</div>
            </Link>
            <Link to="/borrowing">
                <div className="box-item">Borrowing</div>
            </Link>
        </div>
    );
};

export default LendingBorrowing;