import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'


export default function Product() {


  // ! State
  const [ item, setItem ] = useState(null)
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const { productId } = useParams()
  // ! On initial render
  useEffect(() => {
    async function getItemData(){
      try {
        const { data } = await axios.get(`/api/products/${Number(productId)}`)
        setItem(data)
        console.log('Data received from API: ', productId)
      } catch (err) {
        console.error(err)
      }
    }
    getItemData()
  }, [productId]) 

  return (
    <>
      {item ? (
        <>
          <section className="product-container">
            <div
              className="product-image"
              style={{
                backgroundImage: `url(${item.image})`,
                height: '300px',
                backgroundSize: 'contain',
              }}
            />
            <div className="product-title">
              <p>{item.title}</p>
            </div>
            <div className="price">
              <p>£{item.price}</p>
            </div>
            <div className="item-description">
              <p>{item.description}</p>
            </div>
          </section>
          <div className="product-button">
            <Button variant="primary" onClick={handleShow}>
            Add to Basket
            </Button>
          </div>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Add to basket!</Modal.Title>
            </Modal.Header>
            <Modal.Body>We would love to link this to a basket in the future!</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleClose}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      ) : (
        'Loading...'
        // <Spinner />
      )}
    </>
  )
}  