//General
import React, {Component} from 'react'
// Chips
import Chip from '@material-ui/core/Chip';
// ccs
import '../utils/style/styles.css'

class AllCategoriesList extends Component{
    render(){
        return(
            <div>
                <h2 className='main_title'>Categories</h2>
                <div className='chips'>
                    {this.props.categories.map(category =>
                    <Chip
                        key={category.name}
                        label={category.name}
                        className='chip'
                        component='a'
                        variant="outlined"
                        href={`/posts?id=${category.name}`}
                        clickable
                    />)}
                </div>
            </div>
        )
    }
}

export default AllCategoriesList