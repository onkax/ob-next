import { IDataProduct } from "../interfaces/data";

export default function DataProduct(props: IDataProduct) {
  return (
    <a key={"data" + props.sys?.id} href={"/" + props.slug}>
      {props.title}
    </a>
  );
}
