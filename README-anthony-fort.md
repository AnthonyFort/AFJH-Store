# AFJH Store

## Introduction

This was my second project, undertaken as a weekend hackathon at the end of the 6th week of the General Assembly Software Engineering Immersive (September 2023). The goal was to work with a partner to “build [and deploy] a React application that consumes a public API.” Our application (a single-page application) is a mockup of an eCommerce website. Users can search products by category and learn more about products that interest them by clicking on images of those products and being redirected to a product-specific page. We used the following public API, which provided Pseudo-real data for developers to use when testing their eCommerce sites: https://fakestoreapi.com/docs

View the app here: https://afjh-store.netlify.app
View the code here: https://github.com/AnthonyFort/afjh-store

Languages: CSS, HTML, JavaScript
Frameworks: Bootstrap, React

## Planning

After my partner had produced a wireframe, we jointly wrote up the index.js and App.js files. As the Root component, App.js contained the Routes to the various child components in which the app’s functionality would be programmed. We each selected a handful of components to work on individually. I worked on Nav.js (the nav bar), Category.js (the page displaying items from the chosen category), and Footer.js (the footer). With regard to styling, we came up with a shared aesthetic vision before working separately on the CSS for our respective components. NotFound.js (the catch-all page unfound addresses was made jointly. A task list was shared in a Google doc. 

## Key Features

### Nav.js

The Nav bar features a Bootstrap Dropdown menu, listing different categories of products in the store. The category names had been obtained from the API via a GET request and fed into the Dropdown menu using the .map() method. An onClick event handler was attached to each Dropdown item. When that item was clicked, the handleClick function was called and passed that product’s category name.

Once the handleClick function had received the relevant category name, the useNavigate hook was used to navigate to the “categories” page. useNavigate also sent over information about the current state of “category” (i.e., which category had been selected from the Dropdown). Based on this, the categories page could subsequently display from that category specifically. 

```
return (
    <>
      <nav className="nav-header">
        <Link to="/"><img src={Logo} className="nav-logo" alt="AFJH logo" /></Link>
        <Dropdown className="nav-dropdown">
          <Dropdown.Toggle variant="success" id="dropdown-basic" className="dropdown-button">
            Categories
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {/* For every item in the categories array, a dropdown item is created */}
            {categories.length > 0 ?
              categories.map(category => {
                return <Dropdown.Item key={category} onClick={() => handleClick(category)}>{category}</Dropdown.Item>
              })
              :
              'Error'
            }
          </Dropdown.Menu>
        </Dropdown>
      </nav>
    </>
  )
```
### Category.js

Category.js displays products from the selected category. Using useLocation, it unpacks the current state of “category” that had been delivered by useNavigate. It then calls the API, retrieving all the products before filtering out the category-appropriate ones and using the .map() method to create for each one a Col inside a Bootstrap container.

```
return (
    <div className="category-page">
      <div className="category-inside">
        <h1>{state.category.charAt(0).toUpperCase() + state.category.substr(1)}</h1>
        {products.length > 0 ?
          <Container fluid className="fluid-container" >
            <Row>
              {
                // The items are filtered, returning only those whose category matches the current category state
                // Then, the remaining items are mapped, and, for each item, a new Col is created, displaying a picture and the title text
                products.filter(product => product.category === state.category)
                  .map(product => {
                    return (
                      <div key={product.id} className="item-container">
                        <Col
                          as={Link}
                          to={`/category/${product.id}`}
                          className="item"
                          xs="6"
                          md="4"
                          lg="3"
                          style={{ backgroundImage: `url(${product.image})` }}
                        >
                        </Col>
                        <div className="category-text">
                          <h3>{product.title}</h3>
                          <p>£{product.price}</p>
                        </div>
                      </div>
                    )
                  })
              }
            </Row>
          </Container >
          :
          'ERROR'
        }
      </div>
    </div>
  )
```
## Learning Takeaways and Challenges

For both me and my partner, this was the first “team” project we had been involved in. As such, we had to learn how to share a Github repository and how to handle merge conflicts when they arose. 

The advantage of good naming conventions became apparent through the course of the project. Occasionally, confusion arose where components, functions, or states had been named vaguely. Not only did rectifying make for more readable code, but it refined my understanding of exactly what purpose each component, function, or state was fulfilling. 

Regarding styling, while I felt fairly confident in my ability to target elements and perform certain operations on them, I felt aware of a lack of understanding in relation to sizing. Although the app is, to some extent, responsive to changes in screen size, solutions were often implemented in a relatively ad hoc manner, which seemed to lack a clear methodology. 

## Possible Improvements

Currently, the signup button is a feature of the Home component. It makes more sense for this to be a component in its own right. For one thing, it would mean the signup feature could be used in other parts of the site, if desired. 

Though we included ‘ERROR’ messages, and though we logged API request errors in the console using the try-catch statement, our error-handling could be improved by providing more detailed error messages directly to the user. As it happened, the API we used often experienced server issues. As a result, it was often the case that the API requests failed, through no fault of our own. By printing a more detailed error message, the source of the error would be apparent to any visitors.
