import React, {Component} from 'react'
import '../utils/style/styles.css'
// import {NO_POST_COMMENTS_IMG} from '../utils/style/strings'
// Cards
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

class EmptyCard extends Component{
    render(){
        return(
            <div>
                <Card className='empty_card'>
                    <CardContent>
                        <Typography  color="textSecondary">Sorry, nothing yet!</Typography>
                    </CardContent>
                </Card>
            </div>
        )
    }
}

export default EmptyCard