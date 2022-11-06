import { IDataProduct } from "../interfaces/data";

export default function DataProduct(props: IDataProduct) {
  return <p>{props.title}</p>;
}
