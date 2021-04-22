import PropTypes from 'prop-types'
import Button from './Button'

const Header = ({title, onAddClick, showAdd}) => {

    return (
        <header className="header">
            <h1>
                {title}
            </h1>
            {showAdd ? <Button color='grey' text="Hide" onClick={onAddClick}/> :
                        <Button color='green' text="Add Todo" onClick={onAddClick}/>}
        </header>
    )
}

Header.defaultProps = {
    title: 'To-Do App',
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
}

export default Header
