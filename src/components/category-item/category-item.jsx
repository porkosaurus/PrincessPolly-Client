import './category-item.scss'

const CategoryItem = ({category}) => {
    const { imageUrl, title } = category;
    return(
        <div className='category-full-container'>
            <div className = "category-container" style={{backgroundImage: `url(${imageUrl})`}}>
            </div>
            <h2 className='category-heading'>{title}</h2>
        </div>
    )

}

export default CategoryItem;