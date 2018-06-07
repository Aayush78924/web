/* global $ */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  Accordion,
  AccordionItem,
  AccordionItemTitle,
  AccordionItemBody,
} from 'react-accessible-accordion';
import { Spring, animated } from 'react-spring';

import styles from '../utils/styles';
import { formatCurrency, HTMLContent } from '../utils/helpers';
import Heading from '../components/Heading';

const Price = styled.div`
  color: ${styles.primaryColor};
  font-size: 1.5rem;
  margin-top: -2rem;
  span {
    color: #4a4a4a;
    font-size: 1rem;
    text-decoration: line-through;
    font-weight: light;
  }
`;

const BuyBtn = styled.button`
  width: 100%;
  margin-top: 3rem;
`;

const AccordionStyled = styled(Accordion)`
  margin-top: 3rem;
  .accordion__title {
    border-bottom: 1px solid #979797;
    padding: 0.9rem 0;
    cursor: pointer;
    :focus {
      outline: none;
    }
    h3 {
      text-transform: uppercase;
      font-weight: 700;
    }
  }
  .accordion__body {
    display: block;
    padding: 1rem 0;
  }
  .accordion__body--hidden {
    display: none;
  }
`;

class ProductInfo extends React.Component {
  constructor(props) {
    super(props);

    this.state = { isVisible: false };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ isVisible: true });
    }, 400);
  }

  handleSubmit = () => {
    const { handleCheckout } = this.props;

    $('.product-info-btn').addClass('is-loading');
    setTimeout(handleCheckout, 350);
  };

  render() {
    const { isVisible } = this.state;
    const { product } = this.props;

    return (
      <React.Fragment>
        <Heading>{product.title}</Heading>
        <Price className="has-text-weight-semibold has-text-centered">
          {formatCurrency(product.discountPrice)}{' '}
          <span>{formatCurrency(product.originalPrice)}</span>
        </Price>
        <Spring
          native
          from={{ opacity: 0 }}
          to={{ opacity: isVisible ? 1 : 0 }}
        >
          {stylesProps => (
            <animated.div style={stylesProps}>
              <BuyBtn
                className="product-info-btn button is-dark is-large is-radiusless is-uppercase"
                onClick={this.handleSubmit}
              >
                Add to bag
              </BuyBtn>
              <AccordionStyled>
                <AccordionItem expanded>
                  <AccordionItemTitle>
                    <h3>Product Details</h3>
                  </AccordionItemTitle>
                  <AccordionItemBody>
                    <HTMLContent
                      content={product.longDetails.childMarkdownRemark.html}
                    />
                  </AccordionItemBody>
                </AccordionItem>
                <AccordionItem>
                  <AccordionItemTitle>
                    <h3>Delivery information</h3>
                  </AccordionItemTitle>
                  <AccordionItemBody>
                    <p>
                      Lorizzle ipsum dolor sizzle amet, yo dizzle elit.
                      Nullizzle go to hizzle fo shizzle, rizzle volutpizzle,
                      suscipit quizzle, i saw beyonces tizzles and my pizzle
                      went crizzle vizzle, crunk. Pellentesque rizzle tortor.
                      Sizzle eros. Fizzle at ma nizzle dapibus turpis tempizzle
                      tempizzle. Maurizzle pellentesque nizzle yo shizznit. Dawg
                      izzle tortor. Pellentesque eleifend fizzle go to hizzle.
                    </p>
                  </AccordionItemBody>
                </AccordionItem>
                <AccordionItem>
                  <AccordionItemTitle>
                    <h3>Shipping & returns</h3>
                  </AccordionItemTitle>
                  <AccordionItemBody>
                    <p>
                      In pot platea dictumst. Fizzle dapibizzle. Shizzlin dizzle
                      fo shizzle my nizzle crocodizzle, we gonna chung fizzle,
                      mattis doggy, things vitae, nunc. Sizzle suscipizzle.
                      Integer semper im in the shizzle stuff away.
                    </p>
                  </AccordionItemBody>
                </AccordionItem>
              </AccordionStyled>
            </animated.div>
          )}
        </Spring>
      </React.Fragment>
    );
  }
}

ProductInfo.propTypes = {
  product: PropTypes.object.isRequired,
  handleCheckout: PropTypes.func.isRequired,
};

export default ProductInfo;
