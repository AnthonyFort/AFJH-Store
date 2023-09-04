import { useState, useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import axios from 'axios'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export default function Category() {

  // The state of "category" was sent via Nav.js with useNavigate
  // useLocation unwraps this state so it can be accessed in this file
  const { state } = useLocation()
  const [products, setProducts] = useState([])

  // This function fetches all the items
  useEffect(() => {
    async function getProductsData() {
      try {
        const { data } = await axios.get('/api/products')
        setProducts(data)
      } catch (error) {
        console.error(error)
      }
    }
    getProductsData()
  }, [])

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
}