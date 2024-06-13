export function removeDuplicateLocation(data: any[]) {
  return data.filter(
    (obj, index, self) =>
      index ===
      self.findIndex((t) => t.value === obj.value && t.label === obj.label)
  );
}

export function getCoverageArea(coverageArea: any[]) {
  if (coverageArea.length > 0) {
    const provinces = coverageArea.map((dx) => ({ ...dx.province }));
    const cities = coverageArea.map((dx) => ({ ...dx.city }));

    return {
      provinces: removeDuplicateLocation(provinces),
      cities: removeDuplicateLocation(cities),
    };
  }

  return { provinces: [], cities: [] };
}
