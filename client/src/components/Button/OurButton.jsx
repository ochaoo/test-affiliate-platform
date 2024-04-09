import './style.scss'

const OurButton = ({ variant, children, ...props }) => {
    let buttonClass = ''

    switch (variant) {
        case 'primary':
            buttonClass = 'myButton-primary'
            break
        case 'secondary':
            buttonClass = 'myButton-secondary'
            break
        default:
            buttonClass = ''
    }

    return (
        <button className={`myButton-initial ${buttonClass}`} {...props}>
            {children}
        </button>
    )
}

export default OurButton
