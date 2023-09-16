import React from "react";
import {
  Container,
  Title,
  Amount,
  Footer,
  Category,
  Icon,
  CategoryName,
  Date,
} from "./styles";
import { categories } from "../../utils/categories";

export interface TransactionsCardProps {
  type: "positive" | "negative";
  name: string;
  amount: string;
  category: string;
  date: string;
}

interface Props {
  data: TransactionsCardProps;
}

export function TransactionsCard({ data }: Props) {
  const [category] = categories.filter(({ key }) => key === data.category);

  return (
    <Container>
      <Title>{data.name}</Title>
      <Amount type={data.type}>
        {data.type === "negative" && "-"}
        {data.amount}
      </Amount>
      <Footer>
        <Category>
          <Icon name={category.icon} />
          <CategoryName>{category.name}</CategoryName>
        </Category>
        <Date>{data.date}</Date>
      </Footer>
    </Container>
  );
}
