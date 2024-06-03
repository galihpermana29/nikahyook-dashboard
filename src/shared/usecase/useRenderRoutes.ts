import {
  staffRoutes,
  vendorRoutes,
} from '../view/container/general-layout/model/routesData';
import { actionType } from '../view/container/general-layout/usecase/useGenerateItems';
import useMapRoutes from './useMapRoutes';

function generateRoutesChild() {
  const { mappingRoutes } = useMapRoutes();
  const typeBasedOnQuery = window.location.search.split('=')[1];
  const typeBasedOnLocalStorage = JSON.parse(localStorage.getItem('admin')!)
    ?.type as actionType;

  const userType: actionType | null | string = typeBasedOnLocalStorage
    ? typeBasedOnLocalStorage
    : typeBasedOnQuery;

  const whichData = userType === 'admin' ? staffRoutes : vendorRoutes;

  const renderedRoutes = mappingRoutes(whichData);
  return renderedRoutes;
}

export default generateRoutesChild;
