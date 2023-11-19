import { CustomError } from "../middlewares/error/customError";

async function creatingServices<T>(
  modelName: T,
  body: any,
  uniqueKey: any = {}
) {
  const existingDocumnet = await (modelName as any).findUnique({
    where: uniqueKey,
  });
  if (existingDocumnet) {
    throw new CustomError("Document already existed", 403, "Duplicated key");
  }
  const document = await (modelName as any).create({
    data: body,
  });
  return document;
}

async function retrivingAllFromDb_Service<T>(
  modelName: T,
  relationFiltering: any = {}
) {
  const documentes = await (modelName as any).findMany({
    ...relationFiltering,
  });
  return documentes;
}

async function getSingleDocumentService<T>(
  modelName: T,
  id: string,
  relationFiltering: any = {}
) {
  const doucment = await (modelName as any).findUnique({
    where: {
      id,
    },
    ...relationFiltering,
  });
  if (!doucment) {
    throw new CustomError("invalid id", 403, "Not Exsiting");
  }
  return doucment;
}

async function updatingDocumentService<T>(modelName: T, body: any, id: string) {
  const departement = await (modelName as any).update({
    where: { id },
    data: body,
  });
  return departement;
}

async function deletingDocumentService<T>(modelName: T, id: string) {
  const departement = await (modelName as any).delete({
    where: { id },
  });
  return departement;
}

export {
  retrivingAllFromDb_Service,
  creatingServices,
  getSingleDocumentService,
  updatingDocumentService,
  deletingDocumentService,
};
