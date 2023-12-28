import React from 'react';
import { Card, CardContent, CardActions, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Products } from '../../data/subscription';
import { ItemData } from '../../data/Stripe/itemData';

function SubscriptionOption(item : ItemData) {
    const navigate = useNavigate();

    return (
        <Card>
            <CardContent>
                <Typography variant="h5">{item.name}</Typography>
                <Typography variant="h6">{item.price} €</Typography>
                <ul>
                    <li><Typography variant="body1">{item.description}</Typography></li>
                </ul>
            </CardContent>
            <CardActions>
                <Button variant="contained" color="primary" onClick={() => {
                    navigate('/stripe', { state: { item, endpoint: "/subscriptions/trial" } });
                }}>
                    Subscribe</Button>
            </CardActions>
        </Card>
    );
}

const Subscription: React.FC = () => {
    const subscriptions = Products.sort((a, b) => a.price - b.price);
    // Ajoutez d'autres options ici
    return (
        <div style={{ display: 'flex', justifyContent: 'space-around', padding: '20px' }}>
            {subscriptions.map((option, index) => (
                <SubscriptionOption key={index} {...option} />
            ))}
        </div>
    );
};

export default Subscription;
