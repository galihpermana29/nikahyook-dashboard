const useGenerateBreadcrumb = (pathname: string) => {
  function capitalizeFirstLetter(str: string) {
    const newStr = str.split('-').join(' ');
    if (newStr === 'ppm') return 'PPM';
    return newStr.charAt(0).toUpperCase() + newStr.slice(1);
  }

  const breadCrumbFiltered = pathname?.split('/').filter((str) => str !== '');
  const breadCumbsRoutes = breadCrumbFiltered.map((route: string, idx) => {
    const path = '/' + breadCrumbFiltered.slice(0, idx + 1).join('/');
    if (
      idx === breadCrumbFiltered.length - 1 ||
      route.includes('edit') ||
      route.includes('detail')
    ) {
      return { title: capitalizeFirstLetter(route), href: null };
    }

    return {
      title: capitalizeFirstLetter(route),

      href: path,
    };
  });
  return breadCumbsRoutes;
};

export default useGenerateBreadcrumb;
