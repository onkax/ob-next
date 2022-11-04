import { createContext, useContext, useState } from "react";
import { ItemResource } from "../interfaces/common";

type IResourceStore = {
  resources: object;
  setResourceList: (resourceList: ItemResource[]) => void;
  getResource: (key: string) => string;
};

const ResourceContext = createContext<IResourceStore>({} as IResourceStore);

export const useResourceProvider = (): IResourceStore =>
  useContext(ResourceContext);

export function ResourceProvider({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const [resources, setResources] = useState({});

  const setResourceList = (resourceList: ItemResource[]): void =>
    setResources(
      resourceList.reduce(
        (acc, item) => ({ ...acc, [item.key.toLowerCase()]: item.value }),
        resources
      )
    );

  const getResource = (key: string): string =>
    resources[key.toLowerCase() as keyof typeof resources] ?? key;

  return (
    <ResourceContext.Provider
      value={{
        resources: resources,
        setResourceList: setResourceList,
        getResource: getResource,
      }}
    >
      {children}
    </ResourceContext.Provider>
  );
}
