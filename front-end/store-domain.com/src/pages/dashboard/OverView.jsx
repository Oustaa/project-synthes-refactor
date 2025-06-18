import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const StyledOverViews = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: var(--spacing-xl);
`;

const StyledOverView = styled.div`
  padding: var(--spacing-xxl);
  border-radius: var(--radius-lg);
  border: 1px dashed var(--dark-600);
  position: relative;
  h3 {
    font-size: 1rem;
    color: var(--dark-300);
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    span {
      font-size: 2.4rem;
      color: var(--primary);
      margin-left: var(--spacing-xl);
    }
  }
`;

const OverView = () => {
  const { store, orders } = useSelector((state) => state.store);
  const { value: products } = useSelector((state) => state.products);

  return (
    <StyledOverViews>
      <StyledOverView>
        <h3>
          Store's Visits <span>{Number(store.visits)}</span>
        </h3>
      </StyledOverView>
      <StyledOverView>
        <h3>
          Products Views
          <span>{products.reduce((value, item) => value + item.views, 0)}</span>
        </h3>
      </StyledOverView>
      <StyledOverView>
        <h3>
          Products Visits
          <span>
            {products.reduce((value, item) => value + item.visits, 0)}
          </span>
        </h3>
      </StyledOverView>
      <StyledOverView>
        <h3>
          Orders <span>{orders.length}</span>
        </h3>
      </StyledOverView>
      <StyledOverView>
        <h3>
          Revenu
          <span>
            $
            {orders
              .reduce((value, order) => {
                return (
                  value +
                  order.items.reduce(
                    (prev, item) => prev + item.price * item.qte,
                    0
                  )
                );
              }, 0)
              .toFixed(2)}
          </span>
        </h3>
      </StyledOverView>
    </StyledOverViews>
  );
};

export default OverView;
