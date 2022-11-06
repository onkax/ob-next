import Container from "../atoms/container";
import { IComponentDataList } from "../interfaces/components";
import { IDataProduct, IPageBasedData } from "../interfaces/data";
import DataProduct from "../molecules/dataProduct";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function ComponentDataList(
  props: IComponentDataList
): JSX.Element {
  return (
    <Container className={classNames(props.slideOnMobile ? "" : "")}>
      <h2>{props.title}</h2>
      <h4 className="line-clamp-3">{props.summary}</h4>
      <div>
        {props.slideOnMobile}
        {props.slideOnMobile ? (
          <div>
            {"- slideli"}
            {props.dataCollection.items.map((item: IPageBasedData) => {
              return <p key={"data" + item.sys?.id}>{item.title}</p>;
            })}
          </div>
        ) : (
          <div>
            {"- slidesiz"}
            {props.dataCollection.items.map((item: IPageBasedData) => {
              return (
                // todo: data resolver eklenmeli
                <DataProduct
                  key={"data" + item.sys?.id}
                  {...(item as IDataProduct)}
                />
              );
            })}
          </div>
        )}
      </div>
    </Container>
  );
}
